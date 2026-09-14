-- RedJob page visit analytics for the admin dashboard.
-- Run this once in the Supabase SQL editor for the production project.

create table if not exists public.page_visits (
  id bigint generated always as identity primary key,
  path text not null default '/',
  visited_at timestamptz not null default now()
);

create index if not exists page_visits_visited_at_idx
on public.page_visits (visited_at desc);

create index if not exists page_visits_path_visited_at_idx
on public.page_visits (path, visited_at desc);

alter table public.page_visits enable row level security;

revoke all on table public.page_visits from anon, authenticated;

create or replace function public.normalize_page_visit_path(visit_path text)
returns text
language sql
immutable
set search_path = public
as $$
  select case
    when coalesce(trim(visit_path), '') like '/vacantes/%'
      then left(coalesce(trim(visit_path), '/'), 240)
    when coalesce(trim(visit_path), '') like '/blog%'
      then '/blog/'
    when coalesce(trim(visit_path), '') in ('/privacidad', '/privacidad/')
      then '/privacidad'
    when coalesce(trim(visit_path), '') in ('/terminos', '/terminos/')
      then '/terminos'
    else '/'
  end;
$$;

create or replace function public.record_page_visit(visit_path text default '/')
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.page_visits (path)
  values (public.normalize_page_visit_path(visit_path));
end;
$$;

create or replace function public.admin_page_visit_stats()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select case
    when not public.is_admin() then
      jsonb_build_object('error', 'Acceso no autorizado')
    else
      jsonb_build_object(
        'weekly_page_visits',
          (select count(*) from public.page_visits where visited_at >= now() - interval '7 days'),
        'total_page_visits',
          (select count(*) from public.page_visits),
        'period_start',
          to_char(now() - interval '7 days', 'YYYY-MM-DD"T"HH24:MI:SSOF')
      )
  end;
$$;

revoke all on function public.normalize_page_visit_path(text) from public;
revoke all on function public.record_page_visit(text) from public;
revoke all on function public.admin_page_visit_stats() from public;

grant execute on function public.record_page_visit(text) to anon, authenticated;
grant execute on function public.admin_page_visit_stats() to authenticated;
