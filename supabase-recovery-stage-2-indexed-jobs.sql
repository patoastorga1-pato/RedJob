-- RedJob recovery - stage 2: published jobs preserved in Google's public index.
-- Safe and idempotent: restores only the three original job IDs below.
-- Does not delete data, restore applications/messages, or change billing plans.

begin;

do $$
begin
  if not exists (
    select 1
    from public.profiles
    where id = '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid
  ) then
    raise exception 'No existe el perfil propietario 4adc1b74-9d98-44c2-8813-b97750b72ab1. No se hizo ningun cambio.';
  end if;

  if not exists (
    select 1
    from public.company_profiles
    where id = '24dcfc84-4a45-402d-b985-afec0fcb7d4b'::uuid
  ) then
    raise exception 'Primero ejecuta supabase-recovery-stage-1-companies.sql. No se hizo ningun cambio.';
  end if;
end $$;

-- These two companies survived in Google's indexed job pages, but their
-- original company UUIDs and logo records did not. Reuse an existing matching
-- company if one is already present; otherwise create a stable local record.
insert into public.company_profiles (
  user_id,
  company_name,
  description,
  plan,
  plan_status,
  is_verified
)
select
  '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid,
  'Teleperformance',
  'Esta empresa publica sus vacantes en RedJob.',
  'free',
  'beta',
  false
where not exists (
  select 1
  from public.company_profiles
  where lower(trim(company_name)) = lower('Teleperformance')
);

insert into public.company_profiles (
  user_id,
  company_name,
  description,
  plan,
  plan_status,
  is_verified
)
select
  '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid,
  'The Hersheys Company',
  'The Hershey Company es una empresa internacional líder en la fabricación de chocolates, dulces y productos de confitería. Con presencia en diversos países, se caracteriza por ofrecer oportunidades de desarrollo profesional, capacitación constante y prestaciones competitivas para sus colaboradores.',
  'free',
  'beta',
  false
where not exists (
  select 1
  from public.company_profiles
  where lower(trim(company_name)) in (lower('The Hersheys Company'), lower('The Hershey Company'))
);

insert into public.jobs (
  id,
  company_id,
  title,
  description,
  location,
  work_mode,
  category,
  salary_min,
  salary_max,
  is_featured,
  featured_priority,
  status
)
values (
  '8f288a9a-a25a-4992-b30e-644532acc6bf'::uuid,
  '24dcfc84-4a45-402d-b985-afec0fcb7d4b'::uuid,
  'Agente de llamadas - Home Office',
  'Atención de llamadas en inglés y español para brindar asistencia y facilitar la comunicación entre clientes y usuarios. El trabajo se realiza completamente desde casa utilizando computadora e internet. Se proporciona capacitación pagada antes de iniciar operaciones. Responsabilidades: atender llamadas de manera profesional; escuchar y transmitir información con precisión; mantener una comunicación clara en inglés y español; seguir los procedimientos y lineamientos de la empresa; brindar una experiencia de calidad al cliente.',
  'Remoto',
  'remote',
  'Atencion al Cliente',
  10000,
  20000,
  false,
  0,
  'published'
)
on conflict (id) do update
set
  company_id = excluded.company_id,
  title = excluded.title,
  description = excluded.description,
  location = excluded.location,
  work_mode = excluded.work_mode,
  category = excluded.category,
  salary_min = excluded.salary_min,
  salary_max = excluded.salary_max,
  status = excluded.status,
  updated_at = now();

insert into public.jobs (
  id,
  company_id,
  title,
  description,
  location,
  work_mode,
  category,
  salary_min,
  salary_max,
  is_featured,
  featured_priority,
  status
)
select
  'f12e4ec3-9f8c-4e5b-8df1-dd1b7f5401fe'::uuid,
  companies.id,
  'Agente de Atención al Cliente Bilingüe',
  'Únete a Teleperformance como Agente de Atención al Cliente Bilingüe. Brindarás atención a clientes en inglés mediante llamadas, ofreciendo soporte y resolviendo dudas con un servicio de calidad. La campaña y las funciones específicas se asignan después del proceso de selección. Responsabilidades: atender llamadas en inglés; resolver dudas y brindar soporte al cliente; registrar información de cada interacción; mantener una atención profesional y cordial.',
  'Toluca, Estado de México',
  'hybrid',
  'Atencion al Cliente',
  11000,
  16000,
  false,
  0,
  'published'
from public.company_profiles as companies
where lower(trim(companies.company_name)) = lower('Teleperformance')
order by companies.created_at
limit 1
on conflict (id) do update
set
  company_id = excluded.company_id,
  title = excluded.title,
  description = excluded.description,
  location = excluded.location,
  work_mode = excluded.work_mode,
  category = excluded.category,
  salary_min = excluded.salary_min,
  salary_max = excluded.salary_max,
  status = excluded.status,
  updated_at = now();

