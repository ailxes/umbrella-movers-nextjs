"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
interface Step {
  id: string; step_number: number; delay_days: number;
  subject: string; body_html: string; body_text: string;
}

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

function parseCSVText(text: string): Record<string, string>[] {
  const lines = text.split("\n").filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""));
  return lines.slice(1).map(line => {
    const vals = line.split(",").map(v => v.trim().replace(/"/g, ""));
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? ""]));
  });
}

export default function AdminClient() {
  const [campaigns, setCampaigns]       = useState<Campaign[]>([]);
  const [globalStats, setGlobalStats]   = useState<GlobalStats | null>(null);
  const [enrollments, setEnrollments]   = useState<Enrollment[]>([]);
  const [blockList, setBlockList]       = useState<BlockedEmail[]>([]);
  const [loading, setLoading]           = useState(true);
  const [loadError, setLoadError]       = useState<string | null>(null);
  const [busy, setBusy]                 = useState<string | null>(null);
  const [toast, setToast]               = useState<{ msg: string; ok: boolean } | null>(null);
  const [activeTab, setActiveTab]       = useState<"campaigns"|"contacts"|"add"|"unsubscribe"|"upload">("campaigns");

  const [contactSearch, setContactSearch] = useState("");
  const [contactType, setContactType]     = useState("all");
  const [contactCampaign, setContactCampaign] = useState("all");
  const [contactPage, setContactPage]     = useState(0);

  const [newContact, setNewContact] = useState({ first_name: "", last_name: "", email: "", contact_type: "past_customer", campaign_id: "" });
  const [unsubEmail, setUnsubEmail] = useState("");

  // Email steps / preview / edit
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);
  const [stepsCache, setStepsCache]             = useState<Record<string, Step[]>>({});
  const [previewStep, setPreviewStep]           = useState<Step | null>(null);
  const [editingStep, setEditingStep]           = useState<Step | null>(null);
  const [editSubject, setEditSubject]           = useState("");
  const [editBody, setEditBody]                 = useState("");

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
    setLoadError(null);
    try {
      const [campsRes, statsRes] = await Promise.all([
        fetch("/api/outreach/admin?section=campaigns"),
        fetch("/api/outreach/admin?section=stats"),
      ]);
      const [campsData, statsData] = await Promise.all([campsRes.json(), statsRes.json()]);
      if (!campsRes.ok) throw new Error(`Campaigns API ${campsRes.status}: ${JSON.stringify(campsData)}`);
      if (!statsRes.ok) throw new Error(`Stats API ${statsRes.status}: ${JSON.stringify(statsData)}`);
      setCampaigns(Array.isArray(campsData) ? campsData : []);
      setGlobalStats(statsData?.totalContacts !== undefined ? statsData : null);
    } catch (err: unknown) {
      setLoadError(err instanceof Error ? err.message : String(err));
    }
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

  async function loadSteps(campaign_id: string) {
    if (stepsCache[campaign_id]) return;
    const res = await fetch(`/api/outreach/admin?section=steps&campaign_id=${campaign_id}`);
    const data = await res.json();
    setStepsCache(prev => ({ ...prev, [campaign_id]: data }));
  }

  function openExpanded(campaign_id: string) {
    if (expandedCampaign === campaign_id) { setExpandedCampaign(null); return; }
    setExpandedCampaign(campaign_id);
    loadSteps(campaign_id);
  }

  function openEdit(step: Step) {
    setEditingStep(step);
    setEditSubject(step.subject);
    setEditBody(step.body_text);
  }

  async function saveStep() {
    if (!editingStep) return;
    setBusy("save-step");
    const res = await fetch("/api/outreach/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update_step", step_id: editingStep.id, subject: editSubject, body_text: editBody }),
    });
    const data = await res.json();
    if (res.ok) {
      // Update cache with new HTML
      setStepsCache(prev => {
        const updated = Object.fromEntries(
          Object.entries(prev).map(([cid, steps]) => [
            cid,
            steps.map(s => s.id === editingStep.id ? { ...s, subject: editSubject, body_text: editBody, body_html: data.body_html } : s)
          ])
        );
        return updated;
      });
      setEditingStep(null);
      notify("Email saved ✓");
    } else {
      notify("Save failed", false);
    }
    setBusy(null);
  }

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
    const res = await fetch("/api/outreach/cron", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET ?? ""}` },
    });
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
      setCsvRows(parseCSVText(text));
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
      body: JSON.stringify({ action: "import_csv", rows: csvRows, contact_type: csvContactType, campaign_id: csvCampaignId || undefined }),
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
      <div className="text-slate-400 text-sm">Loading…</div>
    </div>
  );

  if (loadError) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="max-w-lg w-full bg-white border border-red-200 rounded-xl p-6 space-y-3">
        <h2 className="text-red-700 font-semibold">Failed to load admin dashboard</h2>
        <pre className="text-xs text-red-600 bg-red-50 rounded p-3 overflow-auto whitespace-pre-wrap">{loadError}</pre>
        <button onClick={load} className="text-sm text-slate-600 underline">Try again</button>
      </div>
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

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <Pill label="Total Contacts"  value={(globalStats?.totalContacts ?? 0).toLocaleString()} />
          <Pill label="Total Sent"      value={(globalStats?.totalSent ?? 0).toLocaleString()} />
          <Pill label="Open Rate"       value={`${openRate}%`} accent />
          <Pill label="Sent Today"      value={globalStats?.sentToday ?? 0} accent />
          <Pill label="Unsubscribed"    value={globalStats?.totalUnsubscribed ?? 0} />
        </div>

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

        {/* ── CAMPAIGNS ── */}
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
                      <Button size="sm" variant="outline" onClick={() => openExpanded(c.id)}>
                        {expandedCampaign === c.id ? "Hide Emails ▲" : "✉ View / Edit Emails ▼"}
                      </Button>
                    </div>

                    {/* ── Email steps panel ── */}
                    {expandedCampaign === c.id && (
                      <div className="border-t border-slate-100 pt-4 space-y-3">
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Email Sequence</p>
                        {(stepsCache[c.id] ?? []).length === 0 && (
                          <p className="text-slate-400 text-sm">Loading…</p>
                        )}
                        {(stepsCache[c.id] ?? []).map(step => (
                          <div key={step.id} className="bg-slate-50 rounded-lg p-4 space-y-2">
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <div>
                                <span className="text-xs font-semibold text-slate-400 uppercase">Email {step.step_number} · Day {step.delay_days}</span>
                                <p className="text-sm font-medium text-slate-800 mt-0.5">{step.subject}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => setPreviewStep(step)}>Preview</Button>
                                <Button size="sm" variant="outline" onClick={() => openEdit(step)}>Edit</Button>
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-2">{step.body_text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* ── CONTACT LIST ── */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Input placeholder="Search name or email…" className="max-w-xs"
                value={contactSearch} onChange={e => { setContactSearch(e.target.value); setContactPage(0); }} />
              <select value={contactType} onChange={e => { setContactType(e.target.value); setContactPage(0); }}
                className="border border-slate-200 rounded-md px-3 py-1.5 text-sm bg-white">
                <option value="all">All types</option>
                <option value="past_customer">Past customers</option>
                <option value="realtor">Realtors</option>
                <option value="wcr_member">WCR members</option>
              </select>
              <select value={contactCampaign} onChange={e => { setContactCampaign(e.target.value); setContactPage(0); }}
                className="border border-slate-200 rounded-md px-3 py-1.5 text-sm bg-white">
                <option value="all">All campaigns</option>
                {campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <Button variant="outline" size="sm" onClick={loadContacts} disabled={!!busy}>Search</Button>
            </div>

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

            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" disabled={contactPage === 0}
                onClick={() => setContactPage(p => p - 1)}>← Prev</Button>
              <Button variant="outline" size="sm"
                onClick={() => { setContactPage(p => p + 1); loadContacts(); }}>Next →</Button>
            </div>
          </div>
        )}

        {/* ── ADD CONTACT ── */}
        {activeTab === "add" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Add a Single Contact</CardTitle>
              <p className="text-sm text-slate-500">Use for Women&apos;s Council members or individual leads.</p>
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
                  <select value={newContact.contact_type}
                    onChange={e => setNewContact(p => ({ ...p, contact_type: e.target.value }))}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white">
                    <option value="past_customer">Past Customer</option>
                    <option value="realtor">Realtor</option>
                    <option value="wcr_member">Women&apos;s Council Member</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>Enroll in Campaign (optional)</Label>
                  <select value={newContact.campaign_id}
                    onChange={e => setNewContact(p => ({ ...p, campaign_id: e.target.value }))}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white">
                    <option value="">Don&apos;t enroll yet</option>
                    {campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-700 w-full" disabled={!!busy}>
                  {busy === "add-contact" ? "Adding…" : "Add Contact"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* ── UPLOAD CSV ── */}
        {activeTab === "upload" && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Upload a CSV List</CardTitle>
              <p className="text-sm text-slate-500">
                CSV must have columns: <code className="bg-slate-100 px-1 rounded">First Name</code>, <code className="bg-slate-100 px-1 rounded">Last Name</code>, <code className="bg-slate-100 px-1 rounded">Email</code>.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={uploadCSV} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <Label>CSV File</Label>
                  <input ref={fileRef} type="file" accept=".csv" onChange={handleFileChange}
                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-900 file:text-white hover:file:bg-slate-700 cursor-pointer" />
                  {csvFileName && (
                    <p className="text-xs text-slate-500 mt-1">{csvFileName} · {csvRows.length} rows detected</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>Contact Type</Label>
                  <select value={csvContactType} onChange={e => setCsvContactType(e.target.value)}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white">
                    <option value="past_customer">Past Customer</option>
                    <option value="realtor">Realtor</option>
                    <option value="wcr_member">Women&apos;s Council Member</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>Enroll in Campaign (optional)</Label>
                  <select value={csvCampaignId} onChange={e => setCsvCampaignId(e.target.value)}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm bg-white">
                    <option value="">Import only, don&apos;t enroll</option>
                    {campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
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

        {/* ── BLOCK LIST ── */}
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

      {/* ── Preview modal ── */}
      {previewStep && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setPreviewStep(null)}>
          <div className="bg-white rounded-xl w-full max-w-2xl flex flex-col shadow-2xl"
            style={{ maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 shrink-0">
              <div>
                <p className="text-xs text-slate-400 font-medium">Email {previewStep.step_number} · Day {previewStep.delay_days}</p>
                <p className="text-sm font-semibold text-slate-800">{previewStep.subject}</p>
              </div>
              <button onClick={() => setPreviewStep(null)}
                className="text-slate-400 hover:text-slate-700 text-xl leading-none px-2">✕</button>
            </div>
            <iframe srcDoc={previewStep.body_html} className="flex-1 w-full rounded-b-xl"
              style={{ minHeight: 500 }} title="Email preview" sandbox="allow-same-origin" />
          </div>
        </div>
      )}

      {/* ── Edit modal ── */}
      {editingStep && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setEditingStep(null)}>
          <div className="bg-white rounded-xl w-full max-w-xl shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
              <p className="font-semibold text-slate-800">Edit Email {editingStep.step_number}</p>
              <button onClick={() => setEditingStep(null)}
                className="text-slate-400 hover:text-slate-700 text-xl leading-none px-2">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <Label>Subject Line</Label>
                <Input value={editSubject} onChange={e => setEditSubject(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Email Body</Label>
                <p className="text-xs text-slate-400">Paste your email text here. Separate paragraphs with a blank line. The Umbrella Movers header and footer are added automatically.</p>
                <textarea
                  value={editBody}
                  onChange={e => setEditBody(e.target.value)}
                  rows={12}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm font-mono resize-y"
                  placeholder={"Hi {{first_name}},\n\nParagraph one here...\n\nParagraph two here..."}
                />
                <p className="text-xs text-slate-400">Tip: use <code className="bg-slate-100 px-1 rounded">{"{{first_name}}"}</code> to personalize with the recipient&apos;s first name.</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditingStep(null)}>Cancel</Button>
                <Button className="bg-slate-900 text-white hover:bg-slate-700"
                  disabled={busy === "save-step"} onClick={saveStep}>
                  {busy === "save-step" ? "Saving…" : "Save & Preview"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
