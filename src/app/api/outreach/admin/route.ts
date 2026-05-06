import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { baseLayout, PAST_CUSTOMER_CAMPAIGN, REALTOR_CAMPAIGN } from '@/lib/email-templates';

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
    const { data: camps, error: campsError } = await db.from('outreach_campaigns').select('*').order('created_at', { ascending: false });
    if (campsError) console.error('campaigns error:', campsError);
    if (!camps?.length) {
      const url = process.env.OUTREACH_SUPABASE_URL ?? 'NOT SET';
      console.error('No campaigns found. OUTREACH_SUPABASE_URL project:', url.split('.')[0].split('//')[1]);
      if (section === 'campaigns') return NextResponse.json({ _debug: { url: url.slice(0, 40), error: campsError?.message }, campaigns: [] });
    }

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
    const { step_id, subject, body_text, body_html: rawHtml, format } = body;
    if (!step_id) return NextResponse.json({ error: 'step_id required' }, { status: 400 });

    let body_html: string;
    let stored_text: string;

    if (format === 'html' && typeof rawHtml === 'string' && rawHtml.trim()) {
      // Custom HTML mode — store as-is. If the paste is body fragment (no <html>),
      // wrap it in baseLayout so header/footer/trust-bar still render.
      body_html = /<html[\s>]/i.test(rawHtml) ? rawHtml : baseLayout(rawHtml);
      // Derive a plain-text fallback by stripping tags
      stored_text = (typeof body_text === 'string' && body_text.trim())
        ? body_text
        : rawHtml
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/p>/gi, '\n\n')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    } else {
      // Plain-text mode — wrap each paragraph then run through baseLayout
      const paragraphs = (body_text as string)
        .split(/\n\n+/)
        .filter((p: string) => p.trim())
        .map((p: string) => `<p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;line-height:1.8;">${p.replace(/\n/g, '<br/>')}</p>`)
        .join('\n');
      body_html = baseLayout(paragraphs);
      stored_text = body_text as string;
    }

    await db.from('sequence_steps').update({ subject, body_html, body_text: stored_text }).eq('id', step_id);
    return NextResponse.json({ success: true, body_html, body_text: stored_text });
  }

  // Regenerate HTML for all steps in both campaigns using the latest template
  if (action === 'regen_html') {
    const allSteps = [...PAST_CUSTOMER_CAMPAIGN.steps, ...REALTOR_CAMPAIGN.steps];
    const { data: campaigns } = await db.from('outreach_campaigns').select('id, name');
    let updated = 0;
    for (const camp of campaigns ?? []) {
      const source = camp.name.includes('Realtor') ? REALTOR_CAMPAIGN : PAST_CUSTOMER_CAMPAIGN;
      for (const step of source.steps) {
        const { data: existing } = await db
          .from('sequence_steps')
          .select('id')
          .eq('campaign_id', camp.id)
          .eq('step_number', step.step_number)
          .single();
        if (existing) {
          await db.from('sequence_steps')
            .update({ body_html: step.body_html, subject: step.subject, body_text: step.body_text })
            .eq('id', existing.id);
          updated++;
        }
      }
    }
    void allSteps; // suppress unused warning
    return NextResponse.json({ updated });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
