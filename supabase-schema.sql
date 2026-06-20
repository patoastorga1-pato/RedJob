-- RedJob MVP database schema for Supabase
-- Run this in the Supabase SQL editor after creating a project.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('candidate', 'company')),
  suspended_at timestamptz,
  suspension_reason text,
  legal_terms_version text,
  legal_privacy_version text,
  legal_accepted_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles
add column if not exists suspended_at timestamptz;

alter table public.profiles
add column if not exists suspension_reason text;

alter table public.profiles
add column if not exists legal_terms_version text;

alter table public.profiles
add column if not exists legal_privacy_version text;

alter table public.profiles
add column if not exists legal_accepted_at timestamptz;

create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'moderator')),
  granted_at timestamptz not null default now(),
  granted_by uuid references auth.users(id) on delete set null,
  primary key (user_id, role)
);

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
    where user_roles.user_id = user_uuid
      and user_roles.role = 'admin'
  );
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    role,
    legal_terms_version,
    legal_privacy_version,
    legal_accepted_at
  )
  values (
    new.id,
    coalesce(new.email, ''),
    case
      when new.raw_user_meta_data->>'role' in ('candidate', 'company')
      then new.raw_user_meta_data->>'role'
      else 'candidate'
    end,
    nullif(new.raw_user_meta_data->>'legal_terms_version', ''),
    nullif(new.raw_user_meta_data->>'legal_privacy_version', ''),
    nullif(new.raw_user_meta_data->>'legal_accepted_at', '')::timestamptz
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists auth_users_create_profile on auth.users;

create trigger auth_users_create_profile
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create table if not exists public.candidate_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  full_name text not null,
  age integer check (age is null or (age >= 16 and age <= 100)),
  target_role text,
  location text,
  work_mode text check (work_mode in ('remote', 'hybrid', 'onsite')),
  salary_min integer check (salary_min is null or salary_min >= 0),
  salary_max integer check (salary_max is null or salary_max >= salary_min),
  summary text,
  resume_path text,
  resume_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.candidate_profiles
add column if not exists age integer check (age is null or (age >= 16 and age <= 100));

alter table public.candidate_profiles
add column if not exists resume_path text;

alter table public.candidate_profiles
add column if not exists resume_name text;

create table if not exists public.plan_catalog (
  code text primary key check (code in ('free', 'pro', 'premium')),
  display_name text not null,
  monthly_price_mxn integer,
  active boolean not null default true,
  job_limit integer,
  featured_slots integer not null default 0,
  verification_eligible boolean not null default false,
  features jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.plan_catalog (
  code,
  display_name,
  monthly_price_mxn,
  job_limit,
  featured_slots,
  verification_eligible,
  features
)
values
  ('free', 'Free', null, null, 0, false, '{"beta_access": true, "payments_enabled": false}'::jsonb),
  ('pro', 'Pro', null, null, 1, true, '{"beta_access": true, "payments_enabled": false, "future_priority": "medium"}'::jsonb),
  ('premium', 'Premium', null, null, 3, true, '{"beta_access": true, "payments_enabled": false, "future_priority": "high"}'::jsonb)
on conflict (code) do update set
  display_name = excluded.display_name,
  featured_slots = excluded.featured_slots,
  verification_eligible = excluded.verification_eligible,
  features = excluded.features;

create table if not exists public.company_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  company_name text not null,
  industry text,
  location text,
  website text,
  description text,
  plan text not null default 'free' check (plan in ('free', 'pro', 'premium')),
  plan_status text not null default 'beta' check (plan_status in ('beta', 'trialing', 'active', 'past_due', 'canceled')),
  is_verified boolean not null default false,
  billing_provider text check (billing_provider is null or billing_provider in ('stripe', 'mercado_pago', 'manual')),
  billing_customer_id text,
  billing_subscription_id text,
  plan_started_at timestamptz,
  plan_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.company_profiles
add column if not exists plan text not null default 'free';

alter table public.company_profiles
add column if not exists plan_status text not null default 'beta';

alter table public.company_profiles
add column if not exists is_verified boolean not null default false;

alter table public.company_profiles
add column if not exists billing_provider text;

alter table public.company_profiles
add column if not exists billing_customer_id text;

alter table public.company_profiles
add column if not exists billing_subscription_id text;

alter table public.company_profiles
add column if not exists plan_started_at timestamptz;

alter table public.company_profiles
add column if not exists plan_expires_at timestamptz;

alter table public.company_profiles
add column if not exists logo_path text;

alter table public.company_profiles
add column if not exists logo_name text;

alter table public.company_profiles
drop constraint if exists company_profiles_plan_check;

alter table public.company_profiles
add constraint company_profiles_plan_check check (plan in ('free', 'pro', 'premium'));

alter table public.company_profiles
drop constraint if exists company_profiles_plan_status_check;

alter table public.company_profiles
add constraint company_profiles_plan_status_check check (plan_status in ('beta', 'trialing', 'active', 'past_due', 'canceled'));

alter table public.company_profiles
drop constraint if exists company_profiles_billing_provider_check;

alter table public.company_profiles
add constraint company_profiles_billing_provider_check
check (billing_provider is null or billing_provider in ('stripe', 'mercado_pago', 'manual'));

alter table public.company_profiles
drop constraint if exists company_profiles_plan_fkey;

alter table public.company_profiles
add constraint company_profiles_plan_fkey
foreign key (plan) references public.plan_catalog(code);

alter table public.company_profiles
drop constraint if exists company_profiles_user_id_key;

create index if not exists company_profiles_user_id_idx on public.company_profiles(user_id);

create table if not exists public.candidate_skills (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  skill_name text not null,
  level text not null default 'intermediate' check (level in ('basic', 'intermediate', 'advanced')),
  unique (candidate_id, skill_name)
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.company_profiles(id) on delete cascade,
  title text not null,
  description text not null,
  location text,
  work_mode text not null check (work_mode in ('remote', 'hybrid', 'onsite')),
  category text not null default 'Otra',
  salary_min integer check (salary_min is null or salary_min >= 0),
  salary_max integer check (salary_max is null or salary_max >= salary_min),
  is_featured boolean not null default false,
  featured_priority integer not null default 0 check (featured_priority >= 0),
  featured_until timestamptz,
  promotion_source text check (promotion_source is null or promotion_source in ('plan', 'campaign', 'manual')),
  status text not null default 'draft' check (status in ('draft', 'published', 'paused', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.job_skills (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  skill_name text not null,
  importance text not null default 'important' check (importance in ('nice_to_have', 'important', 'required')),
  unique (job_id, skill_name)
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  status text not null default 'submitted' check (status in ('submitted', 'reviewing', 'interview', 'rejected', 'hired', 'withdrawn')),
  match_score integer check (match_score is null or (match_score >= 0 and match_score <= 100)),
  cover_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, candidate_id)
);

alter table public.applications
add column if not exists company_archived_at timestamptz;

create table if not exists public.saved_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, job_id)
);

create table if not exists public.company_ratings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.company_profiles(id) on delete cascade,
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, candidate_id)
);

