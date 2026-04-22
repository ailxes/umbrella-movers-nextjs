import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client for the OUTREACH system only.
// Uses OUTREACH_SUPABASE_URL (new project) + service role key.
// This is intentionally separate from NEXT_PUBLIC_SUPABASE_URL (old project)
// so the quote form, edge functions, Twilio, and SmartMoving integrations are never affected.
export function createServerClient() {
  const url = process.env.OUTREACH_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!url || !key) {
    throw new Error('Missing OUTREACH_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
