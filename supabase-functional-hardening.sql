begin;

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth_key text not null,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists push_subscriptions_user_id_idx
on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;

drop policy if exists "Users manage own push subscriptions" on public.push_subscriptions;

create policy "Users manage own push subscriptions"
on public.push_subscriptions for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

revoke all on table public.push_subscriptions from anon, authenticated;

create or replace function public.is_admin(user_uuid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    join public.profiles on profiles.id = user_roles.user_id
    where user_roles.user_id = user_uuid
      and user_roles.role = 'admin'
      and profiles.suspended_at is null
  );
$$;

create or replace function public.admin_dashboard_stats()
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
        'users', (select count(*) from public.profiles),
        'suspended_users', (select count(*) from public.profiles where suspended_at is not null),
        'companies', (select count(*) from public.company_profiles),
        'verified_companies', (select count(*) from public.company_profiles where is_verified),
        'unverified_companies', (select count(*) from public.company_profiles where coalesce(is_verified, false) = false),
        'jobs', (select count(*) from public.jobs),
        'published_jobs', (select count(*) from public.jobs where status = 'published'),
        'jobs_to_review', (select count(*) from public.jobs where status = 'draft'),
        'new_published_jobs', (
          select count(*) from public.jobs
          where status = 'published'
            and created_at >= now() - interval '7 days'
        ),
        'applications', (select count(*) from public.applications),
        'pending_reports', (select count(*) from public.reports where status in ('pending', 'reviewing'))
      )
  end;
$$;

revoke all on function public.is_admin(uuid) from public;
revoke all on function public.admin_dashboard_stats() from public;
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.admin_dashboard_stats() to authenticated;

revoke select on table public.company_profiles from anon, authenticated;
grant select (
  id,
  user_id,
  company_name,
  industry,
  location,
  website,
  description,
  plan,
  plan_status,
  is_verified,
  logo_path,
  logo_name,
  created_at,
  updated_at
) on table public.company_profiles to anon, authenticated;

commit;
