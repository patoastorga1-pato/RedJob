# RedJob

RedJob es una plataforma de empleo para Mexico con perfiles de candidatos, perfiles de empresa, vacantes reales, postulaciones, curriculum privado y mensajes entre candidatos y reclutadores.

## Estado actual

La app ya incluye:

- Registro e inicio de sesion con Supabase Auth.
- Header con estado de sesion, botones de acceso y cierre de sesion.
- Busqueda de vacantes por puesto, ubicacion, modalidad y estados de Mexico.
- Perfil de candidato con edad, habilidades, experiencia, vacantes guardadas, postulaciones y curriculum propio.
- Perfil de empresa con soporte para varias empresas por usuario.
- Creacion, edicion y borrado de vacantes por empresa.
- Categorias de vacantes con filtro en busqueda y categoria personalizada.
- Vacantes guardadas persistentes en Supabase.
- Cambio de estado de postulaciones recibidas por empresa.
- Empresas verificadas y soporte interno para vacantes destacadas futuras.
- Postulaciones reales con conversacion automatica.
- Mensajes reales entre candidato y empresa.
- Vista de candidato para empresas, incluyendo informacion del perfil y acceso controlado al curriculum.
- Politicas RLS para separar datos por usuario, candidato, empresa y conversacion.

## Abrir en local

La version actual se esta probando en:

`http://localhost:8062/`

Tambien puede abrirse directamente desde `index.html`, pero para pruebas completas conviene mantener el servidor local.

## Supabase

Antes de usar una base nueva, ejecuta en Supabase SQL Editor:

`supabase-schema.sql`

Ese archivo crea tablas, funciones, politicas de seguridad y el bucket privado `resumes`.

Importante: despues de cambios de seguridad, vuelve a ejecutar `supabase-schema.sql` completo. Las postulaciones, cambios de estado y lectura de mensajes pasan por funciones seguras RPC.

Si agregas categorias de vacantes, tambien debes ejecutar el SQL actualizado para crear la columna `jobs.category`.

Configuracion local usada por la app:

```text
NEXT_PUBLIC_SUPABASE_URL=https://tkfexxkbdkvpwhcqkvwp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_H0QIgf8EpEnl6A086dp-9Q_NddTLvWy
```

En despliegue estatico, estos valores se leen desde `config.js` mediante `window.REDJOB_CONFIG`. Si se cambia de proyecto Supabase, actualiza ese archivo o genera uno durante el despliegue.

## Pruebas recomendadas

1. Crear cuenta de candidato y completar perfil.
2. Subir curriculum y confirmar que solo aparece en ese perfil.
3. Crear cuenta de empresa.
4. Crear una o mas empresas desde el perfil.
5. Publicar una vacante y revisar su vista publica.
6. Postularse desde otro perfil candidato.
7. Confirmar que se crea conversacion.
8. Responder desde el perfil empresa.
9. Editar y borrar una vacante.
10. Cerrar sesion y confirmar que vuelven los botones de acceso.
11. Probar recuperacion de contrasena desde Acceso.

## Archivos utiles

- `index.html`: estructura principal.
- `styles.css`: diseno visual.
- `app.js`: logica de autenticacion, perfiles, vacantes, postulaciones y mensajes.
- `supabase-schema.sql`: base de datos y seguridad.
- `data-model.md`: modelo de datos.
- `supabase-setup.md`: guia corta para activar Supabase.
