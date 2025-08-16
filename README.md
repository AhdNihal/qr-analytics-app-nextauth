# QRlytics — NextAuth Migration

This version replaces Supabase client-side auth with NextAuth + Supabase Adapter for server-side sessions.

## Setup
1. npm install
2. cp .env.example .env.local and fill values (Supabase project + NEXTAUTH_SECRET + Google keys if used)
3. Run SQL in Supabase to create tables (use supabase.sql and supabase_rls.sql)
4. npm run dev

## Notes
- NextAuth uses Supabase Adapter and writes users into Supabase; auth tables will be created by the adapter.
- Server-side routes use getServerSession(authOptions) to get the session and user id.
