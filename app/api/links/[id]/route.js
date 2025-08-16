import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req, { params }){
  const id = params.id;
  const { data, error } = await supabaseAdmin.from('links').select('*').eq('id', id).single();
  if(error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ link: data });
}

export async function PATCH(req, { params }){
  const session = await getServerSession(authOptions);
  if(!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = params.id;
  const body = await req.json();
  const updates = {};
  if(body.url) updates.original_url = body.url;
  if(body.status) updates.status = body.status;
  if(body.logoUrl) updates.logo_url = body.logoUrl;
  if(body.color) updates.color_theme = body.color;
  const { data, error } = await supabaseAdmin.from('links').update(updates).eq('id', id).eq('user_id', session.user.id).select().single();
  if(error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ link: data });
}
