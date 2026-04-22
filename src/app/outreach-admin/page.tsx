"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CampaignStats {
  totalSent: number; sentToday: number; opened: number;
  pending: number; completed: number; replied: number; unsubscribed: number;
}
interface Campaign {
  id: string; name: string; status: string; campaign_type: string;
  contact_type: string; from_email: string; daily_limit: number;
  warmup_start: string | null; warmed_at: string | null; stats: CampaignStats;
}
interface Enrollment {
  id: string; status: string; current_step: number;
  next_send_at: string | null; enrolled_at: string;
  outreach_contacts: {
    id: string; first_name: string; last_name: string;
    email: string; contact_type: string; tier: number | null;
    office_name: string | null; unsubscribed: boolean;
  } | null;
}
interface GlobalStats {
  totalContacts: number; totalSent: number; totalOpened: number;
  totalUnsubscribed: number; sentToday: number;
}
interface BlockedEmail { email: string; reason: string; unsubscribed_at: string; }

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600", warming: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700", paused: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};
const ENROLLMENT_COLORS: Record<string, string> = {
  pending: "bg-slate-100 text-slate-600", active: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700", replied: "bg-purple-100 text-purple-700",
  unsubscribed: "bg-red-100 text-red-700", bounced: "bg-orange-100 text-orange-700",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function WarmingBar({ startDate }: { startDate: string }) {
  const day = Math.floor((Date.now() - new Date(startDate).getTime()) / 86_400_000) + 1;
  const pct = Math.min((day / 22) * 100, 100);
  const warmed = day >= 22;
  const limit = day < 4 ? 20 : day < 8 ? 40 : day < 15 ? 75 : day < 22 ? 150 : 250;
  return (
    <div className="mt-3 space-y-1">
      <div className="flex justify-between text-xs text-slate-500">
        <span>Warming — Day {day}/22 · {limit}/day</span>
        <span className={warmed ? "text-green-600 font-medium" : ""}>{warmed ? "✓ Fully warmed" : `${Math.round(pct)}%`}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${warmed ? "bg-green-500" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Pill({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`rounded-lg px-3 py-2 text-center ${accent ? "bg-blue-50" : "bg-slate-50"}`}>
      <div className={`text-lg font-bold ${accent ? "text-blue-700" : "text-slate-800"}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-0.5">{label}</div>
    </div>
  );
}

// Parse CSV text into array of objects
function parseCSVText(text: string): Record<string, string>[] {
  const lines = text.split("\n").filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""));
  return lines.slice(1).map(line => {
    const vals = line.split(",").map(v => v.trim().replace(/"/g, ""));
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? ""]));
  });
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function OutreachAdmin() {
  const [campaigns, setCampaigns]       = useState<Campaign[]>([]);
  const [globalStats, setGlobalStats]   = useState<GlobalStats | null>(null);
  const [enrollments, setEnrollments]   = useState<Enrollment[]>([]);
  const [blockList, setBlockList]       = useState<BlockedEmail[]>([]);
  const [loading, setLoading]           = useState(true);
  const [busy, setBusy]                 = useState<string | null>(null);
  const [toast, setToast]               = useState<{ msg: string; ok: boolean } | null>(null);
  const [activeTab, setActiveTab]       = useState<"campaigns"|"contacts"|"add"|"unsubscribe"|"upload">("campaigns");

  // Contacts filters
  const [contactSearch, setContactSearch] = useState("");
  const [contactType, setContactType]     = useState("all");
  const [contactCampaign, setContactCampaign] = useState("all");
  const [contactPage, setContactPage]     = useState(0);

  // Add contact form
  const [newContact, setNewContact] = useState({ first_name: "", last_name: "", email: "", contact_type: "past_customer", campaign_id: "" });

  // Unsubscribe form
  const [unsubEmail, setUnsubEmail] = useState("");

  // CSV upload
  const fileRef = useRef<HTMLInputElement>(null);
  const [csvRows, setCsvRows]             = useState<Record<string, string>[]>([]);
  const [csvFileName, setCsvFileName]     = useState("");
  const [csvContactType, setCsvContactType] = useState("past_customer");
  const [csvCampaignId, setCsvCampaignId]   = useState("");
  const [csvResult, setCsvResult]           = useState<{ imported: number; skipped: number; enrolled: number } | null>(null);

  const notify = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const [campsRes, statsRes] = await Promise.all([
      fetch("/api/outreach/admin?section=campaigns"),
      fetch("/api/outreach/admin?section=stats"),
    ]);
    const [campsData, statsData] = await Promise.all([campsRes.json(), statsRes.json()]);
    setCampaigns(Array.isArray(campsData) ? campsData : []);
    setGlobalStats(statsData?.totalContacts !== undefined ? statsData : null);
    setLoading(false);
  }, []);

  const loadContacts = useCallback(async () => {
    const params = new URLSearchParams({ section: "contacts", page: String(contactPage) });
    if (contactSearch) params.set("search", contactSearch);
    if (contactType !== "all") params.set("type", contactType);
    if (contactCampaign !== "all") params.set("campaign_id", contactCampaign);
    const res = await fetch(`/api/outreach/admin?${params}`);
    const data = await res.json();
    setEnrollments(data.enrollments ?? []);
  }, [contactSearch, contactType, contactCampaign, contactPage]);

  const loadBlockList = useCallback(async () => {
    const res = await fetch("/api/outreach/admin?section=blocklist");
    setBlockList(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (activeTab === "contacts") loadContacts(); }, [activeTab, loadContacts]);
  useEffect(() => { if (activeTab === "unsubscribe") loadBlockList(); }, [activeTab, loadBlockList]);

  async function campaignAction(campaign_id: string, action: string, extra?: Record<string, unknown>) {
    setBusy(campaign_id + action);
    await fetch("/api/outreach/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, campaign_id, ...extra }),
    });
    await load();
    setBusy(null);
    notify(action === "enroll_all" ? "Contacts enrolled ✓" : "Campaign updated ✓");
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
      notify(data.error ?? "Failed", false);
    }
  }

  async function addUnsubscribe(e: React.FormEvent) {
    e.preventDefault();
    setBusy("unsub");
    const res = await fetch("/api/outreach/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: unsubEmail }),
    });
    setBusy(null);
    if (res.ok) {
      notify(`${unsubEmail} blocked ✓`);
      setUnsubEmail("");
      await loadBlockList();
      await load();
    } else {
      notify("Failed", false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFileName(file.name);
    setCsvResult(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const rows = parseCSVText(text);
      setCsvRows(rows);
    };
    reader.readAsText(file);
  }

  async function uploadCSV(e: React.FormEvent) {
    e.preventDefault();
    if (!csvRows.length) return;
    setBusy("csv");
    const res = await fetch("/api/outreach/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "import_csv",
        rows: csvRows,
        contact_type: csvContactType,
        campaign_id: csvCampaignId || undefined,
      }),
    });
    const data = await res.json();
    setBusy(null);
    if (res.ok) {
      setCsvResult(data);
      setCsvRows([]);
      setCsvFileName("");
      if (fileRef.current) fileRef.current.value = "";
      await load();
    } else {
      notify("Upload failed", false);
    }
  }

  const openRate = globalStats && globalStats.totalSent > 0
    ? Math.round((globalStats.totalOpened / globalStats.totalSent) * 100) : 0;

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-slate-400 text-sm">Loading...</div>
    </div>
  );

  const TABS = [
    { id: "campaigns",   label: "Campaigns" },
    { id: "contacts",    label: "Contact List" },
    { id: "add",         label: "Add Contact" },
    { id: "upload",      label: "Upload CSV" },
    { id: "unsubscribe", label: "Block List" },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${toast.ok ? "bg-green-600" : "bg-red-600"}`}>
          {toast.msg}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">☂️ Email Platform</h1>
            <p className="text-slate-500 text-sm mt-0.5">umbrella-movers.com · Umbrella Movers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={!!busy}>Refresh</Button>
            <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-700" onClick={runDailySend} disabled={!!busy}>
              {busy === "cron" ? "Sending…" : "▶ Run Today's Send"}
            </Button>
          </div>
        </div>

        {/* Global stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <Pill label="Total Contacts"  value={globalStats?.totalContacts.toLocaleString() ?? 0} />
          <Pill label="Total Sent"      value={globalStats?.totalSent.toLocaleString() ?? 0} />
          <Pill label="Open Rate"       value={`${openRate}%`} accent />
          <Pill label="Sent Today"      value={globalStats?.sentToday ?? 0} accent />
          <Pill label="Unsubscribed"    value={globalStats?.totalUnsubscribed ?? 0} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === t.id ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── CAMPAIGNS ─────────────────────────────────────────────────────── */}
        {activeTab === "campaigns" && (
          <div className="space-y-4">
            {campaigns.length === 0 && (
              <Card className="border-0 shadow-sm">
                <CardContent className="py-16 text-center text-slate-400 text-sm">No campaigns yet.</CardContent>
              </Card>
            )}
            {campaigns.map(c => {
              const s = c.stats;
              const or = s.totalSent > 0 ? Math.round((s.opened / s.totalSent) * 100) : 0;
              return (
                <Card key={c.id} className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <CardTitle className="text-base font-semibold text-slate-900">{c.name}</CardTitle>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {c.campaign_type === "warm" ? "Warm" : "Cold"} · Max {c.daily_limit}/day · {c.from_email}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[c.status] ?? "bg-gray-100"}`}>
                        {c.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                      <Pill label="Sent"         value={s.totalSent} />
                      <Pill label="Today"        value={s.sentToday} accent />
                      <Pill label="Open Rate"    value={`${or}%`} accent />
                      <Pill label="In Pipeline"  value={s.pending} />
                      <Pill label="Completed"    value={s.completed} />
                      <Pill label="Replied"      value={s.replied} />
                      <Pill label="Unsubscribed" value={s.unsubscribed} />
                    </div>
                    {c.warmup_start && <WarmingBar startDate={c.warmup_start} />}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {c.status === "draft" && <>
                        <Button size="sm" variant="outline" disabled={!!busy}
                          onClick={() => campaignAction(c.id, "enroll_all")}>
                          {busy === c.id + "enroll_all" ? "Enrolling…" : "Enroll Contacts"}
                        </Button>
                        <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white" disabled={!!busy}
                          onClick={() => campaignAction(c.id, "update_status", { status: "warming" })}>
                          Start Warming
                        </Button>
                      </>}
                      {c.status === "warming" && <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" disabled={!!busy}
                          onClick={() => campaignAction(c.id, "update_status", { status: "active" })}>
                          Force Active
                        </Button>
                        <Button size="sm" variant="destructive" disabled={!!busy}
                          onClick={() => campaignAction(c.id, "update_status", { status: "paused" })}>
                          ⏸ Pause
                        </Button>
                      </>}
                      {c.status === "active" &&
                        <Button size="sm" variant="destructive" disabled={!!busy}
                          onClick={() => campaignAction(c.id, "update_status", { status: "paused" })}>
                          ⏸ Pause Campaign
                        </Button>}
                      {c.status === "paused" &&
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" disabled={!!busy}
                          onClick={() => campaignAction(c.id, "update_status", { status: "active" })}>
                          ▶ Resume Campaign
                        </Button>}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* ── CONTACT LIST ──────────────────────────────────────────────────── */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Input placeholder="Search name or email…" className="max-w-xs"
                value={contactSearch} onChange={e => { setContactSearch(e.target.value); setContactPage(0); }} />
              <Select value={contactType} onValueChange={v => { setContactType(v); setContactPage(0); }}>
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="past_customer">Past customers</SelectItem>
                  <SelectItem value="realtor">Realtors</SelectItem>
                  <SelectItem value="wcr_member">WCR members</SelectItem>
                </SelectContent>
              </Select>
              <Select value={contactCampaign} onValueChange={v => { setContactCampaign(v); setContactPage(0); }}>
                <SelectTrigger className="w-56"><SelectValue placeholder="All campaigns" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All campaigns</SelectItem>
                  {campaigns.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={loadContacts} disabled={!!busy}>Search</Button>
            </div>

            {/* Table */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {["Name", "Email", "Type", "Step", "Status", "Enrolled"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enrollments.length === 0 && (
                      <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">No contacts found</td></tr>
                    )}
                    {enrollments.map(e => {
                      const c = e.outreach_contacts;
                      return (
                        <tr key={e.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-800">
                            {c ? `${c.first_name} ${c.last_name}`.trim() || "—" : "—"}
                          </td>
                          <td className="px-4 py-3 text-slate-600">{c?.email ?? "—"}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">
                              {c?.contact_type?.replace("_", " ") ?? "—"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-500">Step {e.current_step}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${ENROLLMENT_COLORS[e.status] ?? "bg-gray-100"}`}>
                              {e.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-400 text-xs">
                            {new Date(e.enrolled_at).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Pagination */}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" disabled={contactPage === 0}
                onClick={() => setContactPage(p => p - 1)}>← Prev</Button>
              <Button variant="outline" size="sm"
                onClick={() => { setContactPage(p => p + 1); loadContacts(); }}>Next →</Button>
            </div>
          </div>
        )}

        {/* ── ADD CONTACT ───────────────────────────────────────────────────── */}
        {activeTab === "add" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Add a Single Contact</CardTitle>
              <p className="text-sm text-slate-500">Use for Women's Council members or individual leads.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={addContact} className="space-y-4 max-w-lg">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>First Name</Label>
                    <Input value={newContact.first_name} placeholder="Janet"
                      onChange={e => setNewContact(p => ({ ...p, first_name: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label>Last Name</Label>
                    <Input value={newContact.last_name} placeholder="Smith"
                      onChange={e => setNewContact(p => ({ ...p, last_name: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Email <span className="text-red-500">*</span></Label>
                  <Input type="email" required value={newContact.email} placeholder="janet@example.com"
                    onChange={e => setNewContact(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label>Contact Type</Label>
                  <Select value={newContact.contact_type} onValueChange={v => setNewContact(p => ({ ...p, contact_type: v }))}>
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
                  <Select value={newContact.campaign_id} onValueChange={v => setNewContact(p => ({ ...p, campaign_id: v }))}>
                    <SelectTrigger><SelectValue placeholder="Don't enroll yet" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Don't enroll yet</SelectItem>
                      {campaigns.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
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

        {/* ── UPLOAD CSV ────────────────────────────────────────────────────── */}
        {activeTab === "upload" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Upload a CSV List</CardTitle>
              <p className="text-sm text-slate-500">
                CSV must have columns: <code className="bg-slate-100 px-1 rounded">First Name</code>, <code className="bg-slate-100 px-1 rounded">Last Name</code>, <code className="bg-slate-100 px-1 rounded">Email</code>. Any extra columns are ignored.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={uploadCSV} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <Label>CSV File</Label>
                  <input ref={fileRef} type="file" accept=".csv"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-900 file:text-white hover:file:bg-slate-700 cursor-pointer" />
                  {csvFileName && (
                    <p className="text-xs text-slate-500 mt-1">
                      {csvFileName} · {csvRows.length} rows detected
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Contact Type</Label>
                  <Select value={csvContactType} onValueChange={setCsvContactType}>
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
                  <Select value={csvCampaignId} onValueChange={setCsvCampaignId}>
                    <SelectTrigger><SelectValue placeholder="Import only, don't enroll" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Import only, don't enroll</SelectItem>
                      {campaigns.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-700 w-full"
                  disabled={!!busy || csvRows.length === 0}>
                  {busy === "csv" ? "Uploading…" : `Upload ${csvRows.length > 0 ? csvRows.length + " contacts" : ""}`}
                </Button>

                {csvResult && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm space-y-1">
                    <p className="font-semibold text-green-800">Upload complete ✓</p>
                    <p className="text-green-700">Imported: {csvResult.imported}</p>
                    <p className="text-green-700">Enrolled in campaign: {csvResult.enrolled}</p>
                    <p className="text-slate-500">Skipped (blocked/invalid): {csvResult.skipped}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        )}

        {/* ── BLOCK LIST ────────────────────────────────────────────────────── */}
        {activeTab === "unsubscribe" && (
          <div className="space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Block an Email</CardTitle>
                <p className="text-sm text-slate-500">Permanently stops all emails to this address.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={addUnsubscribe} className="flex gap-2 max-w-lg">
                  <Input type="email" required value={unsubEmail} placeholder="someone@gmail.com"
                    onChange={e => setUnsubEmail(e.target.value)} />
                  <Button type="submit" variant="destructive" disabled={!!busy}>
                    {busy === "unsub" ? "Blocking…" : "Block"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Permanent Block List ({blockList.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-slate-100">
                  {blockList.length === 0 && <p className="text-slate-400 text-sm py-4">No blocked emails.</p>}
                  {blockList.map(b => (
                    <div key={b.email} className="py-2.5 flex items-center justify-between">
                      <span className="text-sm text-slate-800 font-medium">{b.email}</span>
                      <span className="text-xs text-slate-400">{new Date(b.unsubscribed_at).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
