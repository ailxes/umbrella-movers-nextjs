"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Types ────────────────────────────────────────────────────────────────────
interface Campaign {
  id: string;
  name: string;
  status: string;
  campaign_type: string;
  contact_type: string;
  from_email: string;
  daily_limit: number;
  warmup_start: string | null;
  warmed_at: string | null;
  created_at: string;
}

interface CampaignStat {
  id: string;
  name: string;
  totalSent: number;
  sentToday: number;
  opened: number;
  pending: number;
  completed: number;
  replied: number;
}

interface GlobalStats {
  totalContacts: number;
  totalSent: number;
  totalOpened: number;
  totalUnsubscribed: number;
  sentToday: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  draft:     "bg-slate-100 text-slate-600",
  warming:   "bg-amber-100 text-amber-700",
  active:    "bg-green-100 text-green-700",
  paused:    "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const CRON_SECRET = ""; // Leave blank locally — the admin page calls the API directly

// ─── Sub-components ──────────────────────────────────────────────────────────
function WarmingBar({ startDate }: { startDate: string }) {
  const day = Math.floor(
    (Date.now() - new Date(startDate).getTime()) / 86_400_000
  ) + 1;
  const pct   = Math.min((day / 22) * 100, 100);
  const warm  = day >= 22;
  const limit = day < 4 ? 20 : day < 8 ? 40 : day < 15 ? 75 : day < 22 ? 150 : 250;

  return (
    <div className="mt-3 space-y-1">
      <div className="flex justify-between text-xs text-slate-500">
        <span>Warming — Day {day}/22 · {limit}/day limit</span>
        <span className={warm ? "text-green-600 font-medium" : ""}>{warm ? "✓ Fully warmed" : `${Math.round(pct)}%`}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${warm ? "bg-green-500" : "bg-amber-400"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatPill({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`rounded-lg px-3 py-2 text-center ${accent ? "bg-blue-50" : "bg-slate-50"}`}>
      <div className={`text-lg font-bold ${accent ? "text-blue-700" : "text-slate-800"}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-0.5">{label}</div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function OutreachAdmin() {
  const [campaigns, setCampaigns]     = useState<Campaign[]>([]);
  const [campStats, setCampStats]     = useState<CampaignStat[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading]         = useState(true);
  const [busy, setBusy]               = useState<string | null>(null);
  const [toast, setToast]             = useState<{ msg: string; ok: boolean } | null>(null);
  const [activeTab, setActiveTab]     = useState<"campaigns" | "add-contact" | "unsubscribe">("campaigns");

  // Add contact form
  const [newContact, setNewContact]   = useState({ first_name: "", last_name: "", email: "", contact_type: "past_customer", campaign_id: "" });
  // Unsubscribe form
  const [unsubEmail, setUnsubEmail]   = useState("");

  const notify = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const today = new Date(); today.setHours(0, 0, 0, 0);

    const [
      { data: camps },
      { count: totalContacts },
      { count: totalSent },
      { count: totalOpened },
      { count: totalUnsubscribed },
      { count: sentToday },
    ] = await Promise.all([
      supabase.from("outreach_campaigns").select("*").order("created_at", { ascending: false }),
      supabase.from("outreach_contacts").select("*", { count: "exact", head: true }),
      supabase.from("email_sends").select("*", { count: "exact", head: true }),
      supabase.from("email_sends").select("*", { count: "exact", head: true }).not("opened_at", "is", null),
      supabase.from("outreach_contacts").select("*", { count: "exact", head: true }).eq("unsubscribed", true),
      supabase.from("email_sends").select("*", { count: "exact", head: true }).gte("sent_at", today.toISOString()),
    ]);

    setCampaigns(camps ?? []);
    setGlobalStats({ totalContacts: totalContacts ?? 0, totalSent: totalSent ?? 0, totalOpened: totalOpened ?? 0, totalUnsubscribed: totalUnsubscribed ?? 0, sentToday: sentToday ?? 0 });

    // Per-campaign stats
    const stats: CampaignStat[] = [];
    for (const c of camps ?? []) {
      const [
        { count: ts }, { count: st }, { count: op },
        { count: pn }, { count: co }, { count: re },
      ] = await Promise.all([
        supabase.from("email_sends").select("*", { count: "exact", head: true }).eq("campaign_id", c.id),
        supabase.from("email_sends").select("*", { count: "exact", head: true }).eq("campaign_id", c.id).gte("sent_at", today.toISOString()),
        supabase.from("email_sends").select("*", { count: "exact", head: true }).eq("campaign_id", c.id).not("opened_at", "is", null),
        supabase.from("campaign_enrollments").select("*", { count: "exact", head: true }).eq("campaign_id", c.id).in("status", ["pending", "active"]),
        supabase.from("campaign_enrollments").select("*", { count: "exact", head: true }).eq("campaign_id", c.id).eq("status", "completed"),
        supabase.from("campaign_enrollments").select("*", { count: "exact", head: true }).eq("campaign_id", c.id).eq("status", "replied"),
      ]);
      stats.push({ id: c.id, name: c.name, totalSent: ts ?? 0, sentToday: st ?? 0, opened: op ?? 0, pending: pn ?? 0, completed: co ?? 0, replied: re ?? 0 });
    }
    setCampStats(stats);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function updateCampaignStatus(id: string, status: string) {
    setBusy(id);
    const updates: Record<string, unknown> = { status };
    if (status === "warming") updates.warmup_start = new Date().toISOString().split("T")[0];
    await supabase.from("outreach_campaigns").update(updates).eq("id", id);
    await load();
    setBusy(null);
    notify(status === "paused" ? "Campaign paused ✓" : `Campaign set to ${status} ✓`);
  }

  async function enrollAll(campaign_id: string, name: string) {
    setBusy(`enroll-${campaign_id}`);
    const res = await fetch("/api/outreach/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaign_id, action: "enroll_all" }),
    });
    const data = await res.json();
    await load();
    setBusy(null);
    notify(`Enrolled ${data.enrolled} contacts into "${name}" ✓`);
  }

  async function runDailySend() {
    setBusy("cron");
    const res = await fetch("/api/outreach/cron");
    const data = await res.json();
    await load();
    setBusy(null);
    notify(`Sent ${data.totalSent ?? 0} emails ✓`);
  }

  async function addContact(e: React.FormEvent) {
    e.preventDefault();
    if (!newContact.email) return;
    setBusy("add-contact");
    const res = await fetch("/api/outreach/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newContact, campaign_id: newContact.campaign_id || undefined }),
    });
    const data = await res.json();
    setBusy(null);
    if (res.ok) {
      notify(`${newContact.email} added ✓`);
      setNewContact({ first_name: "", last_name: "", email: "", contact_type: "past_customer", campaign_id: "" });
      await load();
    } else {
      notify(data.error ?? "Failed to add contact", false);
    }
  }

  async function addUnsubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!unsubEmail) return;
    setBusy("unsub");
    const res = await fetch("/api/outreach/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: unsubEmail }),
    });
    setBusy(null);
    if (res.ok) {
      notify(`${unsubEmail} unsubscribed and blocked ✓`);
      setUnsubEmail("");
      await load();
    } else {
      notify("Failed to unsubscribe", false);
    }
  }

  const openRate = globalStats && globalStats.totalSent > 0
    ? Math.round((globalStats.totalOpened / globalStats.totalSent) * 100)
    : 0;

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-400 text-sm">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white transition-all ${toast.ok ? "bg-green-600" : "bg-red-600"}`}>
          {toast.msg}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">☂️ Email Platform</h1>
            <p className="text-slate-500 text-sm mt-0.5">Umbrella Movers · umbrella-movers.com</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={!!busy}>Refresh</Button>
            <Button
              size="sm"
              className="bg-slate-900 text-white hover:bg-slate-700"
              onClick={runDailySend}
              disabled={!!busy}
            >
              {busy === "cron" ? "Sending…" : "▶ Run Today's Send"}
            </Button>
          </div>
        </div>

        {/* Global stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatPill label="Total Contacts"  value={globalStats?.totalContacts.toLocaleString() ?? 0} />
          <StatPill label="Total Sent"      value={globalStats?.totalSent.toLocaleString() ?? 0} />
          <StatPill label="Open Rate"       value={`${openRate}%`} accent />
          <StatPill label="Sent Today"      value={globalStats?.sentToday ?? 0} accent />
          <StatPill label="Unsubscribed"    value={globalStats?.totalUnsubscribed ?? 0} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200">
          {(["campaigns", "add-contact", "unsubscribe"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab === "campaigns" ? "Campaigns" : tab === "add-contact" ? "Add Contact" : "Unsubscribes"}
            </button>
          ))}
        </div>

        {/* ── CAMPAIGNS TAB ────────────────────────────────────────────────── */}
        {activeTab === "campaigns" && (
          <div className="space-y-4">
            {campaigns.length === 0 && (
              <Card className="border-0 shadow-sm">
                <CardContent className="py-16 text-center text-slate-400 text-sm">
                  No campaigns yet. Run the seed script first:<br />
                  <code className="bg-slate-100 px-2 py-1 rounded text-xs mt-2 inline-block">
                    npx tsx scripts/seed-outreach.ts
                  </code>
                </CardContent>
              </Card>
            )}

            {campaigns.map((c) => {
              const stat = campStats.find((s) => s.id === c.id);
              const or = stat && stat.totalSent > 0 ? Math.round((stat.opened / stat.totalSent) * 100) : 0;

              return (
                <Card key={c.id} className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="space-y-0.5">
                        <CardTitle className="text-base font-semibold text-slate-900">{c.name}</CardTitle>
                        <p className="text-xs text-slate-400">
                          {c.campaign_type === "warm" ? "Warm" : "Cold"} ·
                          {c.contact_type === "past_customer" ? " Past customers" : c.contact_type === "realtor" ? ` Realtors${c.daily_limit ? ` · Tier ${["","1","2","3"][[...campaigns].indexOf(c) % 3]}` : ""}` : ` ${c.contact_type}`} ·
                          Max {c.daily_limit}/day ·
                          From: {c.from_email}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[c.status] ?? "bg-gray-100"}`}>
                        {c.status}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-3">
                    {/* Per-campaign stats */}
                    {stat && (
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                        <StatPill label="Sent"      value={stat.totalSent} />
                        <StatPill label="Today"     value={stat.sentToday} accent />
                        <StatPill label="Open Rate" value={`${or}%`} accent />
                        <StatPill label="Pipeline"  value={stat.pending} />
                        <StatPill label="Done"      value={stat.completed} />
                        <StatPill label="Replied"   value={stat.replied} />
                      </div>
                    )}

                    {/* Warming bar */}
                    {c.warmup_start && <WarmingBar startDate={c.warmup_start} />}

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {c.status === "draft" && (
                        <>
                          <Button size="sm" variant="outline"
                            disabled={!!busy}
                            onClick={() => enrollAll(c.id, c.name)}
                          >
                            {busy === `enroll-${c.id}` ? "Enrolling…" : "Enroll Contacts"}
                          </Button>
                          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white"
                            disabled={!!busy}
                            onClick={() => updateCampaignStatus(c.id, "warming")}
                          >
                            {busy === c.id ? "…" : "Start Warming"}
                          </Button>
                        </>
                      )}

                      {c.status === "warming" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={!!busy}
                            onClick={() => updateCampaignStatus(c.id, "active")}
                          >
                            Force Active (skip warmup)
                          </Button>
                          <Button size="sm" variant="destructive"
                            disabled={!!busy}
                            onClick={() => updateCampaignStatus(c.id, "paused")}
                          >
                            ⏸ Pause
                          </Button>
                        </>
                      )}

                      {c.status === "active" && (
                        <Button size="sm" variant="destructive"
                          disabled={!!busy}
                          onClick={() => updateCampaignStatus(c.id, "paused")}
                        >
                          ⏸ Pause Campaign
                        </Button>
                      )}

                      {c.status === "paused" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={!!busy}
                          onClick={() => updateCampaignStatus(c.id, "active")}
                        >
                          ▶ Resume Campaign
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* ── ADD CONTACT TAB ──────────────────────────────────────────────── */}
        {activeTab === "add-contact" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Add a Contact</CardTitle>
              <p className="text-sm text-slate-500">
                Use this to add Women's Council members, new leads, or anyone you want to add manually.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={addContact} className="space-y-4 max-w-lg">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="fn">First Name</Label>
                    <Input id="fn" value={newContact.first_name}
                      onChange={(e) => setNewContact((p) => ({ ...p, first_name: e.target.value }))}
                      placeholder="Janet" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ln">Last Name</Label>
                    <Input id="ln" value={newContact.last_name}
                      onChange={(e) => setNewContact((p) => ({ ...p, last_name: e.target.value }))}
                      placeholder="Smith" />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input id="email" type="email" required value={newContact.email}
                    onChange={(e) => setNewContact((p) => ({ ...p, email: e.target.value }))}
                    placeholder="janet@example.com" />
                </div>

                <div className="space-y-1">
                  <Label>Contact Type</Label>
                  <Select value={newContact.contact_type}
                    onValueChange={(v) => setNewContact((p) => ({ ...p, contact_type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="past_customer">Past Customer</SelectItem>
                      <SelectItem value="realtor">Realtor</SelectItem>
                      <SelectItem value="wcr_member">Women's Council Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label>Enroll in Campaign (optional)</Label>
                  <Select value={newContact.campaign_id}
                    onValueChange={(v) => setNewContact((p) => ({ ...p, campaign_id: v }))}>
                    <SelectTrigger><SelectValue placeholder="Don't enroll yet" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Don't enroll yet</SelectItem>
                      {campaigns.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-700 w-full" disabled={!!busy}>
                  {busy === "add-contact" ? "Adding…" : "Add Contact"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* ── UNSUBSCRIBE TAB ──────────────────────────────────────────────── */}
        {activeTab === "unsubscribe" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Manual Unsubscribe</CardTitle>
              <p className="text-sm text-slate-500">
                Add someone to the permanent block list. They'll never receive another email
                and any active sequences will stop immediately.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={addUnsubscribe} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <Label htmlFor="unsub-email">Email to block</Label>
                  <Input id="unsub-email" type="email" required value={unsubEmail}
                    onChange={(e) => setUnsubEmail(e.target.value)}
                    placeholder="someone@gmail.com" />
                </div>
                <Button type="submit" variant="destructive" className="w-full" disabled={!!busy}>
                  {busy === "unsub" ? "Blocking…" : "Block & Unsubscribe"}
                </Button>
              </form>

              <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">How to handle unsubscribe requests</p>
                <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                  <li>Someone emails / texts / DMs asking to be removed</li>
                  <li>Copy their email address</li>
                  <li>Paste it above and click Block & Unsubscribe</li>
                  <li>Done — they're off every campaign permanently</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
