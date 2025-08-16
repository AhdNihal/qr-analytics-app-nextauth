import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request, { params }){
  const code = params.code;
  const { data, error } = await supabaseAdmin.from('links').select('*').eq('short_code', code).limit(1);
  const link = data && data[0];
  if(!link) return new NextResponse('Not found', { status: 404 });
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const ua = request.headers.get('user-agent') || 'unknown';
  await supabaseAdmin.from('scans').insert([{ link_id: link.id, user_agent: ua, ip_address: ip }]);
  return NextResponse.redirect(link.original_url, { status: 302 });
}
