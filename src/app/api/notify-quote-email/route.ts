import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

// Internal email alert for every quote request, sent to both notification
// addresses. Fire-and-forget from the client via lib/notifyQuote.ts,
// alongside the SMS alert.
//
// This is the INTERNAL alert. The `send-quote-email` Supabase edge function
// sends the customer their confirmation ("Check your email for a
// confirmation" in the submit toast) and is a separate concern.

const NOTIFY_TO = ['umbrellamovers@gmail.com', 'ailxes@icloud.com'];
const FROM = 'Umbrella Movers <hello@umbrella-movers.com>';

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot — silently accept to avoid tipping off bots.
  if (str(body.honeypot) !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name);
  const phone = str(body.phone);
  const email = str(body.email);

  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const moveSize = str(body.move_size) || str(body.move_type);
  const moveDate = str(body.move_date);
  const zipCode = str(body.zip_code);
  const destinationZipCode = str(body.destination_zip_code);
  const message = str(body.message);

  const rows: [string, string][] = [
    ['Name', name],
    ['Phone', phone],
    ['Email', email],
  ];
  if (moveSize) rows.push(['Move size', moveSize]);
  if (moveDate) rows.push(['Move date', moveDate]);
  if (zipCode) rows.push(['From zip', zipCode]);
  if (destinationZipCode) rows.push(['To zip', destinationZipCode]);
  if (message) rows.push(['Details', message]);

  const html = `<h2>New quote request</h2>
    ${rows
      .map(
        ([k, v]) =>
          `<p><strong>${k}:</strong> ${
            k === 'Email'
              ? `<a href="mailto:${escapeHtml(v)}">${escapeHtml(v)}</a>`
              : k === 'Phone'
                ? `<a href="tel:${escapeHtml(v.replace(/[^0-9+]/g, ''))}">${escapeHtml(v)}</a>`
                : escapeHtml(v).replace(/\n/g, '<br>')
          }</p>`,
      )
      .join('\n    ')}
    <p>Reply to this email to reach the customer directly.</p>`;

  const text = `New quote request\n\n${rows
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')}\n\nReply to reach the customer directly.`;

  const result = await sendEmail({
    to: NOTIFY_TO,
    from: FROM,
    replyTo: email,
    subject: `New quote request: ${name}`,
    html,
    text,
  });

  if (result.error) {
    console.error('[notify-quote-email] send failed:', result.error);
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: result.id });
}
