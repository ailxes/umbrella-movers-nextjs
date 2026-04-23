import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

// GET /api/outreach/admin?section=stats|campaigns|contacts
export async function GET(req: NextRequest) {

  const section = req.nextUrl.searchParams.get('section') ?? 'all';
  const db = createServerClient();
  const today = new Date(); today.setHours(0, 0, 0, 0);

  // ── Global stats ──────────────────────────────────────────────────────────
  if (section === 'stats' || section === 'all') {
    const [r1, r2, r3, r4, r5] = await Promise.all([
      db.from('outreach_contacts').select('*', { count: 'exact', head: true }),
      db.from('email_sends').select('*', { count: 'exact', head: true }),
      db.from('email_sends').select('*', { count: 'exact', head: true }).not('opened_at', 'is', null),
      db.from('outreach_contacts').select('*', { count: 'exact', head: true }).eq('unsubscribed', true),
      db.from('email_sends').select('*', { count: 'exact', head: true }).gte('sent_at', today.toISOString()),
    ]);

    if (r1.error) console.error('stats r1 error:', r1.error);

    const totalContacts    = r1.count ?? 0;
    const totalSent        = r2.count ?? 0;
    const totalOpened      = r3.count ?? 0;
    const totalUnsubscribed = r4.count ?? 0;
    const sentToday        = r5.count ?? 0;

    if (section === 'stats') {
      return NextResponse.json({ totalContacts, totalSent, totalOpened, totalUnsubscribed, sentToday });
    }
  }

  // ── Campaigns + per-campaign stats ────────────────────────────────────────
  if (section === 'campaigns' || section === 'all') {
    const { data: camps } = await db.from('outreach_campaigns').select('*').order('created_at', { ascending: false });

    const campaigns = await Promise.all((camps ?? []).map(async (c) => {
      const [
        { count: totalSent },
        { count: sentToday },
        { count: opened },
        { count: pending },
        { count: completed },
        { count: replied },
        { count: unsubscribed },
      ] = await Promise.all([
        db.from('email_sends').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id),
        db.from('email_sends').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).gte('sent_at', today.toISOString()),
        db.from('email_sends').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).not('opened_at', 'is', null),
        db.from('campaign_enrollments').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).in('status', ['pending', 'active']),
        db.from('campaign_enrollments').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).eq('status', 'completed'),
        db.from('campaign_enrollments').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).eq('status', 'replied'),
        db.from('campaign_enrollments').select('*', { count: 'exact', head: true }).eq('campaign_id', c.id).eq('status', 'unsubscribed'),
      ]);
      return { ...c, stats: { totalSent, sentToday, opened, pending, completed, replied, unsubscribed } };
    }));

    if (section === 'campaigns') return NextResponse.json(campaigns);
    if (section === 'all') {
      return NextResponse.json({ campaigns });
    }
  }

  // ── Contacts list ─────────────────────────────────────────────────────────
  if (section === 'contacts') {
    const page = parseInt(req.nextUrl.searchParams.get('page') ?? '0');
    const search = req.nextUrl.searchParams.get('search') ?? '';
    const type = req.nextUrl.searchParams.get('type') ?? '';
    const campaignId = req.nextUrl.searchParams.get('campaign_id') ?? '';
    const perPage = 50;

    let query = db
      .from('campaign_enrollments')
      .select(`
        id, status, current_step, next_send_at, enrolled_at,
        outreach_contacts ( id, first_name, last_name, email, contact_type, tier, office_name, unsubscribed )
      `)
      .order('enrolled_at', { ascending: false })
      .range(page * perPage, (page + 1) * perPage - 1);

    if (campaignId) query = query.eq('campaign_id', campaignId);

    const { data: enrollments, count } = await query;

    // Filter client-side for search/type (simpler than complex joins)
    let results = (enrollments ?? []).filter((e) => {
      const c = e.outreach_contacts as unknown as Record<string, string> | null;
      if (!c) return false;
      if (type && c.contact_type !== type) return false;
      if (search) {
        const q = search.toLowerCase();
        return c.email?.toLowerCase().includes(q) ||
          c.first_name?.toLowerCase().includes(q) ||
          c.last_name?.toLowerCase().includes(q);
      }
      return true;
    });

    return NextResponse.json({ enrollments: results, total: count ?? 0 });
  }

  // ── Block list ────────────────────────────────────────────────────────────
  // ── Sequence steps ────────────────────────────────────────────────────────────
  if (section === 'steps') {
    const campaignId = req.nextUrl.searchParams.get('campaign_id') ?? '';
    if (!campaignId) return NextResponse.json({ error: 'campaign_id required' }, { status: 400 });
    const { data: steps } = await db
      .from('sequence_steps')
      .select('id, step_number, delay_days, subject, body_html, body_text')
      .eq('campaign_id', campaignId)
      .order('step_number');
    return NextResponse.json(steps ?? []);
  }

  if (section === 'blocklist') {
    const { data } = await db.from('outreach_unsubscribes').select('email, reason, unsubscribed_at').order('unsubscribed_at', { ascending: false });
    return NextResponse.json(data ?? []);
  }

  return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
}

