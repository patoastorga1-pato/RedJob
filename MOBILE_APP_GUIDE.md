# RedJob para Play Store y App Store

Esta carpeta ya tiene la base para convertir RedJob en app Android/iOS usando Capacitor.

## Estado actual

- Nombre de app: RedJob
- Identificador nativo: `mx.com.redjob.app`
- Carpeta web para la app: `dist-mobile`
- Sitio publico recomendado: `https://redjob.com.mx`
- Correo de soporte: `redjobmx@gmail.com`
- Politica de privacidad: usar la pagina de Privacidad dentro de RedJob
- Terminos de uso: usar la pagina de Terminos dentro de RedJob

Mantener fijo `mx.com.redjob.app`. Cambiarlo despues puede causar problemas al actualizar la app en tiendas.

## Archivos moviles incluidos

- `package.json`: comandos de preparacion.
- `capacitor.config.json`: nombre, identificador y carpeta web.
- `scripts/prepare-mobile.js`: crea `dist-mobile`.
- `scripts/mobile-check.js`: revisa que no falten piezas importantes.
- `MOBILE_APP_GUIDE.md`: esta guia.

## Antes de crear Android/iOS

Dentro de la carpeta `RedJob`, ejecutar:

```bash
npm install
npm run mobile:check
npm run mobile:prepare
```

`mobile:check` debe terminar sin errores. Si marca que falta `config.js`, crea ese archivo localmente con tus datos de Supabase. No lo subas a GitHub.

## Crear Android

Requisitos:

- Windows o Mac.
- Node.js.
- Android Studio.
- Cuenta de Google Play Console.

Primera vez:

```bash
npm run mobile:add:android
```

Cada vez que actualices RedJob:

```bash
npm run mobile:sync
npm run mobile:open:android
```

En Android Studio:

1. Revisar que la app abra bien.
2. Probar inicio de sesion, perfiles, vacantes, postulaciones, mensajes, CV y logos.
3. Generar archivo de publicacion `.aab`.
4. Subir el `.aab` a Google Play Console.

## Crear iOS

Requisitos:

- Mac.
- Xcode.
- Cuenta Apple Developer.

Primera vez:

```bash
npm run mobile:add:ios
```

Cada vez que actualices RedJob:

```bash
npm run mobile:sync
npm run mobile:open:ios
```

En Xcode:

1. Configurar el equipo de Apple Developer.
2. Revisar que el Bundle Identifier sea `mx.com.redjob.app`.
3. Probar en simulador y, si es posible, en iPhone real.
4. Crear Archive.
5. Subir a App Store Connect.

## Informacion para las tiendas

### Categoria sugerida

- Android: Business o Productivity.
- iOS: Business.

### Descripcion corta sugerida

RedJob conecta candidatos y empresas en Mexico con vacantes, postulaciones y mensajes directos.

### Descripcion completa sugerida

RedJob es una plataforma de empleo para Mexico que ayuda a candidatos y empresas a conectar de forma simple, directa y profesional.

Los candidatos pueden crear su perfil, subir su curriculum, buscar vacantes, guardar oportunidades, postularse y conversar con reclutadores desde la app.

Las empresas pueden crear perfiles, publicar vacantes, recibir postulaciones, revisar candidatos y responder mensajes desde un solo lugar.

RedJob esta disenada para facilitar el reclutamiento con una experiencia limpia, rapida y enfocada en oportunidades reales.

### Palabras clave sugeridas

empleo, vacantes, trabajo, reclutamiento, candidatos, empresas, curriculum, Mexico

### URL legales

- Privacidad: `https://redjob.com.mx` y abrir seccion Privacidad.
- Terminos: `https://redjob.com.mx` y abrir seccion Terminos.
- Soporte: `redjobmx@gmail.com`

Si despues se crean URLs directas como `/privacidad` y `/terminos`, usarlas en las tiendas.

## Declaracion de datos para tiendas

RedJob maneja datos personales, asi que en Play Console y App Store Connect se debe declarar con cuidado:

- Nombre.
- Correo electronico.
- Telefono si el usuario lo agrega.
- Ubicacion laboral o ciudad/estado.
- CV/curriculum.
- Foto o logo si el usuario lo sube.
- Mensajes entre usuarios.
- Informacion de empresas y vacantes.

No declares que la app no recopila datos. RedJob si recopila datos para operar perfiles, postulaciones y mensajes.

## Capturas recomendadas

Preparar capturas de:

1. Inicio / busqueda de vacantes.
2. Detalle de vacante.
3. Perfil candidato.
4. Perfil empresa.
5. Mensajes.
6. Administracion, solo si quieres mostrarla publicamente. Si no, mejor no.

## Archivos que si se pueden subir a GitHub

- `package.json`
- `package-lock.json`, si se genera.
- `capacitor.config.json`
- `scripts/prepare-mobile.js`
- `scripts/mobile-check.js`
- `MOBILE_APP_GUIDE.md`
- Carpetas `android/` e `ios/` cuando se generen, excepto llaves privadas.

## Archivos que NO se deben subir

- `node_modules/`
- `dist-mobile/`
- `config.js`
- `.env`
- `.env.*`
- Archivos `.jks`
- Archivos `.keystore`
- Archivos `.p12`
- Archivos `.mobileprovision`
- `android/key.properties`
- certificados privados de Apple

## Flujo recomendado cada vez que cambie RedJob

1. Actualizar GitHub con la version web.
2. Probar `https://redjob.com.mx`.
3. En la carpeta local ejecutar:

```bash
npm run mobile:check
npm run mobile:sync
```

4. Probar en Android Studio o Xcode.
5. Generar nueva version para tienda.
6. Subir nueva version a Play Console/App Store Connect.

## Pendientes antes de publicar en tiendas

- Crear cuenta Google Play Console.
- Crear cuenta Apple Developer.
- Tener capturas oficiales.
- Tener icono final de app en todos los tamanos requeridos.
- Revisar Politica de Privacidad y Terminos.
- Llenar declaracion de datos en Play Console.
- Llenar App Privacy en App Store Connect.
- Probar login, registro, CV, logos, postulaciones y mensajes en app real.
