import { NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid';
import QRCode from 'qrcode';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
const nanoid = customAlphabet('0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', 7);

export async function POST(req){
  try{
    const body = await req.json();
    let { url, campaignId, color, logoUrl, svg } = body || {};
    if(!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    try{ url = new URL(url).toString(); } catch{ return NextResponse.json({ error: 'Invalid URL' }, { status: 400 }); }
    const shortCode = nanoid();
    const insert = { original_url: url, short_code: shortCode, campaign_id: campaignId || null };
    const { data, error } = await supabaseAdmin.from('links').insert([insert]).select().single();
    if(error) return NextResponse.json({ error: error.message }, { status: 500 });
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const shortUrl = `${appUrl}/r/${shortCode}`;
    const qrPng = await QRCode.toDataURL(shortUrl, { width: 512, margin: 1 });
    const qrSvg = svg ? await QRCode.toString(shortUrl, { type: 'svg' }) : null;
    return NextResponse.json({ shortCode, shortUrl, qrImage: qrPng, qrSvg, link: data });
  }catch(e){ console.error(e); return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
