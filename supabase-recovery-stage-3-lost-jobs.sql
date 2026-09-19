-- RedJob recovery - stage 3: reconstruct the 19 deleted jobs found in historical evidence.
-- Reviewable and idempotent. All restored jobs start PAUSED and are not indexed.
-- Run stage 4 only after checking the restored records in RedJob.

begin;

do $$
declare
  missing_company text;
begin
  if not exists (
    select 1 from public.profiles
    where id = '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid
  ) then
    raise exception 'No existe el perfil de recuperación. No se hizo ningún cambio.';
  end if;

  select required.name into missing_company
  from (values
    ('845b6af3-eb9d-4771-87c2-0e027fe70892'::uuid, 'Bachoco'),
    ('090bf3ec-2335-43b7-bc45-6e850901e2a4'::uuid, 'TajOH! Burger'),
    ('d1b0d91f-ba42-4a23-a038-27a4e75dede3'::uuid, 'SERCO'),
    ('2c40c630-99a2-4665-8a42-cae1b7197e6c'::uuid, 'Arrendadora BRODY'),
    ('b2799d51-ce8d-48d2-adfa-3c7acf0ff757'::uuid, 'TRIPLE C'),
    ('ba448a2e-15e6-490b-8925-f1ef607046ed'::uuid, 'EscaGas'),
    ('ce8cbda8-2ade-4cd3-bd9b-dffd31a2416d'::uuid, 'Don culichi Taqueria')
  ) as required(id, name)
  where not exists (
    select 1 from public.company_profiles company where company.id = required.id
  )
  limit 1;

  if missing_company is not null then
    raise exception 'Falta la empresa requerida: %. No se hizo ningún cambio.', missing_company;
  end if;
end $$;

-- Repair only historical public names that were replaced by Auth display names
-- during the earlier account reconstruction.
update public.company_profiles
set company_name = 'SERCO Seguridad Privada y Confiabilidad', updated_at = now()
where id = 'd1b0d91f-ba42-4a23-a038-27a4e75dede3'::uuid
  and lower(trim(company_name)) in (
    lower('SERCO'),
    lower('SERCO Seguridad Privada y Confiabilidad')
  );

update public.company_profiles
set company_name = 'EscaGas', updated_at = now()
where id = 'ba448a2e-15e6-490b-8925-f1ef607046ed'::uuid
  and lower(trim(company_name)) in (lower('Briseida Hernández'), lower('EscaGas'));

update public.company_profiles
set company_name = 'Don culichi Taqueria', updated_at = now()
where id = 'ce8cbda8-2ade-4cd3-bd9b-dffd31a2416d'::uuid
  and lower(trim(company_name)) in (
    lower('Don culichi taqueria'),
    lower('Don culichi Taqueria')
  );

