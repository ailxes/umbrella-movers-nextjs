import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

// POST /api/outreach/contacts
// Add a single contact and optionally enroll them in a campaign
export async function POST(req: NextRequest) {
  const CRON_SECRET = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  if (CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { first_name, last_name, email, contact_type = 'past_customer', tier, office_name, campaign_id } = body;

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const db = createServerClient();
  const normalizedEmail = email.toLowerCase().trim();

  // Check unsubscribe list first
  const { data: unsub } = await db
    .from('outreach_unsubscribes')
    .select('email')
    .eq('email', normalizedEmail)
    .single();

  if (unsub) {
    return NextResponse.json({ error: 'This email has unsubscribed and cannot be added' }, { status: 400 });
  }

  // Upsert the contact
  const { data: contact, error: contactErr } = await db
    .from('outreach_contacts')
    .upsert(
      {
        email: normalizedEmail,
        first_name: first_name ?? '',
        last_name: last_name ?? '',
        full_name: `${first_name ?? ''} ${last_name ?? ''}`.trim(),
        contact_type,
        tier: tier ?? null,
        office_name: office_name ?? null,
        unsubscribed: false,
      },
      { onConflict: 'email' }
    )
    .select('id')
    .single();

  if (contactErr || !contact) {
    return NextResponse.json({ error: contactErr?.message ?? 'Failed to save contact' }, { status: 500 });
  }

  // Optionally enroll in a campaign
  if (campaign_id) {
    await db
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
  }

  return NextResponse.json({ success: true, contact_id: contact.id });
}

// DELETE /api/outreach/contacts  (add to unsubscribe list)
export async function DELETE(req: NextRequest) {
  const CRON_SECRET = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  if (CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const db = createServerClient();
  const normalized = email.toLowerCase().trim();

  await db.from('outreach_unsubscribes').upsert({ email: normalized, reason: 'manual_admin' }, { onConflict: 'email' });
  await db.from('outreach_contacts').update({ unsubscribed: true, unsubscribed_at: new Date().toISOString() }).eq('email', normalized);

  // Fetch contact ID then stop enrollments
  const { data: contact } = await db.from('outreach_contacts').select('id').eq('email', normalized).single();
  if (contact) {
    await db.from('campaign_enrollments').update({ status: 'unsubscribed' }).eq('contact_id', contact.id).in('status', ['active', 'pending']);
  }

  return NextResponse.json({ success: true });
}
