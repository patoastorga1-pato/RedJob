# Modelo de datos de RedJob

Este documento define la base del MVP para que RedJob pueda crecer de prototipo visual a producto real.

## Roles

RedJob tendra dos tipos principales de cuenta:

- `candidate`: persona que busca empleo y se postula a vacantes.
- `company`: empresa o reclutador que publica vacantes y conversa con candidatos.

## Entidades principales

### users

Cuenta base para iniciar sesion.

| Campo | Tipo | Notas |
| --- | --- | --- |
| id | uuid | Identificador unico del usuario. |
| email | text | Correo de acceso. |
| role | text | `candidate` o `company`. |
| created_at | timestamp | Fecha de registro. |

### candidate_profiles

Perfil laboral del candidato.

| Campo | Tipo | Notas |
| --- | --- | --- |
| id | uuid | Identificador unico del perfil. |
| user_id | uuid | Relacion con `users.id`. |
| full_name | text | Nombre completo. |
| target_role | text | Puesto objetivo. |
| location | text | Ciudad o zona principal. |
| work_mode | text | `remote`, `hybrid` o `onsite`. |
| salary_min | integer | Expectativa minima mensual. |
| salary_max | integer | Expectativa maxima mensual. |
| summary | text | Resumen profesional. |
| created_at | timestamp | Fecha de creacion. |
| updated_at | timestamp | Fecha de ultima edicion. |

### candidate_skills

Habilidades del candidato.

| Campo | Tipo | Notas |
| --- | --- | --- |
| id | uuid | Identificador unico. |
| candidate_id | uuid | Relacion con `candidate_profiles.id`. |
| skill_name | text | Ej. React, Ventas, SQL. |
| level | text | `basic`, `intermediate`, `advanced`. |

### company_profiles

Perfil de empresa o reclutador.

| Campo | Tipo | Notas |
| --- | --- | --- |
| id | uuid | Identificador unico de empresa. |
| user_id | uuid | Relacion con `users.id`. |
| company_name | text | Nombre comercial. |
| industry | text | Giro de la empresa. |
| location | text | Ciudad base. |
| website | text | Sitio web opcional. |
| description | text | Descripcion publica. |
| created_at | timestamp | Fecha de creacion. |
| updated_at | timestamp | Fecha de ultima edicion. |

### jobs

Vacantes publicadas por empresas.

| Campo | Tipo | Notas |
| --- | --- | --- |
| id | uuid | Identificador unico de vacante. |
| company_id | uuid | Relacion con `company_profiles.id`. |
| title | text | Nombre del puesto. |
| description | text | Descripcion de responsabilidades. |
| location | text | Ciudad o zona. |
| work_mode | text | `remote`, `hybrid` o `onsite`. |
| salary_min | integer | Rango minimo mensual. |
| salary_max | integer | Rango maximo mensual. |
| status | text | `draft`, `published`, `paused`, `closed`. |
| created_at | timestamp | Fecha de publicacion. |
| updated_at | timestamp | Fecha de ultima edicion. |

### job_skills

Habilidades requeridas por vacante.

| Campo | Tipo | Notas |
| --- | --- | --- |
| id | uuid | Identificador unico. |
| job_id | uuid | Relacion con `jobs.id`. |
| skill_name | text | Ej. React, Atencion al cliente, SQL. |
| importance | text | `nice_to_have`, `important`, `required`. |

### applications

Postulaciones de candidatos a vacantes.

| Campo | Tipo | Notas |
| --- | --- | --- |
| id | uuid | Identificador unico de postulacion. |
| job_id | uuid | Relacion con `jobs.id`. |
| candidate_id | uuid | Relacion con `candidate_profiles.id`. |
| status | text | `submitted`, `reviewing`, `interview`, `rejected`, `hired`. |
| match_score | integer | Compatibilidad calculada de 0 a 100. |
| cover_note | text | Mensaje inicial opcional del candidato. |
| created_at | timestamp | Fecha de postulacion. |
| updated_at | timestamp | Fecha de ultimo cambio. |

## Mensajes

La mensajeria debe estar ligada a una postulacion. Asi evitamos conversaciones sueltas y mantenemos contexto claro: candidato, empresa y vacante.

### conversations

Canal de comunicacion entre una empresa y un candidato por una postulacion especifica.

| Campo | Tipo | Notas |
| --- | --- | --- |
| id | uuid | Identificador unico de conversacion. |
| application_id | uuid | Relacion con `applications.id`. |
| candidate_id | uuid | Relacion con `candidate_profiles.id`. |
| company_id | uuid | Relacion con `company_profiles.id`. |
| job_id | uuid | Relacion con `jobs.id`. |
| status | text | `open`, `archived`, `blocked`. |
| last_message_at | timestamp | Para ordenar inbox. |
| created_at | timestamp | Fecha de creacion. |

### messages

Mensajes enviados dentro de una conversacion.

| Campo | Tipo | Notas |
| --- | --- | --- |
| id | uuid | Identificador unico del mensaje. |
| conversation_id | uuid | Relacion con `conversations.id`. |
| sender_user_id | uuid | Usuario que envia el mensaje. |
| body | text | Contenido del mensaje. |
| read_at | timestamp | Nulo si no ha sido leido. |
| created_at | timestamp | Fecha de envio. |

## Reglas de producto

- Un candidato solo puede postularse una vez a la misma vacante.
- Una conversacion se crea cuando existe una postulacion.
- Solo el candidato dueno de la postulacion y la empresa duena de la vacante pueden ver sus mensajes.
- Una empresa puede cambiar el estado de una postulacion.
- El candidato puede retirar una postulacion, pero no borrar el historial de mensajes.
- El primer matching puede calcularse comparando habilidades, modalidad, ubicacion y salario.

## Matching inicial

El MVP puede calcular compatibilidad con una formula simple:

| Criterio | Peso |
| --- | --- |
| Habilidades requeridas coincidentes | 50% |
| Modalidad compatible | 20% |
| Rango salarial compatible | 20% |
| Ubicacion compatible | 10% |

Resultado esperado: `match_score` de 0 a 100 guardado en `applications` y mostrado en las tarjetas de vacante.

## Siguiente implementacion

Cuando migremos a Supabase, este modelo se convierte en:

- Tablas SQL.
- Relaciones con llaves foraneas.
- Reglas de seguridad por usuario.
- Datos de prueba para vacantes, candidatos, postulaciones y mensajes.
