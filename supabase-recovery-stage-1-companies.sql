-- RedJob recovery - stage 1: companies proven by surviving Storage paths.
-- Safe and idempotent: inserts or repairs only the three original company IDs below.
-- Does not delete data, create jobs, change Auth users, or restore paid plans.

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
end $$;

insert into public.company_profiles (
  id,
  user_id,
  company_name,
  description,
  plan,
  plan_status,
  is_verified,
  logo_path,
  logo_name,
  created_at,
  updated_at
)
values
  (
    '090bf3ec-2335-43b7-bc45-6e850901e2a4'::uuid,
    '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid,
    'TajOH! Burger',
    null,
    'free',
    'beta',
    false,
    '4adc1b74-9d98-44c2-8813-b97750b72ab1/090bf3ec-2335-43b7-bc45-6e850901e2a4/1781981825482-WhatsApp_Image_2025-06-18_at_2.57.24_PM.jpeg',
    'WhatsApp_Image_2025-06-18_at_2.57.24_PM.jpeg',
    '2026-06-19 20:17:56.225418+00'::timestamptz,
    '2026-06-20 18:57:05.413149+00'::timestamptz
  ),
  (
    '845b6af3-eb9d-4771-87c2-0e027fe70892'::uuid,
    '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid,
    'Bachoco',
    null,
    'free',
    'beta',
    false,
    '4adc1b74-9d98-44c2-8813-b97750b72ab1/845b6af3-eb9d-4771-87c2-0e027fe70892/1781934252851-Bachoco_logo_cuadrado.png',
    'Bachoco_logo_cuadrado.png',
    '2026-06-20 05:44:14.986016+00'::timestamptz,
    '2026-06-20 05:44:14.986016+00'::timestamptz
  ),
  (
    '24dcfc84-4a45-402d-b985-afec0fcb7d4b'::uuid,
    '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid,
    'Language Line Solutions',
    'LanguageLine Solutions es una empresa internacional lider en servicios de interpretacion y traduccion, que ayuda a personas y organizaciones a comunicarse en diferentes idiomas a traves de interpretes profesionales.',
    'free',
    'beta',
    false,
    '4adc1b74-9d98-44c2-8813-b97750b72ab1/24dcfc84-4a45-402d-b985-afec0fcb7d4b/1781926814407-logo_lls.webp',
    'logo_lls.webp',
    '2026-06-19 17:33:57.322533+00'::timestamptz,
    '2026-06-20 03:40:16.402339+00'::timestamptz
  )
on conflict (id) do update
set
  user_id = excluded.user_id,
  company_name = excluded.company_name,
  description = coalesce(nullif(public.company_profiles.description, ''), excluded.description),
  logo_path = excluded.logo_path,
  logo_name = excluded.logo_name,
  created_at = least(public.company_profiles.created_at, excluded.created_at),
  updated_at = greatest(public.company_profiles.updated_at, excluded.updated_at);

commit;

select
  companies.id,
  companies.user_id,
  companies.company_name,
  companies.plan,
  companies.plan_status,
  companies.logo_name,
  companies.logo_path
from public.company_profiles as companies
where companies.id in (
  '090bf3ec-2335-43b7-bc45-6e850901e2a4'::uuid,
  '845b6af3-eb9d-4771-87c2-0e027fe70892'::uuid,
  '24dcfc84-4a45-402d-b985-afec0fcb7d4b'::uuid
)
order by companies.company_name;
