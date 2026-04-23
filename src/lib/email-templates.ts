// Email sequence templates for Umbrella Movers outreach campaigns
// All templates support {{first_name}} personalization token
// Design matches umbrellamovers.com: black + white + gold accent

const BRAND_BLACK = '#0a0a0a';
const GOLD        = '#c9a155';  // hsl(39 52% 56%) — matches site --accent
const BODY_TEXT   = '#1a1a1a';
const MUTED       = '#6b6b6b';

export function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Umbrella Movers</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background:#f5f4f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f1;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e8e4de;">

        <!-- Header -->
        <tr>
          <td style="background:${BRAND_BLACK};padding:32px 44px;text-align:center;border-bottom:3px solid ${GOLD};">
            <div style="color:#ffffff;font-size:22px;font-weight:600;font-family:'Playfair Display',Georgia,'Times New Roman',serif;letter-spacing:1px;">Umbrella Movers</div>
            <div style="color:#999999;font-size:11px;margin-top:6px;letter-spacing:2px;text-transform:uppercase;">Las Vegas · Woman-Owned · Since 2009</div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:44px 44px 36px;">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f8f6;padding:24px 44px;border-top:1px solid #e8e4de;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:${MUTED};">Umbrella Movers · 3111 So. Valley View Blvd., Suite E-109, Las Vegas, NV 89102</p>
            <p style="margin:0;font-size:12px;color:${MUTED};">
              <a href="tel:7025332853" style="color:${MUTED};text-decoration:none;">(702) 533-2853</a>
              &nbsp;·&nbsp;
              <a href="https://umbrellamovers.com" style="color:${GOLD};text-decoration:none;">umbrellamovers.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAST CUSTOMER RE-ENGAGEMENT CAMPAIGN
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
        <p style="margin:0 0 20px;font-size:16px;color:${BODY_TEXT};">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          We just wanted to say <strong>thank you</strong> for trusting us with your move.
          Customers like you are the reason we've kept our 5-star reputation for over 15 years here in Las Vegas.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          Busy season is right around the corner — and as a returning customer, we'd love to
          take care of you again. Whether it's your next home, helping a friend, or a big furniture move, we're here.
        </p>

        <!-- Offer box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
          <tr>
            <td style="background:#fdf9f0;border:2px solid ${GOLD};padding:28px;text-align:center;">
              <div style="font-size:11px;font-weight:600;color:${GOLD};text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">Returning Customer Offer</div>
              <div style="font-size:40px;font-weight:700;color:${BRAND_BLACK};font-family:'Playfair Display',Georgia,serif;line-height:1;">$100 OFF</div>
              <div style="font-size:14px;color:${MUTED};margin-top:8px;">your next move with Umbrella Movers</div>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 28px;font-size:14px;color:${MUTED};text-align:center;">
          Just mention this email when you call or book online. No code needed.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/#contact"
                 style="display:inline-block;background:${GOLD};color:${BRAND_BLACK};text-decoration:none;
                        padding:14px 40px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                Get My Free Quote →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:32px 0 0;font-size:14px;color:${MUTED};line-height:1.8;">
          Or give us a call: <a href="tel:7025332853" style="color:${BODY_TEXT};font-weight:600;">(702) 533-2853</a>
        </p>

        <p style="margin:28px 0 0;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          Thank you again,<br/>
          <strong>Shene Serletic</strong><br/>
          <span style="color:${MUTED};font-size:13px;">Owner, Umbrella Movers</span>
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nThank you for trusting us with your move. As a returning customer, we'd love to take care of you again this busy season.\n\nWe're offering $100 OFF your next move. Just mention this email when you call or book.\n\nGet a free quote: https://umbrellamovers.com/#contact\nOr call us: (702) 533-2853\n\nThank you,\nShene Serletic\nOwner, Umbrella Movers`,
    },
    {
      step_number: 2,
      delay_days: 5,
      subject: 'Quick reminder — your $100 off expires soon',
      body_html: baseLayout(`
        <p style="margin:0 0 20px;font-size:16px;color:${BODY_TEXT};">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          Just a quick note — I sent you an offer last week for <strong>$100 off your next move</strong>
          and wanted to make sure it didn't get lost in your inbox.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          May through August is our busiest time of year in Las Vegas, and spots fill up fast.
          If you (or someone you know) has a move coming up, now is the best time to get on our calendar.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
          <tr>
            <td style="background:#fdf9f0;border:2px solid ${GOLD};padding:24px;text-align:center;">
              <div style="font-size:11px;font-weight:600;color:${GOLD};text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Busy season is here — book your date now</div>
              <div style="font-size:32px;font-weight:700;color:${BRAND_BLACK};font-family:'Playfair Display',Georgia,serif;line-height:1.2;">$100 OFF still waiting for you</div>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/#contact"
                 style="display:inline-block;background:${GOLD};color:${BRAND_BLACK};text-decoration:none;
                        padding:14px 40px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                Book My Move →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:28px 0 0;font-size:14px;color:${MUTED};line-height:1.8;">
          Or call us directly: <a href="tel:7025332853" style="color:${BODY_TEXT};font-weight:600;">(702) 533-2853</a><br/>
          We'd love to move you again.
        </p>

        <p style="margin:28px 0 0;font-size:15px;color:${BODY_TEXT};">
          — Shene &amp; the Umbrella Movers team
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nJust a quick reminder about the $100 off offer I sent last week. Busy season is here and spots fill fast.\n\nBook now: https://umbrellamovers.com/#contact\nOr call: (702) 533-2853\n\n— Shene & the Umbrella Movers team`,
    },
    {
      step_number: 3,
      delay_days: 7,
      subject: 'Last note from us, {{first_name}}',
      body_html: baseLayout(`
        <p style="margin:0 0 20px;font-size:16px;color:${BODY_TEXT};">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          I won't keep filling your inbox — this is the last note from us on this.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          If you have a move coming up — whether it's next week or later this year —
          we'd be honored to be your team again. The <strong>$100 off offer</strong> stands anytime you're ready.
        </p>

        <p style="margin:0 0 32px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          And if you know someone who's moving, we'd love the referral. We take great care of everyone you send our way.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/#contact"
                 style="display:inline-block;background:${GOLD};color:${BRAND_BLACK};text-decoration:none;
                        padding:14px 40px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                Get a Free Quote
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:0;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          Thank you for being part of the Umbrella Movers family.<br/><br/>
          <strong>Shene Serletic</strong><br/>
          <span style="color:${MUTED};font-size:13px;">Owner, Umbrella Movers · (702) 533-2853</span>
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nLast note from us — if you have a move coming up, the $100 off is still yours. And if you know someone moving, we'd love the referral.\n\nhttps://umbrellamovers.com/#contact\n(702) 533-2853\n\nThank you,\nShene Serletic\nOwner, Umbrella Movers`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// REALTOR OUTREACH CAMPAIGN
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
        <p style="margin:0 0 20px;font-size:16px;color:${BODY_TEXT};">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          I'm Shene, owner of <strong>Umbrella Movers</strong> — a WBENC-certified woman-owned moving company
          based here in Las Vegas with 15+ years of service and 300+ five-star Yelp reviews.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          I put together a free <strong>Las Vegas Client Moving Kit</strong> — a short checklist and move-day guide
          your buyers and sellers can use to make their move smoother. A lot of agents forward it to clients right after closing.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
          <tr>
            <td style="background:#fdf9f0;border:2px solid ${GOLD};padding:24px;">
              <div style="font-size:11px;font-weight:600;color:${GOLD};text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">What we offer your clients</div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:4px 0;font-size:14px;color:${BODY_TEXT};line-height:1.8;">→ Up to <strong>$100–$200 off</strong> their move (Umbrella Bucks)</td></tr>
                <tr><td style="padding:4px 0;font-size:14px;color:${BODY_TEXT};line-height:1.8;">→ Licensed, insured, no subcontractors — same crew start to finish</td></tr>
                <tr><td style="padding:4px 0;font-size:14px;color:${BODY_TEXT};line-height:1.8;">→ Specialty moves: pianos, safes, high-rises, luxury homes</td></tr>
                <tr><td style="padding:4px 0;font-size:14px;color:${BODY_TEXT};line-height:1.8;">→ Available 7 days a week throughout Clark County</td></tr>
              </table>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 32px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          Would it be helpful to have a resource like this for your clients?
          I'd love to connect — even just to put us on your radar for when the right client comes along.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/realtor-partners"
                 style="display:inline-block;background:${GOLD};color:${BRAND_BLACK};text-decoration:none;
                        padding:14px 40px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                See the Partner Page →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:32px 0 0;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          Thanks for your time,<br/>
          <strong>Shene Serletic</strong><br/>
          <span style="color:${MUTED};font-size:13px;">Owner, Umbrella Movers · (702) 533-2853</span>
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nI'm Shene, owner of Umbrella Movers — a WBENC-certified woman-owned moving company in Las Vegas with 15+ years and 300+ five-star reviews.\n\nI put together a free Las Vegas Client Moving Kit agents can forward to buyers/sellers. We also offer clients up to $200 off their move.\n\nWould it be helpful to have this resource for your clients? Learn more: https://umbrellamovers.com/realtor-partners\n\nThanks,\nShene Serletic\nOwner, Umbrella Movers\n(702) 533-2853`,
    },
    {
      step_number: 2,
      delay_days: 5,
      subject: 'Re: Moving resource for your clients',
      body_html: baseLayout(`
        <p style="margin:0 0 20px;font-size:16px;color:${BODY_TEXT};">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          Just following up on my note from last week about the <strong>Las Vegas Client Moving Kit</strong>.
          Busy season is starting and I wanted to make sure this didn't get buried.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          In case it's useful: we work with a number of Las Vegas agents who refer clients to us regularly.
          We make it easy — no coordination needed on your end, we handle everything directly with your client.
        </p>

        <p style="margin:0 0 32px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          If you'd like to be a preferred partner, I can send over our partner card and set up
          a custom discount for your clients. Just reply to this email and I'll take care of the rest.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/realtor-partners"
                 style="display:inline-block;background:${GOLD};color:${BRAND_BLACK};text-decoration:none;
                        padding:14px 40px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                View Partner Details →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:32px 0 0;font-size:15px;color:${BODY_TEXT};">
          — Shene Serletic<br/>
          <span style="color:${MUTED};font-size:13px;">Umbrella Movers · (702) 533-2853</span>
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nFollowing up on my note about the Las Vegas Client Moving Kit. Busy season is starting and I wanted to make sure this was on your radar.\n\nIf you'd like to be a preferred partner, just reply and I'll send over our partner card with a custom discount for your clients.\n\nhttps://umbrellamovers.com/realtor-partners\n\n— Shene\nUmbrella Movers · (702) 533-2853`,
    },
    {
      step_number: 3,
      delay_days: 7,
      subject: 'Last note — Umbrella Movers partner offer',
      body_html: baseLayout(`
        <p style="margin:0 0 20px;font-size:16px;color:${BODY_TEXT};">Hi {{first_name}},</p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          I'll keep this brief — last note from me.
        </p>

        <p style="margin:0 0 16px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          If any of your clients ever needs a mover they can trust, we're here.
          15 years, 300+ five-star Yelp reviews, no subcontractors, fully licensed and insured.
          We treat every client like they're a referral from a friend — because they are.
        </p>

        <p style="margin:0 0 32px;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          When the timing is right, I'd love to earn your business. Feel free to reach out anytime.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="https://umbrellamovers.com/realtor-partners"
                 style="display:inline-block;background:${GOLD};color:${BRAND_BLACK};text-decoration:none;
                        padding:14px 40px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                umbrellamovers.com/realtor-partners
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:32px 0 0;font-size:15px;color:${BODY_TEXT};line-height:1.8;">
          Thank you for your time,<br/>
          <strong>Shene Serletic</strong><br/>
          <span style="color:${MUTED};font-size:13px;">Owner, Umbrella Movers · (702) 533-2853</span>
        </p>
      `),
      body_text: `Hi {{first_name}},\n\nLast note from me. If any of your clients ever needs a trusted mover — 15 years, 300+ five-star reviews, no subcontractors — we're here.\n\nFeel free to reach out anytime: https://umbrellamovers.com/realtor-partners\n\nThank you,\nShene Serletic\nOwner, Umbrella Movers · (702) 533-2853`,
    },
  ],
};