create or replace view public.company_rating_summary as
select
  company_id,
  round(avg(rating)::numeric, 1) as average_rating,
  count(*)::integer as rating_count
from public.company_ratings
group by company_id;

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid references auth.users(id) on delete set null,
  category text not null check (category in ('job', 'user', 'company', 'message', 'application', 'other')),
  target_type text,
  target_id uuid,
  subject text not null,
  description text not null,
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'resolved', 'dismissed')),
  admin_note text,
  resolved_at timestamptz,
  resolved_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reports_status_created_at_idx on public.reports(status, created_at desc);
create index if not exists reports_target_idx on public.reports(target_type, target_id);

alter table public.reports
drop constraint if exists reports_subject_length_check;

alter table public.reports
add constraint reports_subject_length_check
check (char_length(trim(subject)) between 3 and 140);

alter table public.reports
drop constraint if exists reports_description_length_check;

alter table public.reports
add constraint reports_description_length_check
check (char_length(trim(description)) between 10 and 3000);

alter table public.reports
drop constraint if exists reports_target_type_check;

alter table public.reports
add constraint reports_target_type_check
check (target_type is null or target_type in ('job', 'user', 'company', 'message', 'application'));

create table if not exists public.billing_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.company_profiles(id) on delete set null,
  provider text not null check (provider in ('stripe', 'mercado_pago', 'manual')),
  provider_event_id text not null,
  event_type text not null,
  status text not null default 'pending' check (status in ('pending', 'processed', 'failed', 'ignored')),
  payload jsonb not null default '{}'::jsonb,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (provider, provider_event_id)
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null unique references public.applications(id) on delete cascade,
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  company_id uuid not null references public.company_profiles(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  status text not null default 'open' check (status in ('open', 'archived', 'blocked')),
  last_message_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(trim(body)) > 0),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists candidate_skills_candidate_id_idx on public.candidate_skills(candidate_id);
