# Activar RedJob con Supabase

## 1. Crear proyecto

Crea un proyecto en Supabase y entra al panel del proyecto.

## 2. Crear tablas y seguridad

Abre el SQL Editor y ejecuta:

```text
outputs/RedJob/supabase-schema.sql
```

Ese archivo crea:

- Perfiles de usuario.
- Perfiles de candidato y empresa.
- Vacantes y habilidades.
- Postulaciones.
- Conversaciones y mensajes.
- Reglas de seguridad.
- Trigger automatico para crear perfil base al registrarse.

## 3. Configurar variables

En la app Next copia:

```text
outputs/RedJob-app/.env.example
```

y crea:

```text
outputs/RedJob-app/.env.local
```

Con estos valores de Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

## 4. Arrancar app real

Desde `outputs/RedJob-app`:

```bash
npm.cmd install
npm.cmd run dev
```

## 5. Probar

En la app:

- Abre Acceso.
- Crea cuenta como candidato o empresa.
- Inicia sesion.
- Revisa que el perfil base exista en Supabase.

## Nota

El prototipo visible en `http://localhost:8062/` sigue siendo la maqueta premium estatica. La app real conectada es `outputs/RedJob-app`.
