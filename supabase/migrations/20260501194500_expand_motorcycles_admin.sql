create extension if not exists pgcrypto;

alter table public.motorcycles
  add column if not exists mileage integer,
  add column if not exists motorcycle_type text,
  add column if not exists condition text,
  add column if not exists import_details text,
  add column if not exists location text,
  add column if not exists image_paths text[] not null default '{}',
  add column if not exists published_at timestamptz;

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

alter table public.motorcycles
  drop constraint if exists motorcycles_status_check;

alter table public.motorcycles
  add constraint motorcycles_status_check
  check (status in ('draft', 'available', 'reserved', 'sold'));

update public.motorcycles
set status = 'available',
    published_at = coalesce(published_at, created_at, updated_at, now())
where status = 'published';

update public.motorcycles
set published_at = coalesce(published_at, created_at, updated_at, now())
where status in ('available', 'reserved', 'sold');

drop trigger if exists set_motorcycles_updated_at on public.motorcycles;
create trigger set_motorcycles_updated_at
before insert or update on public.motorcycles
for each row
execute function public.set_current_timestamp_updated_at();

drop policy if exists "Public can read published motorcycles" on public.motorcycles;
drop policy if exists "Public can read public motorcycles" on public.motorcycles;
create policy "Public can read public motorcycles"
on public.motorcycles
for select
using (status in ('available', 'reserved', 'sold'));

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
