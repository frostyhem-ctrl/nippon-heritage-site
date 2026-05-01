create extension if not exists pgcrypto;

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();

  if new.status = 'draft' then
    new.published_at = null;
  elsif new.published_at is null then
    new.published_at = coalesce(new.published_at, now());
  end if;

  return new;
end;
$$;

create table if not exists public.motorcycles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  brand text,
  model text,
  year integer,
  mileage integer,
  displacement text,
  engine_type text,
  motorcycle_type text,
  price integer,
  description text,
  condition text,
  origin_country text,
  import_details text,
  location text,
  status text not null default 'draft' check (status in ('draft', 'available', 'reserved', 'sold')),
  slug text not null unique,
  images text[] not null default '{}',
  image_paths text[] not null default '{}',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

drop trigger if exists set_motorcycles_updated_at on public.motorcycles;
create trigger set_motorcycles_updated_at
before insert or update on public.motorcycles
for each row
execute function public.set_current_timestamp_updated_at();

alter table public.motorcycles enable row level security;
alter table public.admin_profiles enable row level security;

drop policy if exists "Public can read public motorcycles" on public.motorcycles;
create policy "Public can read public motorcycles"
on public.motorcycles
for select
using (status in ('available', 'reserved', 'sold'));

drop policy if exists "Admins can manage motorcycles" on public.motorcycles;
create policy "Admins can manage motorcycles"
on public.motorcycles
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
      and admin_profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.admin_profiles
    where admin_profiles.id = auth.uid()
      and admin_profiles.role = 'admin'
  )
);

drop policy if exists "Admins can read own profile" on public.admin_profiles;
create policy "Admins can read own profile"
on public.admin_profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "Admins can update own profile" on public.admin_profiles;
create policy "Admins can update own profile"
on public.admin_profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'motorcycles',
  'motorcycles',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
