/**
 * Umbrella Movers — Outreach Seed Script
 *
 * This script:
 * 1. Creates both campaigns (past customer + realtor) with sequence steps
 * 2. Imports contacts from the CSV files
 * 3. Enrolls past customers into the warm campaign immediately
 * 4. Handles unsubscribes (pass emails as CLI args or list below)
 *
 * Usage:
 *   npx tsx scripts/seed-outreach.ts
 *
 * Prerequisites:
 *   - Run the Supabase migration first (supabase/migrations/20260415_outreach_system.sql)
 *   - Set environment variables (see .env.local)
 *   - npm install tsx papaparse @types/papaparse --save-dev
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.OUTREACH_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const SENDING_DOMAIN = process.env.OUTREACH_SENDING_DOMAIN!; // e.g. "umbrellapartnersLV.com"

// Emails to immediately block (people who asked to unsubscribe)
// Add emails here before running — one per line
const MANUAL_UNSUBSCRIBES: string[] = [
  "saira.rab@gmail.com",
  "shelleyjself@gmail.com",
  "amandarida@gmail.com",
  "michael.tchong@gmail.com",
];

// CSV file paths
const CSV_PATHS = {
  // Reactivation campaign — 2024 customers only
  pastCustomers2024: path.join(
    process.env.HOME!,
    "Desktop/Umbrella Movers/Umbrella Movers Email List/Umbrella_Movers_Customer_List_2024.csv"
  ),
  // Realtor cold outreach — Email Outreach Umbrella folder
  tier1: path.join(
    process.env.HOME!,
    "Desktop/Umbrella Movers/Email Outreach Umbrella/tier1_sweet_spot.csv"
  ),
  tier2: path.join(
    process.env.HOME!,
    "Desktop/Umbrella Movers/Email Outreach Umbrella/tier2_low_volume.csv"
  ),
  tier3: path.join(
    process.env.HOME!,
    "Desktop/Umbrella Movers/Email Outreach Umbrella/tier3_mega_teams.csv"
  ),
};

// ── Email templates (inline to avoid import issues) ───────────────────────────
import { PAST_CUSTOMER_CAMPAIGN, REALTOR_CAMPAIGN } from "../src/lib/email-templates";

// ── Helpers ───────────────────────────────────────────────────────────────────
function parseCSV(filePath: string): Record<string, string>[] {
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ File not found: ${filePath}`);
    return [];
  }
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
  });
}

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim().replace(/;.*$/, ""); // take first if multiple separated by ;
}

async function main() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("❌ Missing OUTREACH_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }
  if (!SENDING_DOMAIN) {
    console.error("❌ Missing OUTREACH_SENDING_DOMAIN (e.g. umbrellapartnersLV.com)");
    process.exit(1);
  }

  const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  });

  console.log("\n🚀 Umbrella Movers Outreach Seed\n");

  // ── 1. Block unsubscribes ─────────────────────────────────────────────────
  if (MANUAL_UNSUBSCRIBES.length > 0) {
    console.log(`📵 Blocking ${MANUAL_UNSUBSCRIBES.length} manual unsubscribes...`);
    for (const email of MANUAL_UNSUBSCRIBES) {
      const normalized = normalizeEmail(email);
      await db.from("outreach_unsubscribes").upsert(
        { email: normalized, reason: "manual" },
        { onConflict: "email" }
      );
      await db
        .from("outreach_contacts")
        .update({ unsubscribed: true, unsubscribed_at: new Date().toISOString() })
        .eq("email", normalized);
    }
    console.log(`  ✓ Done\n`);
  }

  // ── 2. Import past customers ──────────────────────────────────────────────
  console.log("👤 Importing past customers...");
  const { data: unsubList } = await db.from("outreach_unsubscribes").select("email");
  const unsubSet = new Set((unsubList ?? []).map((r: { email: string }) => r.email));

  // Reactivation campaign uses 2024 customers only
  const customerFiles = [
    CSV_PATHS.pastCustomers2024,
  ];

  const seenEmails = new Set<string>();
  let customerCount = 0;

  for (const file of customerFiles) {
    const rows = parseCSV(file);
    for (const row of rows) {
      const email = normalizeEmail(row["Email"] ?? "");
      if (!email || !email.includes("@") || seenEmails.has(email)) continue;
      seenEmails.add(email);

      const isUnsub = unsubSet.has(email);
      await db.from("outreach_contacts").upsert(
        {
          email,
          first_name: row["First Name"] ?? "",
          last_name: row["Last Name"] ?? "",
          full_name: `${row["First Name"] ?? ""} ${row["Last Name"] ?? ""}`.trim(),
          contact_type: "past_customer",
          unsubscribed: isUnsub,
          unsubscribed_at: isUnsub ? new Date().toISOString() : null,
        },
        { onConflict: "email" }
      );
      customerCount++;
    }
  }
  console.log(`  ✓ ${customerCount} past customers imported\n`);

  // ── 3. Import realtors ────────────────────────────────────────────────────
  console.log("🏠 Importing realtors...");
  const realtorFiles = [
    { file: CSV_PATHS.tier1, tier: 1 },
    { file: CSV_PATHS.tier2, tier: 2 },
    { file: CSV_PATHS.tier3, tier: 3 },
  ];

  let realtorCount = 0;
  for (const { file, tier } of realtorFiles) {
    const rows = parseCSV(file);
    for (const row of rows) {
      const rawEmail = row["Email"] ?? "";
      if (rawEmail.toLowerCase() === "not listed" || !rawEmail.includes("@")) continue;
      const email = normalizeEmail(rawEmail);
      if (!email) continue;

      const isUnsub = unsubSet.has(email);
      await db.from("outreach_contacts").upsert(
        {
          email,
          first_name: row["First Name"] ?? "",
          last_name: row["Last Name"] ?? "",
          full_name: row["Full Name"] ?? "",
          contact_type: "realtor",
          tier,
          office_name: row["Office Name"] ?? "",
          active_listings: parseInt(row["Active Listings"] ?? "0") || 0,
          unsubscribed: isUnsub,
          unsubscribed_at: isUnsub ? new Date().toISOString() : null,
        },
        { onConflict: "email" }
      );
      realtorCount++;
    }
  }
  console.log(`  ✓ ${realtorCount} realtors imported\n`);

  // ── 4. Create past customer campaign ──────────────────────────────────────
  console.log("📧 Creating past customer campaign...");
  const fromEmail = `hello@${SENDING_DOMAIN}`;

  const { data: existingCamp } = await db
    .from("outreach_campaigns")
    .select("id")
    .eq("name", PAST_CUSTOMER_CAMPAIGN.name)
    .single();

  let pastCampaignId: string;

  if (existingCamp) {
    pastCampaignId = existingCamp.id;
    console.log("  ℹ Campaign already exists, skipping creation");
  } else {
    const { data: camp, error } = await db
      .from("outreach_campaigns")
      .insert({
        name: PAST_CUSTOMER_CAMPAIGN.name,
        status: "draft",
        campaign_type: PAST_CUSTOMER_CAMPAIGN.campaign_type,
        contact_type: PAST_CUSTOMER_CAMPAIGN.contact_type,
        from_name: "Umbrella Movers",
        from_email: fromEmail,
        reply_to: "umbrellamovers@gmail.com",
        daily_limit: 50,
      })
      .select("id")
      .single();

    if (error || !camp) {
      console.error("  ❌ Failed to create campaign:", error);
      process.exit(1);
    }
    pastCampaignId = camp.id;

    // Insert sequence steps
    for (const step of PAST_CUSTOMER_CAMPAIGN.steps) {
      await db.from("sequence_steps").insert({
        campaign_id: pastCampaignId,
        step_number: step.step_number,
        delay_days: step.delay_days,
        subject: step.subject,
        body_html: step.body_html,
        body_text: step.body_text,
      });
    }
    console.log(`  ✓ Campaign created with ${PAST_CUSTOMER_CAMPAIGN.steps.length} steps`);
  }

  // ── 5. Create realtor campaign ────────────────────────────────────────────
  console.log("\n🏡 Creating realtor campaign...");
  const { data: existingRealtorCamp } = await db
    .from("outreach_campaigns")
    .select("id")
    .eq("name", REALTOR_CAMPAIGN.name)
    .single();

  if (existingRealtorCamp) {
    console.log("  ℹ Campaign already exists, skipping creation");
  } else {
    const { data: realtorCamp, error: realtorErr } = await db
      .from("outreach_campaigns")
      .insert({
        name: REALTOR_CAMPAIGN.name,
        status: "draft",
        campaign_type: REALTOR_CAMPAIGN.campaign_type,
        contact_type: REALTOR_CAMPAIGN.contact_type,
        tier: 1,
        from_name: "Umbrella Movers",
        from_email: fromEmail,
        reply_to: "umbrellamovers@gmail.com",
        daily_limit: 30,
      })
      .select("id")
      .single();

    if (realtorErr || !realtorCamp) {
      console.error("  ❌ Failed to create realtor campaign:", realtorErr);
    } else {
      for (const step of REALTOR_CAMPAIGN.steps) {
        await db.from("sequence_steps").insert({
          campaign_id: realtorCamp.id,
          step_number: step.step_number,
          delay_days: step.delay_days,
          subject: step.subject,
          body_html: step.body_html,
          body_text: step.body_text,
        });
      }
      console.log(`  ✓ Campaign created with ${REALTOR_CAMPAIGN.steps.length} steps`);
    }
  }

  // ── 6. Enroll past customers into the campaign ────────────────────────────
  console.log("\n📋 Enrolling past customers...");
  const { data: pastContacts } = await db
    .from("outreach_contacts")
    .select("id")
    .eq("contact_type", "past_customer")
    .eq("unsubscribed", false);

  let enrolled = 0;
  for (const contact of pastContacts ?? []) {
    const { error } = await db.from("campaign_enrollments").upsert(
      {
        campaign_id: pastCampaignId,
        contact_id: contact.id,
        status: "pending",
        current_step: 0,
        next_send_at: new Date().toISOString(),
      },
      { onConflict: "campaign_id,contact_id" }
    );
    if (!error) enrolled++;
  }
  console.log(`  ✓ ${enrolled} contacts enrolled\n`);

  console.log("✅ Seed complete!\n");
  console.log("Next steps:");
  console.log("  1. Go to /outreach-admin on your site");
  console.log("  2. Click 'Start Warming' on the Past Customer Campaign");
  console.log('  3. The daily cron will fire at 9am PT — or click "Run Daily Send Now" to test');
  console.log("  4. After 2-3 weeks of warming, start the Realtor Campaign\n");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
