# Activar RedJob con Supabase

## 1. Crear proyecto

Crea un proyecto en Supabase y entra al panel del proyecto.

## 2. Crear tablas y seguridad

Abre el SQL Editor y ejecuta completo:

```text
supabase-schema.sql
```

Ese archivo crea:

- Perfiles de usuario.
- Perfiles de candidato y empresa.
- Vacantes y habilidades.
- Postulaciones.
- Conversaciones y mensajes.
- Reportes y funciones de administracion.
- Reglas de seguridad RLS.
- Buckets de Storage para curriculums y logos.
- Trigger automatico para crear perfil base al registrarse.

Para asignar una cuenta administradora, crea primero el usuario y despues usa `supabase-admin-example.sql` reemplazando el UUID de ejemplo por el UUID real del usuario.

## 3. Configurar la app estatica

Copia:

```text
config.example.js
```

y crea:

```text
config.js
```

Con tus valores reales:

```js
window.REDJOB_CONFIG = {
  NEXT_PUBLIC_SUPABASE_URL: "https://TU-PROYECTO.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "TU-ANON-KEY"
};
```

`config.js` esta ignorado por Git para no publicar valores de tu proyecto.

En Netlify, no subas `config.js`. Agrega estas variables en la configuracion del sitio:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

El build ejecuta `scripts/create-config.js` y genera `config.js` automaticamente.

## 4. Probar en local

Desde esta carpeta:

```bash
node local-server.js
```

Luego abre:

```text
http://localhost:8065/
```

## 5. Probar flujo real

- Abre Acceso.
- Crea cuenta como candidato o empresa.
- Inicia sesion.
- Completa un perfil.
- Publica una vacante desde una cuenta de empresa.
- Postulate desde una cuenta de candidato.
- Revisa mensajes y postulaciones.