create index if not exists jobs_company_id_idx on public.jobs(company_id);
create index if not exists jobs_status_idx on public.jobs(status);
create index if not exists job_skills_job_id_idx on public.job_skills(job_id);
create index if not exists applications_candidate_id_idx on public.applications(candidate_id);
create index if not exists applications_job_id_idx on public.applications(job_id);
create index if not exists saved_jobs_user_id_idx on public.saved_jobs(user_id);
create index if not exists saved_jobs_job_id_idx on public.saved_jobs(job_id);
create index if not exists company_ratings_company_id_idx on public.company_ratings(company_id);
create index if not exists company_ratings_candidate_id_idx on public.company_ratings(candidate_id);
create index if not exists billing_events_company_id_idx on public.billing_events(company_id);
create index if not exists billing_events_status_idx on public.billing_events(status);
create index if not exists conversations_candidate_id_idx on public.conversations(candidate_id);
create index if not exists conversations_company_id_idx on public.conversations(company_id);
create index if not exists messages_conversation_id_created_at_idx on public.messages(conversation_id, created_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists candidate_profiles_updated_at on public.candidate_profiles;

create trigger candidate_profiles_updated_at
before update on public.candidate_profiles
for each row execute function public.set_updated_at();

drop trigger if exists plan_catalog_updated_at on public.plan_catalog;

create trigger plan_catalog_updated_at
before update on public.plan_catalog
for each row execute function public.set_updated_at();

drop trigger if exists company_profiles_updated_at on public.company_profiles;

create trigger company_profiles_updated_at
before update on public.company_profiles
for each row execute function public.set_updated_at();

drop trigger if exists jobs_updated_at on public.jobs;

create trigger jobs_updated_at
before update on public.jobs
for each row execute function public.set_updated_at();

drop trigger if exists applications_updated_at on public.applications;

create trigger applications_updated_at
before update on public.applications
for each row execute function public.set_updated_at();

drop trigger if exists company_ratings_updated_at on public.company_ratings;

create trigger company_ratings_updated_at
before update on public.company_ratings
for each row execute function public.set_updated_at();

drop trigger if exists reports_updated_at on public.reports;

create trigger reports_updated_at
before update on public.reports
for each row execute function public.set_updated_at();

alter table public.jobs
add column if not exists category text not null default 'Otra';

alter table public.jobs
add column if not exists is_featured boolean not null default false;

alter table public.jobs
add column if not exists featured_priority integer not null default 0;

alter table public.jobs
add column if not exists featured_until timestamptz;

alter table public.jobs
add column if not exists promotion_source text;

alter table public.jobs
drop constraint if exists jobs_featured_priority_check;

alter table public.jobs
add constraint jobs_featured_priority_check check (featured_priority >= 0);

alter table public.jobs
drop constraint if exists jobs_promotion_source_check;

alter table public.jobs
add constraint jobs_promotion_source_check
check (promotion_source is null or promotion_source in ('plan', 'campaign', 'manual'));

create index if not exists jobs_category_idx on public.jobs(category);
create index if not exists jobs_featured_priority_idx on public.jobs(is_featured, featured_priority desc, featured_until);

create or replace function public.protect_company_monetization_fields()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.role() <> 'service_role' and not public.is_admin() then
    if tg_op = 'INSERT' then
      new.plan = 'free';
      new.plan_status = 'beta';
      new.is_verified = false;
      new.billing_provider = null;
      new.billing_customer_id = null;
      new.billing_subscription_id = null;
      new.plan_started_at = null;
      new.plan_expires_at = null;
    else
      new.plan = old.plan;
      new.plan_status = old.plan_status;
      new.is_verified = old.is_verified;
      new.billing_provider = old.billing_provider;
      new.billing_customer_id = old.billing_customer_id;
      new.billing_subscription_id = old.billing_subscription_id;
      new.plan_started_at = old.plan_started_at;
      new.plan_expires_at = old.plan_expires_at;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists company_profiles_protect_monetization on public.company_profiles;

create trigger company_profiles_protect_monetization
before insert or update on public.company_profiles
for each row execute function public.protect_company_monetization_fields();

create or replace function public.protect_job_promotion_fields()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.role() <> 'service_role' then
    if tg_op = 'INSERT' then
      new.is_featured = false;
      new.featured_priority = 0;
      new.featured_until = null;
      new.promotion_source = null;
    else
      new.is_featured = old.is_featured;
      new.featured_priority = old.featured_priority;
      new.featured_until = old.featured_until;
      new.promotion_source = old.promotion_source;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists jobs_protect_promotion on public.jobs;

create trigger jobs_protect_promotion
before insert or update on public.jobs
for each row execute function public.protect_job_promotion_fields();

create or replace function public.sync_conversation_last_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.conversations
  set last_message_at = new.created_at
  where id = new.conversation_id;

  return new;
end;
$$;

drop trigger if exists messages_sync_conversation_last_message on public.messages;

create trigger messages_sync_conversation_last_message
after insert on public.messages
for each row execute function public.sync_conversation_last_message();

create or replace function public.create_conversation_for_application()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_company_id uuid;
begin
  select jobs.company_id
  into selected_company_id
  from public.jobs
  where jobs.id = new.job_id;

  insert into public.conversations (application_id, candidate_id, company_id, job_id)
  values (new.id, new.candidate_id, selected_company_id, new.job_id);

  return new;
end;
$$;

drop trigger if exists applications_create_conversation on public.applications;

create trigger applications_create_conversation
after insert on public.applications
for each row execute function public.create_conversation_for_application();

create or replace function public.apply_to_job(
  job_uuid uuid,
  candidate_uuid uuid,
  match_score_value integer default null,
  cover_note_value text default null
)
returns public.applications
language plpgsql
security definer
set search_path = public
as $$
declare
  selected_application public.applications;
  selected_company_user_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesion para postularte.';
  end if;

  if not public.is_account_active() then
    raise exception 'Tu cuenta esta suspendida.';
  end if;

  if not exists (
    select 1
    from public.candidate_profiles
    where candidate_profiles.id = candidate_uuid
      and candidate_profiles.user_id = auth.uid()
  ) then
    raise exception 'Guarda tu perfil candidato antes de postularte.';
  end if;

  select company_profiles.user_id
  into selected_company_user_id
  from public.jobs
  join public.company_profiles on company_profiles.id = jobs.company_id
  where jobs.id = job_uuid
    and jobs.status = 'published';

  if selected_company_user_id is null then
    raise exception 'La vacante no existe o no esta publicada.';
  end if;

  if selected_company_user_id = auth.uid() then
    raise exception 'No puedes postularte a una vacante publicada por tu misma cuenta.';
  end if;

  insert into public.applications (
    job_id,
    candidate_id,
    status,
    match_score,
    cover_note
  )
  values (
    job_uuid,
    candidate_uuid,
    'submitted',
    match_score_value,
    nullif(trim(cover_note_value), '')
  )
  returning * into selected_application;

  return selected_application;
exception
  when unique_violation then
    select *
    into selected_application
    from public.applications
    where applications.job_id = job_uuid
      and applications.candidate_id = candidate_uuid
    limit 1;

    return selected_application;
end;
$$;

create or replace function public.update_my_application(
  application_uuid uuid,
  next_status text default null,
  cover_note_value text default null
)
returns public.applications
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_application public.applications;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesion.';
  end if;

  if next_status is not null and next_status <> 'withdrawn' then
    raise exception 'El candidato solo puede retirar su postulacion.';
  end if;

  update public.applications
  set
    status = coalesce(next_status, status),
    cover_note = case
      when cover_note_value is null then cover_note
      else nullif(trim(cover_note_value), '')
    end
  where applications.id = application_uuid
    and public.user_owns_candidate(applications.candidate_id)
    and applications.status <> 'hired'
  returning * into updated_application;

  if updated_application.id is null then
    raise exception 'No puedes actualizar esta postulacion.';
  end if;

  return updated_application;
end;
$$;

create or replace function public.update_company_application_status(
  application_uuid uuid,
  next_status text
)
returns public.applications
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_application public.applications;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesion.';
  end if;

  if next_status not in ('reviewing', 'interview', 'rejected', 'hired') then
    raise exception 'Estado no permitido para empresa.';
  end if;

  update public.applications
  set status = next_status
  where applications.id = application_uuid
    and exists (
      select 1
      from public.jobs
      where jobs.id = applications.job_id
        and public.user_owns_company(jobs.company_id)
    )
  returning * into updated_application;

  if updated_application.id is null then
    raise exception 'No puedes actualizar esta postulacion.';
  end if;

  return updated_application;
end;
$$;

create or replace function public.archive_company_application(application_uuid uuid)
returns public.applications
language plpgsql
security definer
set search_path = public
as $$
declare
  archived_application public.applications;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesión.';
  end if;

  update public.applications
  set company_archived_at = now()
  where applications.id = application_uuid
    and exists (
      select 1
      from public.jobs
      where jobs.id = applications.job_id
        and public.user_owns_company(jobs.company_id)
    )
  returning * into archived_application;

  if archived_application.id is null then
    raise exception 'No puedes quitar esta postulación.';
  end if;

  return archived_application;
end;
$$;

revoke all on function public.archive_company_application(uuid) from public;
grant execute on function public.archive_company_application(uuid) to authenticated;

create or replace function public.is_account_active(user_uuid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((
    select profiles.suspended_at is null
    from public.profiles
    where profiles.id = user_uuid
  ), false);
$$;

create or replace function public.protect_profile_admin_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    new.suspended_at = old.suspended_at;
    new.suspension_reason = old.suspension_reason;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_admin_fields on public.profiles;

create trigger profiles_protect_admin_fields
before update on public.profiles
for each row execute function public.protect_profile_admin_fields();

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
        'jobs', (select count(*) from public.jobs),
        'published_jobs', (select count(*) from public.jobs where status = 'published'),
        'applications', (select count(*) from public.applications),
        'pending_reports', (select count(*) from public.reports where status in ('pending', 'reviewing'))
      )
  end;
$$;

create or replace function public.admin_set_job_status(job_uuid uuid, next_status text)
returns public.jobs
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_job public.jobs;
begin
  if not public.is_admin() then
    raise exception 'Acceso no autorizado.';
  end if;

  if next_status not in ('published', 'paused', 'closed') then
    raise exception 'Estado de vacante no permitido.';
  end if;

  update public.jobs
  set status = next_status
  where id = job_uuid
  returning * into updated_job;

  if updated_job.id is null then
    raise exception 'Vacante no encontrada.';
  end if;

  return updated_job;
end;
$$;

create or replace function public.admin_delete_job(job_uuid uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_id uuid;
begin
  if not public.is_admin() then
    raise exception 'Acceso no autorizado.';
  end if;

  delete from public.jobs
  where id = job_uuid
  returning id into deleted_id;

  if deleted_id is null then
    raise exception 'Vacante no encontrada.';
  end if;

  return deleted_id;
end;
$$;

create or replace function public.admin_set_user_suspension(
  user_uuid uuid,
  should_suspend boolean,
  reason text default null
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_profile public.profiles;
begin
  if not public.is_admin() then
    raise exception 'Acceso no autorizado.';
  end if;

  if user_uuid = auth.uid() and should_suspend then
    raise exception 'No puedes suspender tu propia cuenta.';
  end if;

  update public.profiles
  set
    suspended_at = case when should_suspend then now() else null end,
    suspension_reason = case when should_suspend then nullif(trim(reason), '') else null end
  where id = user_uuid
  returning * into updated_profile;

  if updated_profile.id is null then
    raise exception 'Usuario no encontrado.';
  end if;

  return updated_profile;
end;
$$;

create or replace function public.admin_set_company_verified(company_uuid uuid, verified boolean)
returns public.company_profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_company public.company_profiles;
begin
  if not public.is_admin() then
    raise exception 'Acceso no autorizado.';
  end if;

  update public.company_profiles
  set is_verified = verified
  where id = company_uuid
  returning * into updated_company;

  if updated_company.id is null then
    raise exception 'Empresa no encontrada.';
  end if;

  return updated_company;
end;
$$;

create or replace function public.admin_update_report(
  report_uuid uuid,
  next_status text,
  note text default null
)
returns public.reports
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_report public.reports;
begin
  if not public.is_admin() then
    raise exception 'Acceso no autorizado.';
  end if;

  if next_status not in ('pending', 'reviewing', 'resolved', 'dismissed') then
    raise exception 'Estado de reporte no permitido.';
  end if;

  update public.reports
  set
    status = next_status,
    admin_note = nullif(trim(note), ''),
    resolved_at = case when next_status in ('resolved', 'dismissed') then now() else null end,
    resolved_by = case when next_status in ('resolved', 'dismissed') then auth.uid() else null end
  where id = report_uuid
  returning * into updated_report;

  if updated_report.id is null then
    raise exception 'Reporte no encontrado.';
  end if;

  return updated_report;
end;
$$;

revoke all on function public.is_admin(uuid) from public;
revoke all on function public.admin_dashboard_stats() from public;
revoke all on function public.admin_set_job_status(uuid, text) from public;
revoke all on function public.admin_delete_job(uuid) from public;
revoke all on function public.admin_set_user_suspension(uuid, boolean, text) from public;
revoke all on function public.admin_set_company_verified(uuid, boolean) from public;
revoke all on function public.admin_update_report(uuid, text, text) from public;

grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.admin_dashboard_stats() to authenticated;
grant execute on function public.admin_set_job_status(uuid, text) to authenticated;
grant execute on function public.admin_delete_job(uuid) to authenticated;
grant execute on function public.admin_set_user_suspension(uuid, boolean, text) to authenticated;
grant execute on function public.admin_set_company_verified(uuid, boolean) to authenticated;
grant execute on function public.admin_update_report(uuid, text, text) to authenticated;

create or replace function public.mark_conversation_read(conversation_uuid uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count integer := 0;
begin
  if auth.uid() is null then
    raise exception 'Debes iniciar sesion.';
  end if;

  if not public.is_conversation_participant(conversation_uuid) then
    raise exception 'No puedes leer esta conversacion.';
  end if;

  update public.messages
  set read_at = coalesce(read_at, now())
  where messages.conversation_id = conversation_uuid
    and messages.sender_user_id <> auth.uid()
    and messages.read_at is null;

  get diagnostics updated_count = row_count;
  return updated_count;
end;
$$;

revoke all on function public.apply_to_job(uuid, uuid, integer, text) from public;
revoke all on function public.update_my_application(uuid, text, text) from public;
revoke all on function public.update_company_application_status(uuid, text) from public;
revoke all on function public.mark_conversation_read(uuid) from public;

grant execute on function public.apply_to_job(uuid, uuid, integer, text) to authenticated;
grant execute on function public.update_my_application(uuid, text, text) to authenticated;
grant execute on function public.update_company_application_status(uuid, text) to authenticated;
grant execute on function public.mark_conversation_read(uuid) to authenticated;

create or replace function public.is_conversation_participant(conversation_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.conversations
    join public.candidate_profiles on candidate_profiles.id = conversations.candidate_id
    join public.company_profiles on company_profiles.id = conversations.company_id
    where conversations.id = conversation_uuid
      and public.is_account_active()
      and (
        candidate_profiles.user_id = auth.uid()
        or company_profiles.user_id = auth.uid()
      )
  );
$$;

create or replace function public.user_owns_candidate(candidate_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.candidate_profiles
    where candidate_profiles.id = candidate_uuid
      and candidate_profiles.user_id = auth.uid()
      and public.is_account_active()
  );
$$;

create or replace function public.is_candidate_owner(candidate_uuid uuid, user_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.candidate_profiles
    where candidate_profiles.id = candidate_uuid
      and candidate_profiles.user_id = user_uuid
  );
$$;

create or replace function public.user_owns_company(company_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.company_profiles
    where company_profiles.id = company_uuid
      and company_profiles.user_id = auth.uid()
      and public.is_account_active()
  );
$$;

create or replace function public.user_owns_job(job_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.jobs
    join public.company_profiles on company_profiles.id = jobs.company_id
    where jobs.id = job_uuid
      and company_profiles.user_id = auth.uid()
      and public.is_account_active()
  );
$$;

create or replace function public.can_read_candidate(candidate_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select public.is_admin()
    or public.user_owns_candidate(candidate_uuid)
    or exists (
      select 1
      from public.applications
      join public.jobs on jobs.id = applications.job_id
      join public.company_profiles on company_profiles.id = jobs.company_id
      where applications.candidate_id = candidate_uuid
        and company_profiles.user_id = auth.uid()
    );
$$;

create or replace function public.can_read_company(company_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select public.is_admin()
    or public.user_owns_company(company_uuid)
    or exists (
      select 1
      from public.jobs
      where jobs.company_id = company_uuid
        and jobs.status = 'published'
    );
$$;

create or replace function public.can_read_job(job_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.jobs
    where jobs.id = job_uuid
      and (
        public.is_admin()
        or
        jobs.status = 'published'
        or public.user_owns_company(jobs.company_id)
      )
  );
$$;

create or replace function public.can_read_application(application_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.applications
    join public.jobs on jobs.id = applications.job_id
    where applications.id = application_uuid
      and (
        public.is_admin()
        or
        public.user_owns_candidate(applications.candidate_id)
        or public.user_owns_company(jobs.company_id)
      )
  );
$$;

create or replace function public.can_update_application(application_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.applications
    join public.jobs on jobs.id = applications.job_id
    where applications.id = application_uuid
      and (
        public.is_admin()
        or
        public.user_owns_candidate(applications.candidate_id)
        or public.user_owns_company(jobs.company_id)
      )
  );
$$;

create or replace function public.can_rate_company(company_uuid uuid, candidate_uuid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select
    public.is_account_active()
    and public.user_owns_candidate(candidate_uuid)
    and exists (
      select 1
      from public.applications
      join public.jobs on jobs.id = applications.job_id
      where applications.candidate_id = candidate_uuid
        and jobs.company_id = company_uuid
    );
$$;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.candidate_profiles enable row level security;
alter table public.plan_catalog enable row level security;
alter table public.company_profiles enable row level security;
alter table public.candidate_skills enable row level security;
alter table public.jobs enable row level security;
alter table public.job_skills enable row level security;
alter table public.applications enable row level security;
alter table public.saved_jobs enable row level security;
alter table public.company_ratings enable row level security;
alter table public.billing_events enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.reports enable row level security;

drop policy if exists "Users can read own base profile" on public.profiles;

create policy "Users can read own base profile"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

drop policy if exists "Users can create own base profile" on public.profiles;

create policy "Users can create own base profile"
on public.profiles for insert
with check (id = auth.uid());

drop policy if exists "Users can update own base profile" on public.profiles;

create policy "Users can update own base profile"
on public.profiles for update
using (id = auth.uid() and public.is_account_active())
with check (id = auth.uid() and public.is_account_active());

drop policy if exists "Users read own roles and admins read all roles" on public.user_roles;

create policy "Users read own roles and admins read all roles"
on public.user_roles for select
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "Plan catalog is publicly readable" on public.plan_catalog;

create policy "Plan catalog is publicly readable"
on public.plan_catalog for select
using (active = true);

drop policy if exists "Candidates can manage own profile" on public.candidate_profiles;

create policy "Candidates can manage own profile"
on public.candidate_profiles for all
using (user_id = auth.uid() and public.is_account_active())
with check (user_id = auth.uid() and public.is_account_active());

drop policy if exists "Companies can read candidate profiles for applications" on public.candidate_profiles;

create policy "Companies can read candidate profiles for applications"
on public.candidate_profiles for select
using (public.can_read_candidate(id));

drop policy if exists "Companies can manage own profile" on public.company_profiles;

create policy "Companies can manage own profile"
on public.company_profiles for all
using (user_id = auth.uid() and public.is_account_active())
with check (user_id = auth.uid() and public.is_account_active());

drop policy if exists "Candidates can read company profiles with published jobs" on public.company_profiles;

create policy "Candidates can read company profiles with published jobs"
on public.company_profiles for select
using (public.can_read_company(id));

drop policy if exists "Admins read all company profiles" on public.company_profiles;

create policy "Admins read all company profiles"
on public.company_profiles for select
using (public.is_admin());

drop policy if exists "Candidates manage own skills" on public.candidate_skills;

create policy "Candidates manage own skills"
on public.candidate_skills for all
using (public.user_owns_candidate(candidate_id))
with check (public.user_owns_candidate(candidate_id));

drop policy if exists "Published jobs are readable" on public.jobs;

create policy "Published jobs are readable"
on public.jobs for select
using (public.can_read_job(id));

drop policy if exists "Admins read all jobs" on public.jobs;

create policy "Admins read all jobs"
on public.jobs for select
using (public.is_admin());

drop policy if exists "Companies manage own jobs" on public.jobs;

create policy "Companies manage own jobs"
on public.jobs for all
using (public.user_owns_company(company_id))
with check (public.user_owns_company(company_id));

drop policy if exists "Job skills follow job visibility" on public.job_skills;

create policy "Job skills follow job visibility"
on public.job_skills for select
using (public.can_read_job(job_id));

drop policy if exists "Companies manage own job skills" on public.job_skills;

create policy "Companies manage own job skills"
on public.job_skills for all
using (public.user_owns_job(job_id))
with check (public.user_owns_job(job_id));

drop policy if exists "Candidates and companies read relevant applications" on public.applications;

create policy "Candidates and companies read relevant applications"
on public.applications for select
using (public.can_read_application(id));

drop policy if exists "Candidates create own applications" on public.applications;

drop policy if exists "Candidates update own applications" on public.applications;

drop policy if exists "Companies update applications for own jobs" on public.applications;

drop policy if exists "Users manage own saved jobs" on public.saved_jobs;

create policy "Users manage own saved jobs"
on public.saved_jobs for all
using (user_id = auth.uid() and public.is_account_active())
with check (
  user_id = auth.uid()
  and public.is_account_active()
  and public.can_read_job(job_id)
);

drop policy if exists "Users read own company ratings" on public.company_ratings;

create policy "Users read own company ratings"
on public.company_ratings for select
using (
  user_id = auth.uid()
  or public.user_owns_company(company_id)
  or public.is_admin()
);

drop policy if exists "Candidates create company ratings after applying" on public.company_ratings;

create policy "Candidates create company ratings after applying"
on public.company_ratings for insert
with check (
  user_id = auth.uid()
  and public.can_rate_company(company_id, candidate_id)
);

drop policy if exists "Candidates update own company ratings" on public.company_ratings;

create policy "Candidates update own company ratings"
on public.company_ratings for update
using (
  user_id = auth.uid()
  and public.can_rate_company(company_id, candidate_id)
)
with check (
  user_id = auth.uid()
  and public.can_rate_company(company_id, candidate_id)
);

drop policy if exists "Candidates delete own company ratings" on public.company_ratings;

create policy "Candidates delete own company ratings"
on public.company_ratings for delete
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "Authenticated users create reports" on public.reports;

create policy "Authenticated users create reports"
on public.reports for insert
with check (
  reporter_user_id = auth.uid()
  and public.is_account_active()
);

drop policy if exists "Users read own reports" on public.reports;

create policy "Users read own reports"
on public.reports for select
using (reporter_user_id = auth.uid() or public.is_admin());

drop policy if exists "Admins read all reports" on public.reports;

create policy "Admins read all reports"
on public.reports for select
using (public.is_admin());

revoke all on table public.user_roles from anon, authenticated;
grant select on table public.user_roles to authenticated;

revoke all on table public.reports from anon, authenticated;
grant select, insert on table public.reports to authenticated;

grant select on table public.company_rating_summary to anon, authenticated;
grant select, insert, update, delete on table public.company_ratings to authenticated;

drop policy if exists "Conversation participants can read conversations" on public.conversations;

create policy "Conversation participants can read conversations"
on public.conversations for select
using (public.is_conversation_participant(id));

drop policy if exists "Conversation participants can read messages" on public.messages;

create policy "Conversation participants can read messages"
on public.messages for select
using (public.is_conversation_participant(conversation_id));

drop policy if exists "Conversation participants can send messages" on public.messages;

create policy "Conversation participants can send messages"
on public.messages for insert
with check (
  sender_user_id = auth.uid()
  and public.is_conversation_participant(conversation_id)
);

drop policy if exists "Conversation participants can mark messages as read" on public.messages;

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do update set public = false;

insert into storage.buckets (id, name, public)
values ('company-logos', 'company-logos', true)
on conflict (id) do update set public = true;

drop policy if exists "Candidates upload own resumes" on storage.objects;

create policy "Candidates upload own resumes"
on storage.objects for insert
with check (
  bucket_id = 'resumes'
  and public.is_account_active()
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Candidates update own resumes" on storage.objects;

create policy "Candidates update own resumes"
on storage.objects for update
using (
  bucket_id = 'resumes'
  and public.is_account_active()
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'resumes'
  and public.is_account_active()
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Candidates delete own resumes" on storage.objects;

create policy "Candidates delete own resumes"
on storage.objects for delete
using (
  bucket_id = 'resumes'
  and public.is_account_active()
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Relevant companies read candidate resumes" on storage.objects;

create policy "Relevant companies read candidate resumes"
on storage.objects for select
using (
  bucket_id = 'resumes'
  and public.is_account_active()
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or exists (
      select 1
      from public.candidate_profiles
      join public.applications on applications.candidate_id = candidate_profiles.id
      join public.jobs on jobs.id = applications.job_id
      join public.company_profiles on company_profiles.id = jobs.company_id
      where candidate_profiles.user_id::text = (storage.foldername(name))[1]
        and company_profiles.user_id = auth.uid()
    )
  )
);

drop policy if exists "Public can read company logos" on storage.objects;

create policy "Public can read company logos"
on storage.objects for select
using (bucket_id = 'company-logos');

drop policy if exists "Companies upload own logos" on storage.objects;

create policy "Companies upload own logos"
on storage.objects for insert
with check (
  bucket_id = 'company-logos'
  and public.is_account_active()
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Companies update own logos" on storage.objects;

create policy "Companies update own logos"
on storage.objects for update
using (
  bucket_id = 'company-logos'
  and public.is_account_active()
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'company-logos'
  and public.is_account_active()
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Companies delete own logos" on storage.objects;

create policy "Companies delete own logos"
on storage.objects for delete
using (
  bucket_id = 'company-logos'
  and public.is_account_active()
  and (storage.foldername(name))[1] = auth.uid()::text
);
