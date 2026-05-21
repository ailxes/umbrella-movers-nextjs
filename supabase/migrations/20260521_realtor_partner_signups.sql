-- Realtor Partner Program sign-ups (from /realtor-partners landing page).
-- Lives in the OUTREACH Supabase project (OUTREACH_SUPABASE_URL).
-- Written server-side via the service-role key (/api/realtor-signup),
-- so RLS stays on with no public policy — only the server can read/write.

create table if not exists realtor_partner_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

alter table realtor_partner_signups enable row level security;