insert into public.jobs (
  id,
  company_id,
  title,
  description,
  location,
  work_mode,
  category,
  salary_min,
  salary_max,
  is_featured,
  featured_priority,
  status
)
select
  'ba1e636d-fd45-47ff-8e56-f479a1068beb'::uuid,
  companies.id,
  'Operador(a) de Producción',
  'Hershey''s solicita personal para el área de producción. La persona será responsable de apoyar en los procesos de fabricación, empaque, inspección y manejo de productos, asegurando el cumplimiento de los estándares de calidad y seguridad de la empresa. Funciones principales: apoyo en líneas de producción; empaque y acomodo de producto terminado; inspección visual de calidad; limpieza y orden del área de trabajo; cumplimiento de normas de seguridad e higiene; apoyo en actividades generales de manufactura. Ofrecemos pago semanal aproximado de $1,950 libres, vales de despensa, aguinaldo de 27 días, prima vacacional del 90%, fondo de ahorro del 8.5%, caja de ahorro, transporte de personal, apoyo para útiles escolares, descuentos en productos de la marca, prestaciones superiores a las de ley y turnos rotativos. Contacto publicado: 311 593 9782.',
  'El Salto, Jalisco',
  'onsite',
  'Operaciones',
  9000,
  16000,
  false,
  0,
  'published'
from public.company_profiles as companies
where lower(trim(companies.company_name)) in (lower('The Hersheys Company'), lower('The Hershey Company'))
order by companies.created_at
limit 1
on conflict (id) do update
set
  company_id = excluded.company_id,
  title = excluded.title,
  description = excluded.description,
  location = excluded.location,
  work_mode = excluded.work_mode,
  category = excluded.category,
  salary_min = excluded.salary_min,
  salary_max = excluded.salary_max,
  status = excluded.status,
  updated_at = now();

insert into public.job_skills (job_id, skill_name, importance)
values
  ('8f288a9a-a25a-4992-b30e-644532acc6bf'::uuid, 'Computadora o laptop propia', 'required'),
  ('8f288a9a-a25a-4992-b30e-644532acc6bf'::uuid, 'Conexión estable a internet', 'required'),
  ('8f288a9a-a25a-4992-b30e-644532acc6bf'::uuid, 'Inglés avanzado', 'required'),
  ('8f288a9a-a25a-4992-b30e-644532acc6bf'::uuid, 'Preparatoria terminada', 'required'),
  ('8f288a9a-a25a-4992-b30e-644532acc6bf'::uuid, 'Residir en México', 'required'),
  ('f12e4ec3-9f8c-4e5b-8df1-dd1b7f5401fe'::uuid, 'Inglés avanzado conversacional', 'required'),
  ('f12e4ec3-9f8c-4e5b-8df1-dd1b7f5401fe'::uuid, 'Preparatoria terminada', 'required'),
  ('f12e4ec3-9f8c-4e5b-8df1-dd1b7f5401fe'::uuid, 'Computadora o laptop para Home Office', 'required'),
  ('f12e4ec3-9f8c-4e5b-8df1-dd1b7f5401fe'::uuid, 'Conexión estable a internet', 'required'),
  ('f12e4ec3-9f8c-4e5b-8df1-dd1b7f5401fe'::uuid, 'Excelente comunicación y atención al cliente', 'required'),
  ('ba1e636d-fd45-47ff-8e56-f479a1068beb'::uuid, 'Capacidad para trabajar en equipo', 'required'),
  ('ba1e636d-fd45-47ff-8e56-f479a1068beb'::uuid, 'Disponibilidad para rolar turnos', 'required'),
  ('ba1e636d-fd45-47ff-8e56-f479a1068beb'::uuid, 'Experiencia en producción deseable', 'nice_to_have'),
  ('ba1e636d-fd45-47ff-8e56-f479a1068beb'::uuid, 'Mayor de edad', 'required'),
  ('ba1e636d-fd45-47ff-8e56-f479a1068beb'::uuid, 'Responsabilidad y puntualidad', 'required'),
  ('ba1e636d-fd45-47ff-8e56-f479a1068beb'::uuid, 'Secundaria terminada deseable', 'nice_to_have')
on conflict (job_id, skill_name) do update
set importance = excluded.importance;

commit;

select
  jobs.id,
  companies.company_name,
  jobs.title,
  jobs.location,
  jobs.work_mode,
  jobs.salary_min,
  jobs.salary_max,
  jobs.status,
  count(skills.id)::integer as requirements
from public.jobs as jobs
join public.company_profiles as companies on companies.id = jobs.company_id
left join public.job_skills as skills on skills.job_id = jobs.id
where jobs.id in (
  '8f288a9a-a25a-4992-b30e-644532acc6bf'::uuid,
  'f12e4ec3-9f8c-4e5b-8df1-dd1b7f5401fe'::uuid,
  'ba1e636d-fd45-47ff-8e56-f479a1068beb'::uuid
)
group by jobs.id, companies.company_name
order by companies.company_name, jobs.title;
