-- RedJob: auditoria de posibles tablas o copias sobrevivientes.
-- Esta consulta es de solo lectura. No modifica estructura ni datos.

select
  schema_name
from information_schema.schemata
where schema_name not like 'pg_%'
  and schema_name <> 'information_schema'
order by schema_name;

with relation_inventory as (
  select
    namespace.nspname as schema_name,
    relation.relname as relation_name,
    case relation.relkind
      when 'r' then 'table'
      when 'p' then 'partitioned table'
      when 'v' then 'view'
      when 'm' then 'materialized view'
      else relation.relkind::text
    end as relation_type,
    greatest(relation.reltuples::bigint, 0) as estimated_rows,
    count(attribute.attnum) filter (
      where attribute.attnum > 0 and not attribute.attisdropped
    )::integer as total_columns,
    coalesce(
      array_agg(attribute.attname::text order by attribute.attnum) filter (
        where attribute.attnum > 0
          and not attribute.attisdropped
          and attribute.attname::text = any (array[
            'user_id', 'company_id', 'candidate_id', 'job_id',
            'company_name', 'full_name', 'title', 'description',
            'location', 'work_mode', 'salary_min', 'salary_max',
            'requirements', 'status', 'created_at', 'updated_at'
          ])
      ),
      array[]::text[]
    ) as matching_columns
  from pg_class as relation
  join pg_namespace as namespace on namespace.oid = relation.relnamespace
  left join pg_attribute as attribute on attribute.attrelid = relation.oid
  where relation.relkind in ('r', 'p', 'v', 'm')
    and namespace.nspname not like 'pg_%'
    and namespace.nspname <> 'information_schema'
  group by
    namespace.nspname,
    relation.relname,
    relation.relkind,
    relation.reltuples
)
select
  schema_name,
  relation_name,
  relation_type,
  estimated_rows,
  total_columns,
  matching_columns
from relation_inventory
where cardinality(matching_columns) >= 3
   or relation_name ~* '(job|vacan|empresa|company|candidate|application|profile|message|conversation|backup|old|temp|archive)'
   or schema_name not in (
     'public', 'auth', 'storage', 'realtime', 'vault',
     'extensions', 'graphql', 'graphql_public',
     'supabase_functions', 'supabase_migrations'
   )
order by
  case when schema_name = 'public' then 0 else 1 end,
  estimated_rows desc,
  schema_name,
  relation_name;