-- Missing company profiles. The five profiles whose historical owner is still
-- unknown are kept under the recovery owner only while their jobs remain paused.
insert into public.company_profiles (
  id, user_id, company_name, plan, plan_status, is_verified
)
select recovered.id, recovered.user_id, recovered.company_name, 'free', 'beta', false
from (values
  ('ea4d4a56-8f81-4e36-937a-2d7b6e18d937'::uuid, '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid, 'IEC EMPAQUES'),
  ('2988bdaa-04b3-48ae-aee6-3e192d554b8e'::uuid, '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid, 'Plaza de la tecnologia'),
  ('4bbf8ad0-d88c-49a1-961a-c02317125e41'::uuid, '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid, 'Scorpion Autoservicio al Mayoreo'),
  ('8435eaef-4f80-4c19-ba38-112d3b0ba51d'::uuid, '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid, 'IZZI'),
  ('da8fe635-32e3-4629-a09e-a8587f5b9d1d'::uuid, '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid, 'J-Rox Security'),
  ('922ad84d-6528-4473-af06-79228d179d4e'::uuid, '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid, 'Sam´s Club'),
  ('b766a1c8-3c11-4287-bd79-23b1ca5caed4'::uuid, '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid, 'Walmart'),
  ('e23c2599-8f9b-4f9b-bdb6-1247a7e5f7ce'::uuid, '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid, 'Centro Comercial Galerías Zacatecas'),
  ('923cf6c1-9c73-46e8-a7dc-810734997d50'::uuid, '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid, 'Bazvic S.A. de C.V.'),
  ('a127cd91-074b-462b-97b8-22b99858940a'::uuid, '4adc1b74-9d98-44c2-8813-b97750b72ab1'::uuid, 'MATERIALES Y PROCEDIMIENTOS DE MEXICO')
) as recovered(id, user_id, company_name)
where not exists (
  select 1 from public.company_profiles current_company
  where lower(trim(current_company.company_name)) = lower(trim(recovered.company_name))
)
on conflict (id) do nothing;

-- Descriptions below are deliberately concise reconstructions. They use only
-- facts visible in the historical RedJob listing and do not invent benefits,
-- schedules, expiration dates or requirements.
insert into public.jobs (
  id, company_id, title, description, location, work_mode, category,
  salary_min, salary_max, is_featured, featured_priority, status
)
select
  recovered.id,
  company.id,
  recovered.title,
  recovered.description,
  recovered.location,
  recovered.work_mode,
  recovered.category,
  recovered.salary_min,
  recovered.salary_max,
  false,
  0,
  'paused'
from (values
  ('fcba3d1a-96df-4a53-83ef-90f1b0ce10eb'::uuid, 'IEC EMPAQUES', 'Ayudante de empaques', 'Vacante presencial de ayudante de empaques para IEC EMPAQUES en Monterrey, Nuevo León. Se requiere experiencia mínima de 6 meses, primaria terminada y edad de 18 a 50 años.', 'Monterrey, Nuevo León', 'onsite', 'Tecnología', 9500, 14000),
  ('09a24202-0a8e-4d32-9bc9-ab6c2cfc3378'::uuid, 'Plaza de la tecnologia', 'Personal de limpieza', 'Vacante presencial de personal de limpieza para Plaza de la tecnologia en Guadalajara, Jalisco. Dirigida a hombres y mujeres de 20 a 50 años, con escolaridad mínima de primaria y disponibilidad de horario.', 'Guadalajara, Jalisco', 'onsite', 'Otra', null, null),
  ('5287f1ba-d046-4ae3-8b8d-ce1a4f6536fe'::uuid, 'Scorpion Autoservicio al Mayoreo', 'Vendedor(a) de Mostrador', 'Vacante presencial de vendedor o vendedora de mostrador para Scorpion Autoservicio al Mayoreo en Tlalnepantla de Baz. Requiere atención al cliente, manejo de transacciones y gusto por las ventas.', 'Tlalnepantla de Baz, Estado de México', 'onsite', 'Atención al Cliente', 9600, 12500),
  ('d87e8965-8046-45fe-b26d-a217bba6813b'::uuid, 'IZZI', 'Vendedor(a) de Campo y Módulo', 'Vacante presencial de ventas de campo y módulo para IZZI en Guadalajara, Jalisco. Requiere mayoría de edad, gusto por las ventas y atención al cliente, y facilidad de palabra.', 'Guadalajara, Jalisco', 'onsite', 'Operaciones', 9583, 12400),
  ('c3dac70f-e4c9-4171-b38e-a5f2e23b02ed'::uuid, 'Bachoco', 'Operador(a) de Producción', 'Vacante presencial de operador u operadora de producción para Bachoco en Ciénega de Flores, Nuevo León. Requiere capacidad para trabajar en equipo y disponibilidad para rolar turnos; la experiencia no es indispensable.', 'Ciénega de Flores, Nuevo León', 'onsite', 'Operaciones', 14000, 18000),
  ('55a7a1ec-e4a9-48fb-97e0-dc26eae36e96'::uuid, 'J-Rox Security', 'Guardia de seguridad', 'Vacante presencial de guardia de seguridad para J-Rox Security en Guadalajara, Jalisco. Requiere mayoría de edad; secundaria y experiencia en seguridad privada son deseables.', 'Guadalajara, Jalisco', 'onsite', 'Seguridad', 12600, 16400),
  ('462e0b89-1433-4570-a367-5150ae30791b'::uuid, 'TajOH! Burger', 'Mesero', 'Vacante presencial de mesero para TajOH! Burger en Tlajomulco, Jalisco. Requiere buena actitud y trato amable, capacidad para trabajar bajo presión y disponibilidad por las tardes y noches.', 'Tlajomulco, Jalisco', 'onsite', 'Alimentos y Bebidas', 9000, 12500),
  ('90cb89bd-137d-4b7f-bbd0-b4cc11c9dbf3'::uuid, 'Sam´s Club', 'Colaborador de tienda', 'Vacante presencial de colaborador de tienda para Sam´s Club en Tuxtla Gutiérrez, Chiapas. Requiere mayoría de edad, disponibilidad de horario y actitud de servicio.', 'Tuxtla Gutiérrez, Chiapas', 'onsite', 'Ventas', 9200, 12000),
  ('3c7f7fba-3c07-4249-9b75-1f964f9b9702'::uuid, 'Walmart', 'Colaborador de Tienda', 'Vacante presencial de colaborador de tienda para Walmart en Tuxtla Gutiérrez, Chiapas. Requiere mayoría de edad, disponibilidad de horario y actitud de servicio.', 'Tuxtla Gutiérrez, Chiapas', 'onsite', 'Atención al Cliente', 9000, 12000),
  ('ae97e797-f089-44f6-b581-42aae4af57a4'::uuid, 'Centro Comercial Galerías Zacatecas', 'Colaborador de Tienda', 'Vacante presencial de colaborador de tienda para Centro Comercial Galerías Zacatecas. Requiere disponibilidad de horario, actitud de servicio, responsabilidad y puntualidad.', 'Zacatecas, Zacatecas', 'onsite', 'Atención al Cliente', 10000, 14000),
  ('7f68f8b9-5190-4d25-b69c-c152ab8fe0a0'::uuid, 'SERCO Seguridad Privada y Confiabilidad', 'Guardia de seguridad', 'Vacante presencial de guardia de seguridad para SERCO en Veracruz. Dirigida a hombres y mujeres con bachillerato terminado y experiencia como guardia de seguridad.', 'Veracruz, Veracruz', 'onsite', 'Guardia de seguridad', 12000, 12000),
  ('e5335aa6-4357-4ed8-9eb6-2e4a34586fa9'::uuid, 'Arrendadora BRODY', 'Asesor de ventas de seguros.', 'Vacante presencial de asesoría de ventas de seguros para Arrendadora BRODY en Cuajimalpa de Morelos. Requiere bachillerato concluido o licenciatura trunca o concluida en áreas económico-administrativas y experiencia mínima de dos años en ventas.', 'Cuajimalpa de Morelos, Ciudad de México', 'onsite', 'Ventas', 11000, 11000),
  ('064aa792-02e8-4b39-ae71-8b692efaa213'::uuid, 'TRIPLE C', 'RECEPCIONISTA PARA CONTROL DE ACCESOS', 'Vacante presencial de recepción para control de accesos para TRIPLE C en Miguel Hidalgo. Requiere secundaria terminada, de preferencia preparatoria trunca o concluida, y experiencia como guardia de seguridad.', 'Miguel Hidalgo, Ciudad de México', 'onsite', 'Operaciones', 11500, 12000),
  ('308907c6-4dce-4d34-aa50-c33b18d51467'::uuid, 'TRIPLE C', 'JEFE DE TURNO', 'Vacante presencial de jefe de turno para TRIPLE C en Miguel Hidalgo, Ciudad de México.', 'Miguel Hidalgo, Ciudad de México', 'onsite', 'Operaciones', 13500, 14000),
  ('7bd76075-2768-4896-add4-c57fe2a22070'::uuid, 'Bazvic S.A. de C.V.', 'Guardia de seguridad', 'Vacante presencial de guardia de seguridad para Bazvic en Puebla. Requiere tener 18 años o más y facilidad de traslado.', 'Puebla, Puebla', 'onsite', 'Seguridad', 9450, 11000),
  ('8db82f7c-b766-4505-9987-753aa3470a04'::uuid, 'Bazvic S.A. de C.V.', 'Personal de limpieza', 'Vacante presencial de personal de limpieza para Bazvic en Puebla. El anuncio recuperado indicaba sexo femenino y rango de edad de 30 a 45 años.', 'Puebla, Puebla', 'onsite', 'Limpieza', 9450, 10000),
  ('4a189247-f638-40e8-b273-0b6074f6edee'::uuid, 'EscaGas', 'Auxiliar general', 'Vacante presencial de auxiliar general para EscaGas en Chihuahua. Las actividades recuperadas incluyen carga y descarga de mercancía y apoyo en almacén.', 'Chihuahua, Chihuahua', 'onsite', 'Operaciones', 10000, 10500),
  ('9b80415b-961a-4bb9-9861-61bfa97d9b40'::uuid, 'MATERIALES Y PROCEDIMIENTOS DE MEXICO', 'Auxiliar de Recolección', 'Vacante presencial de auxiliar de recolección para MATERIALES Y PROCEDIMIENTOS DE MEXICO en Álvaro Obregón, Ciudad de México.', 'Álvaro Obregón, Ciudad de México', 'onsite', 'Operaciones', 9150, 9151),
  ('e4267aac-f3df-4774-b243-d5ca1f595497'::uuid, 'Don culichi Taqueria', 'Mesero', 'Vacante presencial de mesero para Don culichi Taqueria en Durango. Requiere excelente atención al cliente; los salarios y demás detalles se informan con cita previa.', 'Durango, Durango', 'onsite', 'Mesero', null, null)
) as recovered(id, company_name, title, description, location, work_mode, category, salary_min, salary_max)
join lateral (
  select current_company.id
  from public.company_profiles current_company
  where lower(trim(current_company.company_name)) = lower(trim(recovered.company_name))
  order by current_company.created_at, current_company.id
  limit 1
) company on true
on conflict (id) do nothing;

insert into public.job_skills (job_id, skill_name, importance)
select recovered.job_id, recovered.skill_name, recovered.importance
from (values
  ('fcba3d1a-96df-4a53-83ef-90f1b0ce10eb'::uuid, 'Experiencia minima de 6 meses', 'required'),
  ('fcba3d1a-96df-4a53-83ef-90f1b0ce10eb'::uuid, 'Primaria terminada', 'required'),
  ('fcba3d1a-96df-4a53-83ef-90f1b0ce10eb'::uuid, '18 a 50 años', 'required'),
  ('09a24202-0a8e-4d32-9bc9-ab6c2cfc3378'::uuid, 'Hombres y mujeres', 'required'),
  ('09a24202-0a8e-4d32-9bc9-ab6c2cfc3378'::uuid, 'Edad de 20 a 50 años', 'required'),
  ('09a24202-0a8e-4d32-9bc9-ab6c2cfc3378'::uuid, 'Escolaridad mínima: Primaria', 'required'),
  ('09a24202-0a8e-4d32-9bc9-ab6c2cfc3378'::uuid, 'Disponibilidad de horario', 'required'),
  ('5287f1ba-d046-4ae3-8b8d-ce1a4f6536fe'::uuid, 'Atención al cliente', 'required'),
  ('5287f1ba-d046-4ae3-8b8d-ce1a4f6536fe'::uuid, 'Manejo de transacciones', 'required'),
  ('5287f1ba-d046-4ae3-8b8d-ce1a4f6536fe'::uuid, 'Gusto por las ventas', 'required'),
  ('d87e8965-8046-45fe-b26d-a217bba6813b'::uuid, 'Mayor de edad', 'required'),
  ('d87e8965-8046-45fe-b26d-a217bba6813b'::uuid, 'Gusto por las ventas y atención al cliente', 'required'),
  ('d87e8965-8046-45fe-b26d-a217bba6813b'::uuid, 'Facilidad de palabra', 'required'),
  ('c3dac70f-e4c9-4171-b38e-a5f2e23b02ed'::uuid, 'Capacidad para trabajar en equipo', 'required'),
  ('c3dac70f-e4c9-4171-b38e-a5f2e23b02ed'::uuid, 'Disponibilidad para rolar turnos', 'required'),
  ('c3dac70f-e4c9-4171-b38e-a5f2e23b02ed'::uuid, 'Experiencia no indispensable', 'nice_to_have'),
  ('55a7a1ec-e4a9-48fb-97e0-dc26eae36e96'::uuid, 'Mayor de edad', 'required'),
  ('55a7a1ec-e4a9-48fb-97e0-dc26eae36e96'::uuid, 'Escolaridad mínima secundaria (deseable)', 'nice_to_have'),
  ('55a7a1ec-e4a9-48fb-97e0-dc26eae36e96'::uuid, 'Experiencia en seguridad privada (deseable)', 'nice_to_have'),
  ('462e0b89-1433-4570-a367-5150ae30791b'::uuid, 'Buena actitud y trato amable', 'required'),
  ('462e0b89-1433-4570-a367-5150ae30791b'::uuid, 'Capacidad para trabajar bajo presión en horas de alta demanda', 'required'),
  ('462e0b89-1433-4570-a367-5150ae30791b'::uuid, 'Disponibilidad para trabajar por las tardes y noches', 'required'),
  ('90cb89bd-137d-4b7f-bbd0-b4cc11c9dbf3'::uuid, 'Mayor de edad', 'required'),
  ('90cb89bd-137d-4b7f-bbd0-b4cc11c9dbf3'::uuid, 'Disponibilidad de horario', 'required'),
  ('90cb89bd-137d-4b7f-bbd0-b4cc11c9dbf3'::uuid, 'Actitud de servicio', 'required'),
  ('3c7f7fba-3c07-4249-9b75-1f964f9b9702'::uuid, 'Mayor de edad', 'required'),
  ('3c7f7fba-3c07-4249-9b75-1f964f9b9702'::uuid, 'Disponibilidad de horario', 'required'),
  ('3c7f7fba-3c07-4249-9b75-1f964f9b9702'::uuid, 'Actitud de servicio', 'required'),
  ('ae97e797-f089-44f6-b581-42aae4af57a4'::uuid, 'Disponibilidad de horario', 'required'),
  ('ae97e797-f089-44f6-b581-42aae4af57a4'::uuid, 'Actitud de servicio', 'required'),
  ('ae97e797-f089-44f6-b581-42aae4af57a4'::uuid, 'Responsable y puntual', 'required'),
  ('7f68f8b9-5190-4d25-b69c-c152ab8fe0a0'::uuid, 'Hombres y mujeres', 'required'),
  ('7f68f8b9-5190-4d25-b69c-c152ab8fe0a0'::uuid, 'Bachillerato terminado', 'required'),
  ('7f68f8b9-5190-4d25-b69c-c152ab8fe0a0'::uuid, 'Experiencia como guardia de seguridad', 'required'),
  ('e5335aa6-4357-4ed8-9eb6-2e4a34586fa9'::uuid, 'Bachillerato concluido o licenciatura trunca o concluida en áreas económico-administrativas', 'required'),
  ('e5335aa6-4357-4ed8-9eb6-2e4a34586fa9'::uuid, 'Experiencia mínima de 2 años en ventas (preferentemente call center)', 'required'),
  ('064aa792-02e8-4b39-ae71-8b692efaa213'::uuid, 'Secundaria terminada (preferente preparatoria trunca o concluida)', 'required'),
  ('064aa792-02e8-4b39-ae71-8b692efaa213'::uuid, 'Experiencia como Guardia de Seguridad', 'required'),
  ('7bd76075-2768-4896-add4-c57fe2a22070'::uuid, '18 años en adelante', 'required'),
  ('7bd76075-2768-4896-add4-c57fe2a22070'::uuid, 'Facilidad de traslado', 'required'),
  ('8db82f7c-b766-4505-9987-753aa3470a04'::uuid, 'Sexo: femenino', 'required'),
  ('8db82f7c-b766-4505-9987-753aa3470a04'::uuid, 'Rango de edad: 30 - 45 años', 'required'),
  ('4a189247-f638-40e8-b273-0b6074f6edee'::uuid, 'Carga y descarga de mercancía', 'required'),
  ('4a189247-f638-40e8-b273-0b6074f6edee'::uuid, 'Apoyo en almacén', 'required'),
  ('e4267aac-f3df-4774-b243-d5ca1f595497'::uuid, 'Excelente atención al cliente', 'required'),
  ('e4267aac-f3df-4774-b243-d5ca1f595497'::uuid, 'Salarios y demás con cita previa', 'important')
) as recovered(job_id, skill_name, importance)
where exists (select 1 from public.jobs job where job.id = recovered.job_id)
on conflict (job_id, skill_name) do update
set importance = excluded.importance;

commit;

select
  job.id,
  company.company_name,
  job.title,
  job.location,
  job.salary_min,
  job.salary_max,
  job.status,
  count(skill.id)::integer as recovered_requirements
from public.jobs job
join public.company_profiles company on company.id = job.company_id
left join public.job_skills skill on skill.job_id = job.id
where job.id in (
  'fcba3d1a-96df-4a53-83ef-90f1b0ce10eb'::uuid,
  '09a24202-0a8e-4d32-9bc9-ab6c2cfc3378'::uuid,
  '5287f1ba-d046-4ae3-8b8d-ce1a4f6536fe'::uuid,
  'd87e8965-8046-45fe-b26d-a217bba6813b'::uuid,
  'c3dac70f-e4c9-4171-b38e-a5f2e23b02ed'::uuid,
  '55a7a1ec-e4a9-48fb-97e0-dc26eae36e96'::uuid,
  '462e0b89-1433-4570-a367-5150ae30791b'::uuid,
  '90cb89bd-137d-4b7f-bbd0-b4cc11c9dbf3'::uuid,
  '3c7f7fba-3c07-4249-9b75-1f964f9b9702'::uuid,
  'ae97e797-f089-44f6-b581-42aae4af57a4'::uuid,
  '7f68f8b9-5190-4d25-b69c-c152ab8fe0a0'::uuid,
  'e5335aa6-4357-4ed8-9eb6-2e4a34586fa9'::uuid,
  '064aa792-02e8-4b39-ae71-8b692efaa213'::uuid,
  '308907c6-4dce-4d34-aa50-c33b18d51467'::uuid,
  '7bd76075-2768-4896-add4-c57fe2a22070'::uuid,
  '8db82f7c-b766-4505-9987-753aa3470a04'::uuid,
  '4a189247-f638-40e8-b273-0b6074f6edee'::uuid,
  '9b80415b-961a-4bb9-9861-61bfa97d9b40'::uuid,
  'e4267aac-f3df-4774-b243-d5ca1f595497'::uuid
)
group by job.id, company.company_name
order by company.company_name, job.title;
