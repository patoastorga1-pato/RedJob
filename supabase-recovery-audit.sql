-- RedJob recovery audit after an accidental public-schema replacement.
-- READ ONLY: this file does not insert, update or delete anything.

with recovery_metrics(metric, value) as (
  select 'auth_users', count(*)::text from auth.users
  union all
  select 'auth_users_candidate_role', count(*)::text
  from auth.users where raw_user_meta_data->>'role' = 'candidate'
  union all
  select 'auth_users_company_role', count(*)::text
  from auth.users where raw_user_meta_data->>'role' = 'company'
  union all
  select 'auth_users_unknown_role', count(*)::text
  from auth.users where coalesce(raw_user_meta_data->>'role', '') not in ('candidate', 'company')
  union all
  select 'auth_users_with_full_name', count(*)::text
  from auth.users where nullif(trim(raw_user_meta_data->>'full_name'), '') is not null
  union all
  select 'profiles', count(*)::text from public.profiles
  union all
  select 'profiles_candidate_role', count(*)::text from public.profiles where role = 'candidate'
  union all
  select 'profiles_company_role', count(*)::text from public.profiles where role = 'company'
  union all
  select 'candidate_profiles', count(*)::text from public.candidate_profiles
  union all
  select 'company_profiles', count(*)::text from public.company_profiles
  union all
  select 'jobs', count(*)::text from public.jobs
  union all
  select 'job_skills', count(*)::text from public.job_skills
  union all
  select 'applications', count(*)::text from public.applications
  union all
  select 'saved_jobs', count(*)::text from public.saved_jobs
  union all
  select 'conversations', count(*)::text from public.conversations
  union all
  select 'messages', count(*)::text from public.messages
  union all
  select 'reports', count(*)::text from public.reports
  union all
  select 'billing_events', count(*)::text from public.billing_events
  union all
  select 'page_visits', count(*)::text from public.page_visits
  union all
  select 'storage_resume_files', count(*)::text
  from storage.objects where bucket_id = 'resumes'
  union all
  select 'storage_company_logo_files', count(*)::text
  from storage.objects where bucket_id = 'company-logos'
  union all
  select 'storage_resumes_matching_auth_user', count(*)::text
  from storage.objects as objects
  join auth.users as users on users.id::text = split_part(objects.name, '/', 1)
  where objects.bucket_id = 'resumes'
  union all
  select 'storage_logos_matching_auth_user', count(*)::text
  from storage.objects as objects
  join auth.users as users on users.id::text = split_part(objects.name, '/', 1)
  where objects.bucket_id = 'company-logos'
  union all
  select 'auth_users_missing_public_profile', count(*)::text
  from auth.users as users
  left join public.profiles as profiles on profiles.id = users.id
  where profiles.id is null
)
select metric, value
from recovery_metrics
order by metric;
