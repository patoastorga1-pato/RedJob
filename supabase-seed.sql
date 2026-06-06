-- Optional RedJob demo data.
-- This seed uses fixed ids for app tables only. Auth users still need to exist
-- before inserting matching rows into public.profiles.

-- After creating auth users in Supabase, replace these ids with their auth user ids.
-- Candidate user id: 00000000-0000-0000-0000-000000000001
-- Company user id:   00000000-0000-0000-0000-000000000002

insert into public.profiles (id, email, role)
values
  ('00000000-0000-0000-0000-000000000001', 'candidato@redjob.test', 'candidate'),
  ('00000000-0000-0000-0000-000000000002', 'empresa@redjob.test', 'company')
on conflict (id) do nothing;

insert into public.candidate_profiles (
  id,
  user_id,
  full_name,
  target_role,
  location,
  work_mode,
  salary_min,
  salary_max,
  summary
)
values (
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'Patricio Alvarez',
  'Frontend Developer',
  'CDMX',
  'hybrid',
  38000,
  48000,
  'Frontend developer con experiencia en React, TypeScript y productos SaaS.'
)
on conflict (user_id) do nothing;

insert into public.company_profiles (
  id,
  user_id,
  company_name,
  industry,
  location,
  website,
  description
)
values (
  '20000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  'Nubelia',
  'SaaS',
  'CDMX',
  'https://example.com',
  'Empresa de software para equipos de operaciones y ventas.'
)
on conflict (user_id) do nothing;

insert into public.candidate_skills (candidate_id, skill_name, level)
values
  ('10000000-0000-0000-0000-000000000001', 'React', 'advanced'),
  ('10000000-0000-0000-0000-000000000001', 'TypeScript', 'advanced'),
  ('10000000-0000-0000-0000-000000000001', 'UX', 'intermediate'),
  ('10000000-0000-0000-0000-000000000001', 'APIs', 'intermediate')
on conflict (candidate_id, skill_name) do nothing;

insert into public.jobs (
  id,
  company_id,
  title,
  description,
  location,
  work_mode,
  salary_min,
  salary_max,
  status
)
values
  (
    '30000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    'Frontend Developer',
    'Construir interfaces para una plataforma SaaS con enfoque en rendimiento, accesibilidad y componentes reutilizables.',
    'CDMX',
    'hybrid',
    38000,
    48000,
    'published'
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000001',
    'Analista de Datos Jr.',
    'Preparar reportes operativos y tableros de decision para equipos comerciales y de producto.',
    'Guadalajara',
    'onsite',
    24000,
    31000,
    'published'
  )
on conflict (id) do nothing;

insert into public.job_skills (job_id, skill_name, importance)
values
  ('30000000-0000-0000-0000-000000000001', 'React', 'required'),
  ('30000000-0000-0000-0000-000000000001', 'TypeScript', 'required'),
  ('30000000-0000-0000-0000-000000000001', 'Design Systems', 'important'),
  ('30000000-0000-0000-0000-000000000002', 'SQL', 'required'),
  ('30000000-0000-0000-0000-000000000002', 'Dashboards', 'important')
on conflict (job_id, skill_name) do nothing;

insert into public.applications (
  id,
  job_id,
  candidate_id,
  status,
  match_score,
  cover_note
)
values (
  '40000000-0000-0000-0000-000000000001',
  '30000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'submitted',
  94,
  'Me interesa la vacante porque combina React, TypeScript y producto SaaS.'
)
on conflict (job_id, candidate_id) do nothing;

insert into public.messages (
  conversation_id,
  sender_user_id,
  body
)
select
  conversations.id,
  '00000000-0000-0000-0000-000000000001',
  'Hola, acabo de postularme. Quedo atento a cualquier informacion adicional.'
from public.conversations
where conversations.application_id = '40000000-0000-0000-0000-000000000001'
  and not exists (
    select 1
    from public.messages
    where messages.conversation_id = conversations.id
  );
