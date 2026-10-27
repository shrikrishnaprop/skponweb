-- Run this in Supabase: SQL Editor → New query → Run
-- Then add SUPABASE_SERVICE_ROLE_KEY in .env.local and Vercel.

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  listing_type text not null check (listing_type in ('sale', 'rent')),
  category text not null default 'residential' check (category in ('residential', 'commercial')),
  location text not null,
  city text not null default 'Faridabad',
  price text not null,
  bedrooms int,
  area text,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  interest text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.properties enable row level security;
alter table public.leads enable row level security;

drop policy if exists "public can read properties" on public.properties;
create policy "public can read properties"
  on public.properties
  for select
  to anon, authenticated
  using (true);

-- Writes go through Next.js API routes using the service role key (bypasses RLS).
