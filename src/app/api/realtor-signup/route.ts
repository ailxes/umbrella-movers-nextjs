import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { createServerClient } from '@/lib/supabase-server';

// Handles realtor sign-ups from the /realtor-partners page.
// Writes the row into the OUTREACH project (service role) and emails the
// team — the same inboxes as quote requests.

const NOTIFY_TO = ['umbrellamovers@gmail.com', 'ailxes@icloud.com'];
const FROM = 'Umbrella Movers <hello@umbrella-movers.com>';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { name?: unknown; email?: unknown; honeypot?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot — silently accept to avoid tipping off bots.
  if (typeof body.honeypot === 'string' && body.honeypot.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 255) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  let saved = false;
  try {
    const db = createServerClient();
    const { error } = await db.from('realtor_partner_signups').insert({ name, email });
    if (error) throw error;
    saved = true;
  } catch (err) {
    console.error('[realtor-signup] DB insert failed:', err);
  }

  const result = await sendEmail({
    to: NOTIFY_TO,
    from: FROM,
    replyTo: email,
    subject: `New Realtor Partner sign-up: ${name}`,
    html: `<h2>New Realtor Partner Program sign-up</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p>Submitted via the /realtor-partners page. Reply to this email to reach them directly.</p>`,
    text: `New Realtor Partner Program sign-up\n\nName: ${name}\nEmail: ${email}\n\nSubmitted via /realtor-partners. Reply to reach them directly.`,
  });

  if (result.error) {
    console.error('[realtor-signup] notification failed:', result.error);
  }

  // Only hard-fail if we neither saved the row nor sent the alert.
  if (!saved && result.error) {
    return NextResponse.json({ error: 'Could not process sign-up' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, saved, notified: !result.error });
}
