alter table public.applications
add column if not exists company_archived_at timestamptz;

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
