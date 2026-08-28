import { NextRequest, NextResponse } from 'next/server';
import { sendSms } from '@/lib/twilio';

// Sends an SMS alert when a customer submits any quote form (QuoteForm,
// HeroQuoteForm, or the homepage Contact form). Fire-and-forget from the
// client, alongside the email and SmartMoving notifications.

const NOTIFY_PHONE = '+17025332853';

export async function POST(req: NextRequest) {
  let body: {
    name?: unknown;
    phone?: unknown;
    email?: unknown;
    move_date?: unknown;
    move_size?: unknown;
    move_type?: unknown;
    zip_code?: unknown;
    destination_zip_code?: unknown;
    honeypot?: unknown;
  };
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
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const moveDate = typeof body.move_date === 'string' ? body.move_date.trim() : '';
  const moveSize =
    typeof body.move_size === 'string' && body.move_size.trim()
      ? body.move_size.trim()
      : typeof body.move_type === 'string'
        ? body.move_type.trim()
        : '';
  const zipCode = typeof body.zip_code === 'string' ? body.zip_code.trim() : '';
  const destinationZipCode =
    typeof body.destination_zip_code === 'string' ? body.destination_zip_code.trim() : '';

  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const lines = [
    'New quote request:',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
  ];
  if (moveSize) lines.push(`Size: ${moveSize}`);
  if (moveDate) lines.push(`Date: ${moveDate}`);
  if (zipCode) lines.push(`From Zip: ${zipCode}`);
  if (destinationZipCode) lines.push(`To Zip: ${destinationZipCode}`);

  const result = await sendSms({ to: NOTIFY_PHONE, body: lines.join('\n') });

  if (result.error) {
    console.error('[notify-quote-sms] Twilio send failed:', result.error);
    return NextResponse.json({ error: 'SMS send failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sid: result.sid });
}
