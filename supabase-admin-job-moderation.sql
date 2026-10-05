begin;

create or replace function public.protect_job_moderation_status()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.role() = 'service_role' or public.is_admin() then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.status = 'draft';
    return new;
  end if;

  if old.status = 'published'
    and new.status = 'published'
    and (
      new.company_id is distinct from old.company_id
      or new.title is distinct from old.title
      or new.description is distinct from old.description
      or new.location is distinct from old.location
      or new.work_mode is distinct from old.work_mode
      or new.category is distinct from old.category
      or new.salary_min is distinct from old.salary_min
      or new.salary_max is distinct from old.salary_max
    ) then
    new.status = 'draft';
    return new;
  end if;

  if new.status = 'published' and old.status is distinct from new.status then
    raise exception 'La vacante debe ser aprobada por un administrador antes de publicarse.';
  end if;

  return new;
end;
$$;

drop trigger if exists jobs_protect_moderation_status on public.jobs;

create trigger jobs_protect_moderation_status
before insert or update on public.jobs
for each row execute function public.protect_job_moderation_status();

commit;
