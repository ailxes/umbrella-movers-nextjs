// Resend email sender

interface SendEmailOptions {
  to: string;
  from: string;       // e.g. "Umbrella Movers <hello@yourdomain.com>"
  replyTo: string;
  subject: string;
  html: string;
  text?: string;
}

interface SendEmailResult {
  id: string | null;
  error: string | null;
}

export async function sendEmail(opts: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { id: null, error: 'Missing RESEND_API_KEY' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: opts.from,
        to: [opts.to],
        reply_to: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { id: null, error: data?.message ?? `Resend error ${res.status}` };
    }

    return { id: data.id ?? null, error: null };
  } catch (err) {
    return { id: null, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// Inject open-tracking pixel into HTML email body
export function injectTrackingPixel(html: string, sendId: string, baseUrl: string): string {
  const pixel = `<img src="${baseUrl}/api/outreach/track/open?id=${sendId}" width="1" height="1" style="display:none" alt="" />`;
  // Insert before closing </body> if it exists, otherwise append
  if (html.includes('</body>')) {
    return html.replace('</body>', `${pixel}</body>`);
  }
  return html + pixel;
}

// Add unsubscribe link to HTML
export function injectUnsubscribeLink(html: string, email: string, baseUrl: string): string {
  const encoded = encodeURIComponent(email);
  const link = `<p style="text-align:center;font-size:11px;color:#999;margin-top:32px;">
    Don't want to hear from us? <a href="${baseUrl}/api/outreach/unsubscribe?email=${encoded}" style="color:#999;">Unsubscribe</a>
  </p>`;
  if (html.includes('</body>')) {
    return html.replace('</body>', `${link}</body>`);
  }
  return html + link;
}
