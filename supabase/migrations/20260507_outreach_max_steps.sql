-- Adds a per-campaign sequence-length cap (1, 2, or 3 emails).
-- Safe to run multiple times.

ALTER TABLE outreach_campaigns
  ADD COLUMN IF NOT EXISTS max_steps INTEGER NOT NULL DEFAULT 3;

ALTER TABLE outreach_campaigns
  DROP CONSTRAINT IF EXISTS outreach_campaigns_max_steps_check;

ALTER TABLE outreach_campaigns
  ADD CONSTRAINT outreach_campaigns_max_steps_check
  CHECK (max_steps BETWEEN 1 AND 3);
