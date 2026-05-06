// Email sequence templates for Umbrella Movers outreach campaigns
// All templates support {{first_name}} personalization token
// Editorial aesthetic: dark brown + cream + gold, Playfair Display serif

const PRIMARY_DARK   = '#3C2415';  // header / footer background
const BODY_BG        = '#FAF7F2';  // page background (cream / off-white)
const CARD_BG        = '#FFFFFF';  // email card background
const ACCENT_GOLD    = '#A68966';  // stars, dividers, accents
const ACTION_BG      = '#F2EDE4';  // action box (slightly darker cream)
const TEXT_BODY      = '#2D2D2D';  // body copy
const TEXT_HEADER    = '#A68966';  // header / footer text (gold)
const TEXT_MUTED     = '#7A6B5C';  // soft brown muted

const SERIF_BODY  = `'Playfair Display', Georgia, 'Times New Roman', serif`;
const SERIF_CAPS  = `'Playfair Display', Georgia, 'Times New Roman', serif`;

export function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Umbrella Movers</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background:${BODY_BG};font-family:${SERIF_BODY};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BODY_BG};padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${CARD_BG};">

        <!-- Header -->
        <tr>
          <td style="background:${PRIMARY_DARK};padding:36px 44px;text-align:center;">
            <table cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td style="color:${TEXT_HEADER};font-size:14px;padding-right:18px;font-family:${SERIF_CAPS};line-height:1;">&#9670;</td>
                <td style="color:${TEXT_HEADER};font-size:18px;font-family:${SERIF_CAPS};letter-spacing:3px;text-transform:uppercase;font-weight:600;line-height:1;">Umbrella Movers</td>
                <td style="color:${TEXT_HEADER};font-size:14px;padding-left:18px;font-family:${SERIF_CAPS};line-height:1;">&#9670;</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:48px 56px 40px;background:${CARD_BG};">
            ${content}
          </td>
        </tr>

        <!-- Trust Bar -->
        <tr>
          <td style="background:${CARD_BG};padding:0 56px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${ACTION_BG};border-bottom:1px solid ${ACTION_BG};">
              <tr>
                <td width="33%" style="padding:18px 12px;text-align:center;border-right:1px solid ${ACTION_BG};">
                  <div style="font-family:${SERIF_CAPS};font-size:11px;letter-spacing:2px;color:${PRIMARY_DARK};text-transform:uppercase;font-weight:600;">Woman-Owned</div>
                  <div style="font-family:${SERIF_BODY};font-size:11px;color:${TEXT_MUTED};font-style:italic;margin-top:4px;">Since 2009</div>
                </td>
                <td width="34%" style="padding:18px 12px;text-align:center;border-right:1px solid ${ACTION_BG};">
                  <div style="font-family:${SERIF_CAPS};font-size:11px;letter-spacing:2px;color:${PRIMARY_DARK};text-transform:uppercase;font-weight:600;">5-Star Rated</div>
                  <div style="font-family:${SERIF_BODY};font-size:11px;color:${TEXT_MUTED};font-style:italic;margin-top:4px;">Google &amp; Yelp</div>
                </td>
                <td width="33%" style="padding:18px 12px;text-align:center;">
                  <div style="font-family:${SERIF_CAPS};font-size:11px;letter-spacing:2px;color:${PRIMARY_DARK};text-transform:uppercase;font-weight:600;">Licensed</div>
                  <div style="font-family:${SERIF_BODY};font-size:11px;color:${TEXT_MUTED};font-style:italic;margin-top:4px;">CPCN 3364</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${PRIMARY_DARK};padding:32px 44px;text-align:center;">
            <div style="font-family:${SERIF_CAPS};font-size:14px;letter-spacing:3px;color:${TEXT_HEADER};text-transform:uppercase;font-weight:600;">Umbrella Movers</div>
            <div style="font-family:${SERIF_BODY};font-size:12px;color:${TEXT_HEADER};margin-top:8px;font-style:italic;letter-spacing:0.5px;">Las Vegas, NV</div>
            <div style="font-family:${SERIF_BODY};font-size:10px;color:${TEXT_HEADER};opacity:0.75;margin-top:18px;line-height:1.6;">
              You're receiving this because you've worked with us or requested information about our services.
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Reusable italic action box — centered, cream bg, 4px gold left border
function actionBox(innerHtml: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
      <tr>
        <td style="background:${ACTION_BG};border-left:4px solid ${ACCENT_GOLD};padding:28px 32px;text-align:center;">
          <div style="font-family:${SERIF_BODY};font-style:italic;font-size:16px;color:${TEXT_BODY};line-height:1.7;">
            ${innerHtml}
          </div>
        </td>
      </tr>
    </table>
  `;
}

// Reusable signature block in serif
function signature(name: string, title: string): string {
  return `
    <p style="margin:36px 0 0;font-family:${SERIF_BODY};font-size:15px;color:${TEXT_BODY};line-height:1.8;">
      Warmly,<br/>
      <span style="font-family:${SERIF_BODY};font-size:20px;font-weight:600;color:${PRIMARY_DARK};">${name}</span><br/>
      <span style="font-family:${SERIF_BODY};font-style:italic;color:${TEXT_MUTED};font-size:13px;">${title}</span>
    </p>
  `;
}

// Reusable paragraph helper
function p(text: string): string {
  return `<p style="margin:0 0 18px;font-family:${SERIF_BODY};font-size:16px;color:${TEXT_BODY};line-height:1.85;">${text}</p>`;
}

// Greeting (left-aligned serif)
function greeting(text: string): string {
  return `<p style="margin:0 0 24px;font-family:${SERIF_BODY};font-size:17px;color:${PRIMARY_DARK};line-height:1.6;">${text}</p>`;
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
        ${greeting('Dear {{first_name}},')}
        ${p(`We just wanted to take a quiet moment to say <em>thank you</em> for trusting us with your move. Customers like you are the reason we've been able to keep our 5-star reputation here in Las Vegas for over fifteen years.`)}
        ${p(`Busy season is right around the corner — and as a returning member of the Umbrella family, we'd love to take care of you again. Whether it's your next home, a friend who needs a hand, or a single piece that needs careful attention, we're here.`)}
        ${actionBox(`As a thank-you, we'd like to offer you <strong>$100 off</strong> your next move.<br/>Just reply to this email and we'll take care of the rest.`)}
        ${p(`If you'd rather speak with us directly, you can always reach me at <strong style="color:${PRIMARY_DARK};">(702) 533-2853</strong>. I read every reply personally.`)}
        ${signature('Shene Serletic', 'Owner, Umbrella Movers')}
      `),
      body_text: `Dear {{first_name}},\n\nWe just wanted to say thank you for trusting us with your move. Customers like you are the reason we've kept our 5-star reputation in Las Vegas for over fifteen years.\n\nBusy season is right around the corner — and as a returning member of the Umbrella family, we'd love to take care of you again.\n\nAs a thank-you, we'd like to offer you $100 off your next move. Just reply to this email and we'll take care of the rest.\n\nOr reach me directly at (702) 533-2853 — I read every reply personally.\n\nWarmly,\nShene Serletic\nOwner, Umbrella Movers`,
    },
    {
      step_number: 2,
      delay_days: 5,
      subject: 'A quiet reminder, {{first_name}}',
      body_html: baseLayout(`
        ${greeting('Dear {{first_name}},')}
        ${p(`I wanted to write a brief follow-up to my note from last week — just to make sure it didn't get lost in your inbox.`)}
        ${p(`May through August is our busiest stretch of the year in Las Vegas, and our calendar tends to fill quickly. If you (or someone close to you) has a move on the horizon, this is the gentlest time to put it on our schedule.`)}
        ${actionBox(`Your <strong>$100 thank-you</strong> is still here when you're ready.<br/>A short reply is all it takes.`)}
        ${p(`No pressure at all — only an open door whenever the timing feels right.`)}
        ${signature('Shene Serletic', 'Owner, Umbrella Movers')}
      `),
      body_text: `Dear {{first_name}},\n\nA brief follow-up to my note from last week — just to make sure it didn't get lost in your inbox.\n\nMay through August is our busiest stretch in Las Vegas, and the calendar tends to fill quickly. If you or someone close to you has a move on the horizon, this is the easiest time to get on our schedule.\n\nYour $100 thank-you is still here when you're ready. A short reply is all it takes.\n\nNo pressure — only an open door whenever the timing feels right.\n\nWarmly,\nShene Serletic\nOwner, Umbrella Movers`,
    },
    {
      step_number: 3,
      delay_days: 7,
      subject: 'A final note, {{first_name}}',
      body_html: baseLayout(`
        ${greeting('Dear {{first_name}},')}
        ${p(`I won't keep filling your inbox — this is the last note from me on this.`)}
        ${p(`If a move appears on your calendar this year, near or far out, we'd be honored to be your team again. Your <em>$100 thank-you</em> stands open-ended; it doesn't expire.`)}
        ${p(`And if a friend or neighbor is moving, we'd be grateful for the introduction. We treat every person you send our way the same way we'd treat you.`)}
        ${actionBox(`Whenever the moment arrives, simply reply to this email.<br/>I'll take it from there, personally.`)}
        ${p(`Thank you, sincerely, for being part of the Umbrella Movers family.`)}
        ${signature('Shene Serletic', 'Owner, Umbrella Movers')}
      `),
      body_text: `Dear {{first_name}},\n\nI won't keep filling your inbox — this is the last note from me on this.\n\nIf a move appears on your calendar this year, near or far out, we'd be honored to be your team again. Your $100 thank-you stands open-ended; it doesn't expire.\n\nAnd if a friend or neighbor is moving, we'd be grateful for the introduction. We treat everyone you send our way the same way we'd treat you.\n\nWhenever the moment arrives, simply reply to this email. I'll take it from there, personally.\n\nThank you, sincerely, for being part of the Umbrella Movers family.\n\nWarmly,\nShene Serletic\nOwner, Umbrella Movers`,
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
        ${greeting('Dear {{first_name}},')}
        ${p(`I'm Shene, owner of <strong>Umbrella Movers</strong> — a WBENC-certified, woman-owned moving company here in Las Vegas. We've been serving this city for over fifteen years and have earned more than three hundred five-star reviews along the way.`)}
        ${p(`I'm reaching out because I put together something I thought you might find useful for your clients: a small, thoughtful <em>Las Vegas Client Moving Kit</em> — a short checklist and move-day guide your buyers and sellers can lean on after closing. A number of agents we work with quietly forward it the day the keys change hands.`)}
        ${actionBox(`If you'd like a copy — or to chat about what a partnership could look like —<br/>just reply to this email. I'll send it over personally.`)}
        ${p(`We offer your clients up to <strong>$100–$200 off</strong> their move, the same crew start to finish (no subcontractors), and the same care we'd give a member of our own family.`)}
        ${signature('Shene Serletic', 'Owner, Umbrella Movers')}
      `),
      body_text: `Dear {{first_name}},\n\nI'm Shene, owner of Umbrella Movers — a WBENC-certified, woman-owned moving company here in Las Vegas. We've been serving this city for over fifteen years and have earned more than three hundred five-star reviews along the way.\n\nI put together something I thought you might find useful for your clients: a small, thoughtful Las Vegas Client Moving Kit — a short checklist and move-day guide your buyers and sellers can lean on after closing. A number of agents quietly forward it the day the keys change hands.\n\nIf you'd like a copy — or to chat about what a partnership could look like — just reply to this email. I'll send it over personally.\n\nWe offer your clients up to $100–$200 off their move, the same crew start to finish (no subcontractors), and the same care we'd give a member of our own family.\n\nWarmly,\nShene Serletic\nOwner, Umbrella Movers`,
    },
    {
      step_number: 2,
      delay_days: 5,
      subject: 'Following up gently, {{first_name}}',
      body_html: baseLayout(`
        ${greeting('Dear {{first_name}},')}
        ${p(`I wanted to follow up briefly on my note from last week about the <em>Las Vegas Client Moving Kit</em>. Busy season is opening up, and I didn't want it to slip past you.`)}
        ${p(`To make this easy: we work with a number of Las Vegas agents who refer clients to us regularly. There's nothing for you to coordinate — once you make the introduction, we handle every detail directly with your client.`)}
        ${actionBox(`If you'd like to be set up as a preferred partner with a custom client discount,<br/>simply reply with the word <strong>"yes"</strong> and I'll take care of it.`)}
        ${signature('Shene Serletic', 'Owner, Umbrella Movers')}
      `),
      body_text: `Dear {{first_name}},\n\nI wanted to follow up briefly on my note from last week about the Las Vegas Client Moving Kit. Busy season is opening up, and I didn't want it to slip past you.\n\nTo make this easy: we work with a number of Las Vegas agents who refer clients to us regularly. There's nothing for you to coordinate — once you make the introduction, we handle every detail directly with your client.\n\nIf you'd like to be set up as a preferred partner with a custom client discount, simply reply with the word "yes" and I'll take care of it.\n\nWarmly,\nShene Serletic\nOwner, Umbrella Movers`,
    },
    {
      step_number: 3,
      delay_days: 7,
      subject: 'A final note from Umbrella Movers',
      body_html: baseLayout(`
        ${greeting('Dear {{first_name}},')}
        ${p(`I'll keep this brief — this is the last note from me.`)}
        ${p(`If one of your clients ever needs a mover they can quietly trust, we're here. Fifteen years, three hundred-plus five-star reviews, no subcontractors, fully licensed and insured. We treat every client as though they were referred by a dear friend — because, in time, we hope they will be.`)}
        ${actionBox(`When the moment is right, just reply to this email.<br/>I'd be honored to earn your trust.`)}
        ${signature('Shene Serletic', 'Owner, Umbrella Movers')}
      `),
      body_text: `Dear {{first_name}},\n\nI'll keep this brief — this is the last note from me.\n\nIf one of your clients ever needs a mover they can quietly trust, we're here. Fifteen years, three hundred-plus five-star reviews, no subcontractors, fully licensed and insured. We treat every client as though they were referred by a dear friend — because, in time, we hope they will be.\n\nWhen the moment is right, just reply to this email. I'd be honored to earn your trust.\n\nWarmly,\nShene Serletic\nOwner, Umbrella Movers`,
    },
  ],
};
