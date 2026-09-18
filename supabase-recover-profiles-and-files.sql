-- RedJob profile recovery from Supabase Auth and Storage.
-- Safe to run after supabase-schema.sql. This script does not delete data.

begin;

-- Restore one minimal candidate profile for every candidate account.
insert into public.candidate_profiles (
  user_id,
  full_name,
  created_at,
  updated_at
)
select
  users.id,
  coalesce(
    nullif(trim(users.raw_user_meta_data->>'full_name'), ''),
    split_part(coalesce(users.email, 'Candidato'), '@', 1)
  ),
  users.created_at,
  users.created_at
from auth.users as users
join public.profiles as profiles on profiles.id = users.id
where profiles.role = 'candidate'
  and not exists (
    select 1
    from public.candidate_profiles as candidates
    where candidates.user_id = users.id
  );

-- Reconnect the newest stored resume belonging to each candidate account.
with latest_resumes as (
  select distinct on (split_part(objects.name, '/', 1))
    split_part(objects.name, '/', 1)::uuid as user_id,
    objects.name as resume_path,
    regexp_replace(regexp_replace(objects.name, '^.*/', ''), '^\d+-', '') as resume_name
  from storage.objects as objects
  join auth.users as users
    on users.id::text = split_part(objects.name, '/', 1)
  where objects.bucket_id = 'resumes'
  order by split_part(objects.name, '/', 1), objects.created_at desc, objects.name desc
)
update public.candidate_profiles as candidates
set
  resume_path = latest.resume_path,
  resume_name = latest.resume_name,
  updated_at = now()
from latest_resumes as latest
where candidates.user_id = latest.user_id
  and candidates.resume_path is null;

-- Restore one minimal company profile for every company account.
insert into public.company_profiles (
  user_id,
  company_name,
  created_at,
  updated_at
)
select
  users.id,
  coalesce(
    nullif(trim(users.raw_user_meta_data->>'full_name'), ''),
    split_part(coalesce(users.email, 'Empresa'), '@', 1)
  ),
  users.created_at,
  users.created_at
from auth.users as users
join public.profiles as profiles on profiles.id = users.id
where profiles.role = 'company'
  and not exists (
    select 1
    from public.company_profiles as companies
    where companies.user_id = users.id
  );

-- Reconnect the newest stored logo belonging to each company account.
with latest_logos as (
  select distinct on (split_part(objects.name, '/', 1))
    split_part(objects.name, '/', 1)::uuid as user_id,
    objects.name as logo_path,
    regexp_replace(objects.name, '^.*/', '') as logo_name
  from storage.objects as objects
  join auth.users as users
    on users.id::text = split_part(objects.name, '/', 1)
  where objects.bucket_id = 'company-logos'
  order by split_part(objects.name, '/', 1), objects.created_at desc, objects.name desc
)
update public.company_profiles as companies
set
  logo_path = latest.logo_path,
  logo_name = latest.logo_name,
  updated_at = now()
from latest_logos as latest
where companies.user_id = latest.user_id
  and companies.logo_path is null;

commit;

-- Verification and company matching result.
select
  companies.id as company_id,
  companies.user_id,
  companies.company_name,
  users.email,
  case when companies.logo_path is null then 'sin logo' else 'logo recuperado' end as logo_status
from public.company_profiles as companies
join auth.users as users on users.id = companies.user_id
order by companies.company_name;
