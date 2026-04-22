import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { sendEmail, injectTrackingPixel, injectUnsubscribeLink } from '@/lib/email';
import { getDailyLimitForDay, getDaysSinceStart, isWarmed } from '@/lib/warming';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://umbrellamovers.com';
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(req: NextRequest) {
  // Verify the request is from Vercel Cron or an authorized caller
  const authHeader = req.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = createServerClient();
  const results: string[] = [];
  let totalSent = 0;

  try {
    // ── 1. Get all active campaigns ──────────────────────────────────────────
    const { data: campaigns, error: campErr } = await db
      .from('outreach_campaigns')
      .select('*')
      .in('status', ['warming', 'active']);

    if (campErr) throw new Error(`Fetching campaigns: ${campErr.message}`);
    if (!campaigns || campaigns.length === 0) {
      return NextResponse.json({ message: 'No active campaigns', sent: 0 });
    }

    for (const campaign of campaigns) {
      const campaignSent = await processCampaign(campaign, db, results);
      totalSent += campaignSent;
    }

    return NextResponse.json({
      message: 'Cron complete',
      totalSent,
      details: results,
    });

  } catch (err) {
    console.error('[outreach/cron] Fatal error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function processCampaign(
  campaign: Record<string, unknown>,
  db: ReturnType<typeof createServerClient>,
  log: string[]
): Promise<number> {
  const campaignId = campaign.id as string;
  const campaignName = campaign.name as string;
  const dailyLimitOverride = campaign.daily_limit as number;
  const warmupStart = campaign.warmup_start as string | null;
  const fromEmail = campaign.from_email as string;
  const fromName = campaign.from_name as string;
  const replyTo = campaign.reply_to as string;

  // ── 2. Determine today's send limit ────────────────────────────────────────
  let todayLimit = dailyLimitOverride;

  if (warmupStart) {
    const day = getDaysSinceStart(warmupStart);
    const warmingLimit = getDailyLimitForDay(day);
    // Use the lower of warming limit and the campaign's hard cap
    todayLimit = Math.min(warmingLimit, dailyLimitOverride);

    // Auto-upgrade campaign status from 'warming' to 'active' once warm
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

  // ── 3. Count how many already sent today ───────────────────────────────────
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

  // ── 4. Get sequence steps for this campaign ─────────────────────────────────
  const { data: steps } = await db
    .from('sequence_steps')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('step_number', { ascending: true });

  if (!steps || steps.length === 0) {
    log.push(`[${campaignName}] No sequence steps configured`);
    return 0;
  }

  const maxStep = steps[steps.length - 1].step_number as number;

  // ── 5. Activate pending enrollments (first step only) ──────────────────────
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

  // ── 6. Find enrollments due for their next step ─────────────────────────────
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

    // Skip unsubscribed contacts
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

    // Build email HTML with tracking
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

    // Personalize subject and body
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

    // Update send log with Resend ID
    await db
      .from('email_sends')
      .update({ resend_id: result.id, status: 'sent' })
      .eq('id', sendRow.id);

    // Schedule next step or complete
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
      // All steps sent — mark complete
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
