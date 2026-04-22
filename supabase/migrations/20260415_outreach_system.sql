-- Umbrella Movers Outreach System
-- Run this in your Supabase SQL editor

-- ─────────────────────────────────────────
-- CONTACTS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS outreach_contacts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name      TEXT,
  last_name       TEXT,
  full_name       TEXT,
  email           TEXT NOT NULL,
  mobile          TEXT,
  city            TEXT,
  contact_type    TEXT NOT NULL DEFAULT 'past_customer', -- 'past_customer' | 'realtor' | 'wcr_member'
  tier            INTEGER,                               -- 1 | 2 | 3 (realtors only)
  office_name     TEXT,
  brokerage_slug  TEXT,
  active_listings INTEGER,
  tags            TEXT[] DEFAULT '{}',
  unsubscribed    BOOLEAN NOT NULL DEFAULT FALSE,
  unsubscribed_at TIMESTAMPTZ,
  bounce_count    INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT outreach_contacts_email_unique UNIQUE (email)
);

-- ─────────────────────────────────────────
-- UNSUBSCRIBE BLOCK LIST
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS outreach_unsubscribes (
  email           TEXT PRIMARY KEY,
  reason          TEXT,
  unsubscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- CAMPAIGNS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS outreach_campaigns (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'draft', -- 'draft' | 'warming' | 'active' | 'paused' | 'completed'
  campaign_type   TEXT NOT NULL DEFAULT 'warm',  -- 'warm' | 'cold'
  from_name       TEXT NOT NULL DEFAULT 'Umbrella Movers',
  from_email      TEXT NOT NULL,                 -- e.g. hello@yourdomain.com
  reply_to        TEXT NOT NULL DEFAULT 'umbrellamovers@gmail.com',
  daily_limit     INTEGER NOT NULL DEFAULT 30,   -- hard cap per day
  warmup_start    DATE,                          -- when warming began
  warmed_at       DATE,                          -- when fully warm
  contact_type    TEXT NOT NULL DEFAULT 'past_customer', -- which contact_type this targets
  tier            INTEGER,                       -- null = all tiers, or 1/2/3
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- SEQUENCE STEPS (email templates per campaign)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sequence_steps (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id  UUID NOT NULL REFERENCES outreach_campaigns(id) ON DELETE CASCADE,
  step_number  INTEGER NOT NULL,            -- 1, 2, 3...
  subject      TEXT NOT NULL,
  body_html    TEXT NOT NULL,
  body_text    TEXT,
  delay_days   INTEGER NOT NULL DEFAULT 0, -- days after previous step (0 = send immediately on enroll)
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (campaign_id, step_number)
);

-- ─────────────────────────────────────────
-- CAMPAIGN ENROLLMENTS (one row per contact per campaign)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campaign_enrollments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id     UUID NOT NULL REFERENCES outreach_campaigns(id) ON DELETE CASCADE,
  contact_id      UUID NOT NULL REFERENCES outreach_contacts(id) ON DELETE CASCADE,
  status          TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'active' | 'completed' | 'replied' | 'unsubscribed' | 'bounced'
  current_step    INTEGER NOT NULL DEFAULT 0,      -- last step sent (0 = none yet)
  next_send_at    TIMESTAMPTZ,                     -- when to send the next step
  enrolled_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at    TIMESTAMPTZ,
  UNIQUE (campaign_id, contact_id)
);

-- ─────────────────────────────────────────
-- EMAIL SEND LOG
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_sends (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id  UUID NOT NULL REFERENCES campaign_enrollments(id) ON DELETE CASCADE,
  contact_id     UUID NOT NULL REFERENCES outreach_contacts(id) ON DELETE CASCADE,
  campaign_id    UUID NOT NULL REFERENCES outreach_campaigns(id) ON DELETE CASCADE,
  step_number    INTEGER NOT NULL,
  resend_id      TEXT,            -- message ID from Resend API
  subject        TEXT NOT NULL,
  sent_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  opened_at      TIMESTAMPTZ,
  clicked_at     TIMESTAMPTZ,
  replied_at     TIMESTAMPTZ,
  bounced_at     TIMESTAMPTZ,
  status         TEXT NOT NULL DEFAULT 'sent' -- 'sent' | 'opened' | 'clicked' | 'bounced' | 'failed'
);

-- ─────────────────────────────────────────
-- WARMING CONFIG
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS warming_config (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sending_domain  TEXT NOT NULL UNIQUE,
  start_date      DATE NOT NULL DEFAULT CURRENT_DATE,
  is_warmed       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_contacts_email         ON outreach_contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_type          ON outreach_contacts(contact_type);
CREATE INDEX IF NOT EXISTS idx_contacts_unsubscribed  ON outreach_contacts(unsubscribed);
CREATE INDEX IF NOT EXISTS idx_enrollments_next_send  ON campaign_enrollments(next_send_at) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_enrollments_pending    ON campaign_enrollments(campaign_id) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_sends_contact          ON email_sends(contact_id);
CREATE INDEX IF NOT EXISTS idx_sends_resend_id        ON email_sends(resend_id);

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY (service role bypasses this)
-- ─────────────────────────────────────────
ALTER TABLE outreach_contacts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_unsubscribes  ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_campaigns     ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_steps         ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_enrollments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sends            ENABLE ROW LEVEL SECURITY;
ALTER TABLE warming_config         ENABLE ROW LEVEL SECURITY;

-- Only service role (server-side) can access outreach tables
CREATE POLICY "service_role_only" ON outreach_contacts      FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON outreach_unsubscribes  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON outreach_campaigns     FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON sequence_steps         FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON campaign_enrollments   FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON email_sends            FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_only" ON warming_config         FOR ALL USING (auth.role() = 'service_role');