// POST /api/outreach/admin — campaign status + enrollment actions
export async function POST(req: NextRequest) {

  const body = await req.json();
  const { action, campaign_id, status, daily_limit } = body;
  const db = createServerClient();

  if (action === 'update_status') {
    const updates: Record<string, unknown> = {};
    if (status) {
      updates.status = status;
      if (status === 'warming') updates.warmup_start = new Date().toISOString().split('T')[0];
    }
    if (daily_limit) updates.daily_limit = Number(daily_limit);
    await db.from('outreach_campaigns').update(updates).eq('id', campaign_id);
    return NextResponse.json({ success: true });
  }

  if (action === 'enroll_all') {
    const { data: campaign } = await db.from('outreach_campaigns').select('*').eq('id', campaign_id).single();
    if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    let query = db.from('outreach_contacts').select('id').eq('contact_type', campaign.contact_type).eq('unsubscribed', false);
    if (campaign.tier) query = query.eq('tier', campaign.tier);
    const { data: contacts } = await query;

    let enrolled = 0;
    for (const c of contacts ?? []) {
      const { error } = await db.from('campaign_enrollments').upsert(
        { campaign_id, contact_id: c.id, status: 'pending', current_step: 0, next_send_at: new Date().toISOString() },
        { onConflict: 'campaign_id,contact_id' }
      );
      if (!error) enrolled++;
    }
    return NextResponse.json({ enrolled });
  }

  if (action === 'import_csv') {
    // Bulk import contacts from parsed CSV rows
    const { rows, contact_type, tier, campaign_id: cid } = body;
    if (!Array.isArray(rows)) return NextResponse.json({ error: 'rows required' }, { status: 400 });

    const { data: blockList } = await db.from('outreach_unsubscribes').select('email');
    const blocked = new Set((blockList ?? []).map((r: { email: string }) => r.email.toLowerCase()));

    let imported = 0, skipped = 0, enrolled = 0;

    for (const row of rows) {
      const email = (row.email ?? row.Email ?? '').toLowerCase().trim();
      if (!email || !email.includes('@') || blocked.has(email)) { skipped++; continue; }

      const { data: contact } = await db.from('outreach_contacts').upsert(
        {
          email,
          first_name: row.first_name ?? row['First Name'] ?? '',
          last_name: row.last_name ?? row['Last Name'] ?? '',
          full_name: row.full_name ?? row['Full Name'] ?? `${row.first_name ?? ''} ${row.last_name ?? ''}`.trim(),
          contact_type: contact_type ?? 'past_customer',
          tier: tier ?? null,
          office_name: row.office_name ?? row['Office Name'] ?? null,
          unsubscribed: false,
        },
        { onConflict: 'email' }
      ).select('id').single();

      if (contact) {
        imported++;
        if (cid) {
          await db.from('campaign_enrollments').upsert(
            { campaign_id: cid, contact_id: contact.id, status: 'pending', current_step: 0, next_send_at: new Date().toISOString() },
            { onConflict: 'campaign_id,contact_id' }
          );
          enrolled++;
        }
      }
    }

    return NextResponse.json({ imported, skipped, enrolled });
  }

  if (action === 'update_step') {
    const { step_id, subject, body_text } = body;
    if (!step_id) return NextResponse.json({ error: 'step_id required' }, { status: 400 });

    // Convert plain text to simple HTML using the brand layout
    const BRAND_COLOR = '#1e3a5f';
    const ACCENT_COLOR = '#2563eb';
    const paragraphs = (body_text as string)
      .split(/\n\n+/)
      .filter((p: string) => p.trim())
      .map((p: string) => `<p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">${p.replace(/\n/g, '<br/>')}</p>`)
      .join('\n');

    const body_html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
<tr><td style="background:${BRAND_COLOR};padding:28px 40px;text-align:center;">
  <span style="font-size:28px;">☂️</span>
  <div style="color:#fff;font-size:20px;font-weight:700;margin-top:8px;">Umbrella Movers</div>
  <div style="color:#93c5fd;font-size:12px;margin-top:2px;">Las Vegas's Trusted Woman-Owned Mover · Since 2009</div>
</td></tr>
<tr><td style="padding:40px 40px 32px;">${paragraphs}</td></tr>
<tr><td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
  <p style="margin:0;font-size:12px;color:#94a3b8;">Umbrella Movers · 3111 So. Valley View Blvd., Suite E-109, Las Vegas, NV 89102<br/>
  📞 (702) 533-2853 · <a href="https://umbrellamovers.com" style="color:${ACCENT_COLOR};">umbrellamovers.com</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`;

    await db.from('sequence_steps').update({ subject, body_html, body_text }).eq('id', step_id);
    return NextResponse.json({ success: true, body_html });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
