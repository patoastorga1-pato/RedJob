-- Corrige el aviso security_definer_view sin exponer calificaciones individuales.
-- Conserva el endpoint REST /company_rating_summary utilizado por RedJob.

begin;

do $$
declare
  relation_kind text;
begin
  select relation.relkind
  into relation_kind
    from pg_class as relation
    join pg_namespace as namespace on namespace.oid = relation.relnamespace
    where namespace.nspname = 'public'
      and relation.relname = 'company_rating_summary';

  if relation_kind = 'v' then
    execute 'drop view if exists public.company_rating_summary';
  elsif relation_kind = 'm' then
    execute 'drop materialized view if exists public.company_rating_summary';
  end if;
end;
$$;

create table if not exists public.company_rating_summary (
  company_id uuid primary key references public.company_profiles(id) on delete cascade,
  average_rating numeric(2, 1) not null check (average_rating between 1 and 5),
  rating_count integer not null check (rating_count > 0),
  updated_at timestamptz not null default now()
);

alter table public.company_rating_summary enable row level security;

drop policy if exists "Public reads company rating summary" on public.company_rating_summary;

create policy "Public reads company rating summary"
on public.company_rating_summary for select
to anon, authenticated
using (rating_count > 0 and average_rating between 1 and 5);

revoke all on table public.company_rating_summary from anon, authenticated;
grant select on table public.company_rating_summary to anon, authenticated;

create or replace function public.refresh_company_rating_summary()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  affected_company_ids uuid[];
  affected_company_id uuid;
begin
  if tg_op = 'INSERT' then
    affected_company_ids := array[new.company_id];
  elsif tg_op = 'DELETE' then
    affected_company_ids := array[old.company_id];
  elsif old.company_id is distinct from new.company_id then
    affected_company_ids := array[old.company_id, new.company_id];
  else
    affected_company_ids := array[new.company_id];
  end if;

  foreach affected_company_id in array affected_company_ids loop
    delete from public.company_rating_summary
    where company_id = affected_company_id;

    insert into public.company_rating_summary (
      company_id,
      average_rating,
      rating_count,
      updated_at
    )
    select
      ratings.company_id,
      round(avg(ratings.rating)::numeric, 1),
      count(*)::integer,
      now()
    from public.company_ratings as ratings
    where ratings.company_id = affected_company_id
    group by ratings.company_id;
  end loop;

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

revoke all on function public.refresh_company_rating_summary() from public, anon, authenticated;

drop trigger if exists company_ratings_refresh_summary on public.company_ratings;

create trigger company_ratings_refresh_summary
after insert or update of company_id, rating or delete on public.company_ratings
for each row execute function public.refresh_company_rating_summary();

delete from public.company_rating_summary;

insert into public.company_rating_summary (
  company_id,
  average_rating,
  rating_count,
  updated_at
)
select
  ratings.company_id,
  round(avg(ratings.rating)::numeric, 1),
  count(*)::integer,
  now()
from public.company_ratings as ratings
group by ratings.company_id;

notify pgrst, 'reload schema';

commit;

select
  company_id,
  average_rating,
  rating_count
from public.company_rating_summary
order by company_id;
