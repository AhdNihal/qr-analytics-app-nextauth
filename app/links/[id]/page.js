'use client';
import { useEffect, useState } from 'react';

export default function LinkEditor({ params }){
  const { id } = params;
  const [link, setLink] = useState(null);
  const [url, setUrl] = useState('');
  const [logo, setLogo] = useState('');
  const [color, setColor] = useState('#00b37a');
  useEffect(()=>{ async function load(){ const res = await fetch('/api/links/'+id); const data = await res.json(); if(res.ok){ setLink(data.link); setUrl(data.link.original_url); setLogo(data.link.logo_url || ''); } } load(); },[id]);

  async function save(){
    const res = await fetch('/api/links/'+id, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ url, logoUrl: logo, color }) });
    const data = await res.json();
    if(res.ok) alert('Saved'); else alert(data.error || 'Fail');
  }

  if(!link) return <div className="small-muted">Loading…</div>;
  return (
    <div className="card">
      <h2 className="text-xl font-semibold">Edit Link</h2>
      <div className="mt-3">
        <label className="small-muted">Destination URL</label>
        <input className="input mt-1" value={url} onChange={e=>setUrl(e.target.value)} />
        <label className="small-muted mt-2">Logo URL (optional)</label>
        <input className="input mt-1" value={logo} onChange={e=>setLogo(e.target.value)} />
        <label className="small-muted mt-2">Color</label>
        <input type="color" className="input mt-1" value={color} onChange={e=>setColor(e.target.value)} />
        <div style={{marginTop:12}}><button className="btn" onClick={save}>Save</button></div>
      </div>
    </div>
  );
}
