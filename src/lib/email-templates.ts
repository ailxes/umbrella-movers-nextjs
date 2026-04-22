// Email sequence templates for Umbrella Movers outreach campaigns
// All templates support {{first_name}} personalization token

const BRAND_COLOR = '#1e3a5f';
const ACCENT_COLOR = '#2563eb';

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Umbrella Movers</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">

          <!-- Header -->
          <tr>
            <td style="background:${BRAND_COLOR};padding:28px 40px;text-align:center;">
              <span style="font-size:28px;">☂️</span>
              <div style="color:#ffffff;font-size:20px;font-weight:700;margin-top:8px;letter-spacing:0.5px;">Umbrella Movers</div>
              <div style="color:#93c5fd;font-size:12px;margin-top:2px;">Las Vegas's Trusted Woman-Owned Mover · Since 2009</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                Umbrella Movers · 3111 So. Valley View Blvd., Suite E-109, Las Vegas, NV 89102<br/>
                📞 (702) 533-2853 · <a href="https://umbrellamovers.com" style="color:${ACCENT_COLOR};">umbrellamovers.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAST CUSTOMER RE-ENGAGEMENT CAMPAIGN
// 3-step sequence: offer → reminder → last chance
// ─────────────────────────────────────────────────────────────────────────────

export const PAST_CUSTOMER_CAMPAIGN = {
  name: 'Past Customer Re-Engagement — Busy Season 2026',
  campaign_type: 'warm',
  contact_type: 'past_customer',
  steps: [
    {
      step_number: 1,
      delay_days: 0,
      subject: '{{first_name}}, a thank-you (and something for you)',
      body_html: baseLayout(`
        <p style="margin:0 0 20px;font-size:16px;color:#1e293b;">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          We just wanted to say <strong>thank you</strong> for trusting us with your move.
          Customers like you are the reason we've kept our 5-star reputation for over 15 years in Las Vegas.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          Busy season is right around the corner — and as a returning customer, we'd love to
          take care of you again. Whether it's your next home, helping a friend, or a big furniture move,
          we're here.
        </p>

        <!-- Offer box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
          <tr>
            <td style="background:#eff6ff;border:2px solid #bfdbfe;border-radius:10px;padding:24px;text-align:center;">
              <div style="font-size:13px;font-weight:600;color:#2563eb;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Returning Customer Offer</div>
              <div style="font-size:36px;font-weight:800;color:#1e3a5f;">$100 OFF</div>
              <div style="font-size:14px;color:#475569;margin-top:6px;">your next move with Umbrella Movers</div>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 28px;font-size:14px;color:#64748b;text-align:center;">
          Just mention this email when you call or book online. No code needed.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/#contact"
                 style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;
                        padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;">
                Get My Free Quote →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:32px 0 0;font-size:14px;color:#64748b;line-height:1.7;">
          Or just give us a call: <a href="tel:7025332853" style="color:${ACCENT_COLOR};font-weight:600;">(702) 533-2853</a>
        </p>

        <p style="margin:24px 0 0;font-size:15px;color:#334155;">
          Thank you again,<br/>
          <strong>Shene Serletic</strong><br/>
          <span style="color:#64748b;font-size:13px;">Owner, Umbrella Movers</span>
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nThank you for trusting us with your move. As a returning customer, we'd love to take care of you again this busy season.\n\nWe're offering $100 OFF your next move. Just mention this email when you call or book.\n\nGet a free quote: https://umbrellamovers.com/#contact\nOr call us: (702) 533-2853\n\nThank you,\nShene Serletic\nOwner, Umbrella Movers`,
    },
    {
      step_number: 2,
      delay_days: 5,
      subject: 'Quick reminder — your $100 off expires soon',
      body_html: baseLayout(`
        <p style="margin:0 0 20px;font-size:16px;color:#1e293b;">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          Just a quick note — I sent you an offer last week for <strong>$100 off your next move</strong>
          and wanted to make sure it didn't get lost in your inbox.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          May through August is our busiest time of year in Las Vegas, and spots fill up fast.
          If you (or someone you know) has a move coming up, now is the best time to get on our calendar.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
          <tr>
            <td style="background:#fefce8;border:2px solid #fde68a;border-radius:10px;padding:20px;text-align:center;">
              <div style="font-size:14px;color:#92400e;font-weight:600;">⏰ Busy season is here — book your date now</div>
              <div style="font-size:28px;font-weight:800;color:#1e3a5f;margin-top:8px;">$100 OFF still waiting for you</div>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/#contact"
                 style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;
                        padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;">
                Book My Move →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:24px 0 0;font-size:14px;color:#64748b;line-height:1.7;">
          Or call us directly: <a href="tel:7025332853" style="color:${ACCENT_COLOR};font-weight:600;">(702) 533-2853</a><br/>
          We'd love to move you again.
        </p>

        <p style="margin:24px 0 0;font-size:15px;color:#334155;">
          — Shene &amp; the Umbrella Movers team
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nJust a quick reminder about the $100 off offer I sent last week. Busy season is here and spots fill fast.\n\nBook now: https://umbrellamovers.com/#contact\nOr call: (702) 533-2853\n\n— Shene & the Umbrella Movers team`,
    },
    {
      step_number: 3,
      delay_days: 7,
      subject: 'Last note from us, {{first_name}} 👋',
      body_html: baseLayout(`
        <p style="margin:0 0 20px;font-size:16px;color:#1e293b;">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          I won't keep filling your inbox — this is the last note from us on this.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          If you have a move coming up — whether it's next week or later this year —
          we'd be honored to be your team again. The <strong>$100 off offer</strong> stands anytime you're ready.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          And if you know someone who's moving, we'd love the referral. We take great care of
          everyone you send our way.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/#contact"
                 style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;
                        padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;">
                Get a Free Quote
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 0;font-size:15px;color:#334155;line-height:1.7;">
          Thank you for being part of the Umbrella Movers family.<br/><br/>
          <strong>Shene Serletic</strong><br/>
          <span style="color:#64748b;font-size:13px;">Owner, Umbrella Movers · (702) 533-2853</span>
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nLast note from us — if you have a move coming up, the $100 off is still yours. And if you know someone moving, we'd love the referral.\n\nhttps://umbrellamovers.com/#contact\n(702) 533-2853\n\nThank you,\nShene Serletic\nOwner, Umbrella Movers`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// REALTOR OUTREACH CAMPAIGN
// 3-step cold sequence targeting Las Vegas realtors
// ─────────────────────────────────────────────────────────────────────────────

export const REALTOR_CAMPAIGN = {
  name: 'Realtor Partner Outreach — Tier 1',
  campaign_type: 'cold',
  contact_type: 'realtor',
  steps: [
    {
      step_number: 1,
      delay_days: 0,
      subject: 'A moving resource for your Las Vegas clients, {{first_name}}',
      body_html: baseLayout(`
        <p style="margin:0 0 20px;font-size:16px;color:#1e293b;">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          I'm Shene, owner of <strong>Umbrella Movers</strong> — a WBENC-certified woman-owned moving company
          based here in Las Vegas with 15+ years of service and 300+ five-star Yelp reviews.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          I put together a free <strong>Las Vegas Client Moving Kit</strong> — a short checklist and move-day guide
          your buyers and sellers can use to make their move smoother. A lot of agents forward it to clients
          right after closing.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
          <tr>
            <td style="background:#f0fdf4;border:2px solid #bbf7d0;border-radius:10px;padding:20px;">
              <div style="font-size:14px;font-weight:700;color:#166534;margin-bottom:10px;">What we offer your clients:</div>
              <ul style="margin:0;padding-left:20px;color:#334155;font-size:14px;line-height:2;">
                <li>Up to <strong>$100–$200 off</strong> their move (Umbrella Bucks)</li>
                <li>Licensed, insured, no subcontractors — same crew start to finish</li>
                <li>Specialty moves: pianos, safes, high-rises, luxury homes</li>
                <li>Available 7 days a week throughout Clark County</li>
              </ul>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 28px;font-size:15px;color:#334155;line-height:1.7;">
          Would it be helpful to have a resource like this for your clients?
          I'd love to connect — even just to put us on your radar for when the right client comes along.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/realtor-partners"
                 style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;
                        padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;">
                See the Partner Page →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:28px 0 0;font-size:15px;color:#334155;">
          Thanks for your time,<br/>
          <strong>Shene Serletic</strong><br/>
          <span style="color:#64748b;font-size:13px;">Owner, Umbrella Movers · (702) 533-2853</span>
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nI'm Shene, owner of Umbrella Movers — a WBENC-certified woman-owned moving company in Las Vegas with 15+ years and 300+ five-star reviews.\n\nI put together a free Las Vegas Client Moving Kit agents can forward to buyers/sellers. We also offer clients up to $200 off their move.\n\nWould it be helpful to have this resource for your clients? Learn more: https://umbrellamovers.com/realtor-partners\n\nThanks,\nShene Serletic\nOwner, Umbrella Movers\n(702) 533-2853`,
    },
    {
      step_number: 2,
      delay_days: 5,
      subject: 'Re: Moving resource for your clients',
      body_html: baseLayout(`
        <p style="margin:0 0 20px;font-size:16px;color:#1e293b;">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          Just following up on my note from last week about the <strong>Las Vegas Client Moving Kit</strong>.
          Busy season is starting and I wanted to make sure this didn't get buried.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          In case it's useful: we work with a number of Las Vegas agents who refer clients to us
          regularly. We make it easy — no coordination needed on your end, we handle everything
          directly with your client.
        </p>

        <p style="margin:0 0 28px;font-size:15px;color:#334155;line-height:1.7;">
          If you'd like to be a preferred partner, I can send over our partner card and set up
          a custom discount for your clients. Just reply to this email and I'll take care of the rest.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/realtor-partners"
                 style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;
                        padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;">
                View Partner Details →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:28px 0 0;font-size:15px;color:#334155;">
          — Shene Serletic<br/>
          <span style="color:#64748b;font-size:13px;">Umbrella Movers · (702) 533-2853</span>
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nFollowing up on my note about the Las Vegas Client Moving Kit. Busy season is starting and I wanted to make sure this was on your radar.\n\nIf you'd like to be a preferred partner, just reply and I'll send over our partner card with a custom discount for your clients.\n\nhttps://umbrellamovers.com/realtor-partners\n\n— Shene\nUmbrella Movers · (702) 533-2853`,
    },
    {
      step_number: 3,
      delay_days: 7,
      subject: 'Last note — Umbrella Movers partner offer',
      body_html: baseLayout(`
        <p style="margin:0 0 20px;font-size:16px;color:#1e293b;">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          I'll keep this brief — last note from me.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">
          If any of your clients ever needs a mover they can trust, we're here.
          15 years, 300+ five-star Yelp reviews, no subcontractors, fully licensed and insured.
          We treat every client like they're a referral from a friend — because they are.
        </p>

        <p style="margin:0 0 28px;font-size:15px;color:#334155;line-height:1.7;">
          When the timing is right, I'd love to earn your business. Feel free to reach out anytime.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/realtor-partners"
                 style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;
                        padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;">
                umbrellamovers.com/realtor-partners
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:28px 0 0;font-size:15px;color:#334155;">
          Thank you for your time,<br/>
          <strong>Shene Serletic</strong><br/>
          <span style="color:#64748b;font-size:13px;">Owner, Umbrella Movers · (702) 533-2853</span>
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nLast note from me. If any of your clients ever needs a trusted mover — 15 years, 300+ five-star reviews, no subcontractors — we're here.\n\nFeel free to reach out anytime: https://umbrellamovers.com/realtor-partners\n\nThank you,\nShene Serletic\nOwner, Umbrella Movers · (702) 533-2853`,
    },
  ],
};
