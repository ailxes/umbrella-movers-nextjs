import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

// POST /api/outreach/campaigns  — enroll all matching contacts into a campaign
export async function POST(req: NextRequest) {
  const CRON_SECRET = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  if (CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { campaign_id, action } = await req.json();
  if (!campaign_id) return NextResponse.json({ error: 'campaign_id required' }, { status: 400 });

  const db = createServerClient();

  // Get the campaign to know what contact_type and tier to enroll
  const { data: campaign } = await db
    .from('outreach_campaigns')
    .select('*')
    .eq('id', campaign_id)
    .single();

  if (!campaign) return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });

  if (action === 'enroll_all') {
    // Find all contacts of the right type that aren't unsubscribed
    let query = db
      .from('outreach_contacts')
      .select('id')
      .eq('contact_type', campaign.contact_type)
      .eq('unsubscribed', false);

    if (campaign.tier) {
      query = query.eq('tier', campaign.tier);
    }

    const { data: contacts } = await query;
    if (!contacts || contacts.length === 0) {
      return NextResponse.json({ enrolled: 0 });
    }

    let enrolled = 0;
    for (const contact of contacts) {
      const { error } = await db
        .from('campaign_enrollments')
        .upsert(
          {
            campaign_id,
            contact_id: contact.id,
            status: 'pending',
            current_step: 0,
            next_send_at: new Date().toISOString(),
          },
          { onConflict: 'campaign_id,contact_id' }
        );
      if (!error) enrolled++;
    }
    return NextResponse.json({ enrolled });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}

// PATCH /api/outreach/campaigns — update campaign status
export async function PATCH(req: NextRequest) {
  const CRON_SECRET = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  if (CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { campaign_id, status, daily_limit } = await req.json();
  if (!campaign_id) return NextResponse.json({ error: 'campaign_id required' }, { status: 400 });

  const db = createServerClient();
  const updates: Record<string, unknown> = {};

  if (status) {
    updates.status = status;
    if (status === 'warming') {
      updates.warmup_start = new Date().toISOString().split('T')[0];
    }
  }
  if (daily_limit) updates.daily_limit = daily_limit;

  const { error } = await db.from('outreach_campaigns').update(updates).eq('id', campaign_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

// GET /api/outreach/campaigns — per-campaign stats
export async function GET(req: NextRequest) {
  const CRON_SECRET = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  if (CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = createServerClient();
  const { data: campaigns } = await db.from('outreach_campaigns').select('id, name');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats = [];
  for (const c of campaigns ?? []) {
    const [
      { count: totalSent },
      { count: sentToday },
      { count: opened },
      { count: pending },
      { count: completed },
      { count: replied },
    ] = await Promise.all([
      db.from('email_sends').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id),
      db.from('email_sends').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).gte('sent_at', today.toISOString()),
      db.from('email_sends').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).not('opened_at', 'is', null),
      db.from('campaign_enrollments').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).in('status', ['pending', 'active']),
      db.from('campaign_enrollments').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).eq('status', 'completed'),
      db.from('campaign_enrollments').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).eq('status', 'replied'),
    ]);

    stats.push({
      id: c.id,
      name: c.name,
      totalSent: totalSent ?? 0,
      sentToday: sentToday ?? 0,
      opened: opened ?? 0,
      pending: pending ?? 0,
      completed: completed ?? 0,
      replied: replied ?? 0,
    });
  }

  return NextResponse.json(stats);
}
