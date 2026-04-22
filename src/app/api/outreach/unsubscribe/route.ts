import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email) {
    return new NextResponse('Missing email', { status: 400 });
  }

  try {
    const db = createServerClient();

    // Add to block list
    await db
      .from('outreach_unsubscribes')
      .upsert({ email, reason: 'link_click' }, { onConflict: 'email' });

    // Mark contact as unsubscribed
    await db
      .from('outreach_contacts')
      .update({ unsubscribed: true, unsubscribed_at: new Date().toISOString() })
      .eq('email', email);

    // Stop all active enrollments for this contact
    const { data: contact } = await db.from('outreach_contacts').select('id').eq('email', email).single();
    if (contact) {
      await db.from('campaign_enrollments').update({ status: 'unsubscribed' }).eq('contact_id', contact.id).in('status', ['active', 'pending']);
    }

  } catch (err) {
    console.error('[unsubscribe] Error:', err);
  }

  // Return a clean confirmation page
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribed — Umbrella Movers</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
           display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; background: #f8fafc; color: #1e293b; }
    .card { background: white; border-radius: 12px; padding: 48px 40px;
            max-width: 420px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
    h1 { font-size: 22px; margin: 0 0 12px; }
    p  { color: #64748b; line-height: 1.6; margin: 0; }
    a  { color: #2563eb; }
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size:40px;margin-bottom:16px">☂️</div>
    <h1>You're unsubscribed</h1>
    <p>We've removed <strong>${email}</strong> from our mailing list.<br/>
    You won't hear from us again.<br/><br/>
    Need a move? We're always here at
    <a href="https://umbrellamovers.com">umbrellamovers.com</a></p>
  </div>
</body>
</html>`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    }
  );
}

// Handle POST unsubscribes too (from email clients that POST list-unsubscribe)
export async function POST(req: NextRequest) {
  return GET(req);
}
