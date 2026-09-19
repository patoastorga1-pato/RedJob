-- RedJob recovery - stage 4: publish only jobs with a confirmed owner mapping.
-- Run this only after stage 3 and after reviewing the 13 rows listed below.
-- Six jobs with unknown historical ownership deliberately remain paused.

begin;

with approved_jobs(id) as (
  values
    ('fcba3d1a-96df-4a53-83ef-90f1b0ce10eb'::uuid),
    ('09a24202-0a8e-4d32-9bc9-ab6c2cfc3378'::uuid),
    ('5287f1ba-d046-4ae3-8b8d-ce1a4f6536fe'::uuid),
    ('d87e8965-8046-45fe-b26d-a217bba6813b'::uuid),
    ('c3dac70f-e4c9-4171-b38e-a5f2e23b02ed'::uuid),
    ('55a7a1ec-e4a9-48fb-97e0-dc26eae36e96'::uuid),
    ('462e0b89-1433-4570-a367-5150ae30791b'::uuid),
    ('7f68f8b9-5190-4d25-b69c-c152ab8fe0a0'::uuid),
    ('e5335aa6-4357-4ed8-9eb6-2e4a34586fa9'::uuid),
    ('064aa792-02e8-4b39-ae71-8b692efaa213'::uuid),
    ('308907c6-4dce-4d34-aa50-c33b18d51467'::uuid),
    ('4a189247-f638-40e8-b273-0b6074f6edee'::uuid),
    ('e4267aac-f3df-4774-b243-d5ca1f595497'::uuid)
)
update public.jobs job
set status = 'published', updated_at = now()
from approved_jobs approved
where job.id = approved.id
  and job.status = 'paused'
  and not exists (
    select 1
    from public.jobs duplicate
    where duplicate.id <> job.id
      and duplicate.company_id = job.company_id
      and lower(trim(duplicate.title)) = lower(trim(job.title))
      and lower(trim(coalesce(duplicate.location, ''))) = lower(trim(coalesce(job.location, '')))
      and duplicate.status = 'published'
  );

commit;

select
  job.id,
  company.company_name,
  job.title,
  job.location,
  job.status
from public.jobs job
join public.company_profiles company on company.id = job.company_id
where job.id in (
  'fcba3d1a-96df-4a53-83ef-90f1b0ce10eb'::uuid,
  '09a24202-0a8e-4d32-9bc9-ab6c2cfc3378'::uuid,
  '5287f1ba-d046-4ae3-8b8d-ce1a4f6536fe'::uuid,
  'd87e8965-8046-45fe-b26d-a217bba6813b'::uuid,
  'c3dac70f-e4c9-4171-b38e-a5f2e23b02ed'::uuid,
  '55a7a1ec-e4a9-48fb-97e0-dc26eae36e96'::uuid,
  '462e0b89-1433-4570-a367-5150ae30791b'::uuid,
  '7f68f8b9-5190-4d25-b69c-c152ab8fe0a0'::uuid,
  'e5335aa6-4357-4ed8-9eb6-2e4a34586fa9'::uuid,
  '064aa792-02e8-4b39-ae71-8b692efaa213'::uuid,
  '308907c6-4dce-4d34-aa50-c33b18d51467'::uuid,
  '4a189247-f638-40e8-b273-0b6074f6edee'::uuid,
  'e4267aac-f3df-4774-b243-d5ca1f595497'::uuid
)
order by job.status, company.company_name, job.title;

-- These six jobs remain paused because their historical owner account could not
-- be identified with certainty: Sam´s Club, Walmart, Centro Comercial Galerías
-- Zacatecas, both Bazvic jobs, and MATERIALES Y PROCEDIMIENTOS DE MEXICO.
