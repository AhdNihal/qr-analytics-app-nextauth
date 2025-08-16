import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req) {
  const { data, error } = await supabaseAdmin
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ campaigns: data });
}

export async function POST(req) {
  const body = await req.json();
  const { title, description } = body;
  if (!title)
    return NextResponse.json({ error: "Missing title" }, { status: 400 });
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const { data, error } = await supabaseAdmin
    .from("campaigns")
    .insert([{ title, description, slug }])
    .select()
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ campaign: data });
}
