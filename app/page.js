"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (res.ok) setResult(data);
    else alert(data.error || "Error");
    setLoading(false);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      <div className="card">
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Create QR Code</h2>
        <p className="small-muted">
          Paste a link and generate a short URL + QR.
        </p>
        <div style={{ marginTop: 12 }}>
          <input
            className="input"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div style={{ marginTop: 12 }}>
            <button
              className="btn"
              onClick={generate}
              disabled={!url || loading}
            >
              {loading ? "Generating…" : "Generate"}
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <h3 style={{ fontWeight: 600 }}>Latest</h3>
        {result ? (
          <div>
            <img src={result.qrImage} alt="QR" style={{ width: "100%" }} />
            <a
              className="btn"
              href={result.shortUrl}
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-block", marginTop: 8 }}
            >
              {result.shortUrl}
            </a>
          </div>
        ) : (
          <div className="small-muted">No QR yet</div>
        )}
      </div>
    </div>
  );
}
