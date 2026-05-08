// Shared cron logic — used by /api/outreach/cron (Vercel cron, Bearer-auth)
// and the dashboard's "Run Today's Send" button via /api/outreach/admin
// (cookie-auth via middleware). Keep all sending logic here so neither
// caller has to ship secrets.

import { createServerClient } from '@/lib/supabase-server';
import { sendEmail, injectTrackingPixel, injectUnsubscribeLink } from '@/lib/email';
import { getDailyLimitForDay, getDaysSinceStart, isWarmed } from '@/lib/warming';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://umbrellamovers.com';

export interface CronResult {
  message: string;
  totalSent: number;
  details: string[];
}

export async function runOutreachCron(): Promise<CronResult> {
  const db = createServerClient();
  const results: string[] = [];
  let totalSent = 0;

  const { data: campaigns, error: campErr } = await db
    .from('outreach_campaigns')
    .select('*')
    .in('status', ['warming', 'active']);

  if (campErr) throw new Error(`Fetching campaigns: ${campErr.message}`);
  if (!campaigns || campaigns.length === 0) {
    return { message: 'No active campaigns', totalSent: 0, details: [] };
  }

  for (const campaign of campaigns) {
    totalSent += await processCampaign(campaign, db, results);
  }

  return { message: 'Cron complete', totalSent, details: results };
}

async function processCampaign(
  campaign: Record<string, unknown>,
  db: ReturnType<typeof createServerClient>,
  log: string[],
): Promise<number> {
  const campaignId = campaign.id as string;
  const campaignName = campaign.name as string;
  const dailyLimitOverride = campaign.daily_limit as number;
  const warmupStart = campaign.warmup_start as string | null;
  const fromEmail = campaign.from_email as string;
  const fromName = campaign.from_name as string;
  const replyTo = campaign.reply_to as string;

  let todayLimit = dailyLimitOverride;

  if (warmupStart) {
    const day = getDaysSinceStart(warmupStart);
    const warmingLimit = getDailyLimitForDay(day);
    todayLimit = Math.min(warmingLimit, dailyLimitOverride);

    if (isWarmed(day) && campaign.status === 'warming') {
      await db
        .from('outreach_campaigns')
        .update({ status: 'active', warmed_at: new Date().toISOString().split('T')[0] })
        .eq('id', campaignId);
    }

    log.push(`[${campaignName}] Warming day ${day} — limit ${todayLimit}/day`);
  } else {
    log.push(`[${campaignName}] Active — limit ${todayLimit}/day`);
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { count: sentToday } = await db
    .from('email_sends')
    .select('id', { count: 'exact', head: true })
    .eq('campaign_id', campaignId)
    .gte('sent_at', todayStart.toISOString());

  const remaining = todayLimit - (sentToday ?? 0);
  if (remaining <= 0) {
    log.push(`[${campaignName}] Daily limit reached (${sentToday}/${todayLimit})`);
    return 0;
  }

  const maxStepsCap = (campaign.max_steps as number | null | undefined) ?? 3;

  const { data: allSteps } = await db
    .from('sequence_steps')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('step_number', { ascending: true });

  const steps = (allSteps ?? []).filter(s => (s.step_number as number) <= maxStepsCap);

  if (!steps || steps.length === 0) {
    log.push(`[${campaignName}] No sequence steps configured`);
    return 0;
  }

  const maxStep = steps[steps.length - 1].step_number as number;

  const firstStep = steps.find(s => (s.step_number as number) === 1);
  if (firstStep) {
    const { data: pendingEnrollments } = await db
      .from('campaign_enrollments')
      .select('*')
      .eq('campaign_id', campaignId)
      .eq('status', 'pending')
      .limit(remaining);

    for (const enrollment of pendingEnrollments ?? []) {
      await db
        .from('campaign_enrollments')
        .update({
          status: 'active',
          current_step: 0,
          next_send_at: new Date().toISOString(),
        })
        .eq('id', enrollment.id);
    }
  }

  const { data: dueEnrollments } = await db
    .from('campaign_enrollments')
    .select(`
      *,
      outreach_contacts (
        id, first_name, last_name, email, contact_type, unsubscribed
      )
    `)
    .eq('campaign_id', campaignId)
    .eq('status', 'active')
    .lte('next_send_at', new Date().toISOString())
    .limit(remaining);

  if (!dueEnrollments || dueEnrollments.length === 0) {
    log.push(`[${campaignName}] No emails due right now`);
    return 0;
  }

  let sent = 0;

  for (const enrollment of dueEnrollments) {
    if (sent >= remaining) break;

    const contact = enrollment.outreach_contacts as Record<string, unknown>;
    if (!contact || !contact.email) continue;

    if (contact.unsubscribed) {
      await db
        .from('campaign_enrollments')
        .update({ status: 'unsubscribed' })
        .eq('id', enrollment.id);
      continue;
    }

    const nextStepNumber = (enrollment.current_step as number) + 1;
    const step = steps.find(s => (s.step_number as number) === nextStepNumber);
    if (!step) continue;

    const { data: sendRow } = await db
      .from('email_sends')
      .insert({
        enrollment_id: enrollment.id,
        contact_id: contact.id,
        campaign_id: campaignId,
        step_number: nextStepNumber,
        subject: step.subject,
        status: 'sent',
      })
      .select('id')
      .single();

    if (!sendRow) continue;

    const firstName = (contact.first_name as string) || 'there';
    const subject = (step.subject as string).replace(/\{\{first_name\}\}/g, firstName);
    let html = (step.body_html as string).replace(/\{\{first_name\}\}/g, firstName);

    html = injectTrackingPixel(html, sendRow.id, BASE_URL);
    html = injectUnsubscribeLink(html, contact.email as string, BASE_URL);

    const result = await sendEmail({
      to: contact.email as string,
      from: `${fromName} <${fromEmail}>`,
      replyTo,
      subject,
      html,
      text: step.body_text as string | undefined,
    });

    if (result.error) {
      console.error(`[${campaignName}] Failed to send to ${contact.email}: ${result.error}`);
      await db.from('email_sends').update({ status: 'failed' }).eq('id', sendRow.id);
      continue;
    }

    await db
      .from('email_sends')
      .update({ resend_id: result.id, status: 'sent' })
      .eq('id', sendRow.id);

    const nextStep = steps.find(s => (s.step_number as number) === nextStepNumber + 1);
    if (nextStep && nextStepNumber < maxStep) {
      const nextSendAt = new Date();
      nextSendAt.setDate(nextSendAt.getDate() + (nextStep.delay_days as number));

      await db
        .from('campaign_enrollments')
        .update({
          current_step: nextStepNumber,
          next_send_at: nextSendAt.toISOString(),
        })
        .eq('id', enrollment.id);
    } else {
      await db
        .from('campaign_enrollments')
        .update({
          status: 'completed',
          current_step: nextStepNumber,
          completed_at: new Date().toISOString(),
        })
        .eq('id', enrollment.id);
    }

    sent++;
    log.push(`[${campaignName}] Step ${nextStepNumber} → ${contact.email}`);
  }

  log.push(`[${campaignName}] Sent ${sent} today`);
  return sent;
}
