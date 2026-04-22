"use client";

import { useEffect, useState } from "react";

export default function OutreachAdmin() {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/outreach/admin?section=stats")
      .then(async (res) => {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          setData(json);
          setStatus(res.ok ? "ok" : `error-${res.status}`);
        } catch {
          setStatus("json-parse-error");
          setError(text.slice(0, 500));
        }
      })
      .catch((err: unknown) => {
        setStatus("fetch-error");
        setError(err instanceof Error ? err.message : String(err));
      });
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "monospace" }}>
      <h1 style={{ marginBottom: 20 }}>Outreach Admin — Debug</h1>
      <p><strong>Status:</strong> {status}</p>
      {error && <pre style={{ color: "red", background: "#fee", padding: 12, borderRadius: 6 }}>{error}</pre>}
      {data && <pre style={{ background: "#f5f5f5", padding: 12, borderRadius: 6 }}>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
