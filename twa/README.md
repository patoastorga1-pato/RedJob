# RedJob TWA para Google Play

Esta carpeta documenta la preparacion de RedJob como Trusted Web Activity usando la PWA publica:

- Nombre: RedJob
- Package ID: `mx.com.redjob`
- URL principal: `https://redjob.com.mx/`
- Idioma principal: Espanol (`es-MX`)
- Target SDK: Android 16 / API 36

El proyecto Android TWA esta en `android-twa/`. Usa Android Browser Helper, la misma base oficial que usa Bubblewrap para lanzar una Trusted Web Activity. No guarda claves privadas ni keystores.

## Alternativa con Bubblewrap

Si despues quieres regenerar el proyecto con Bubblewrap CLI, usa la PWA publica:

```powershell
npm i -g @bubblewrap/cli
bubblewrap init --manifest=https://redjob.com.mx/manifest.webmanifest --directory=android-twa
```

Bubblewrap preguntara por valores del proyecto. Usa:

- Package ID: `mx.com.redjob`
- Name: `RedJob`
- Launcher name: `RedJob`
- Start URL: `https://redjob.com.mx/`
- Target SDK: `36`, si lo permite la version instalada

Si Bubblewrap sobrescribe archivos, revisa antes de confirmar cambios en Git.

## 1. Generar clave de firma

Hazlo fuera del repositorio, por ejemplo en una carpeta privada:

```powershell
keytool -genkeypair -v -keystore redjob-upload.jks -alias redjob-upload -keyalg RSA -keysize 2048 -validity 10000
```

No subas `redjob-upload.jks` a GitHub.

## 2. Generar AAB firmado

Abre `android-twa/` en Android Studio. Instala Android SDK Platform 36 si Android Studio lo pide.

Luego:

1. `Build`
2. `Generate Signed App Bundle / APK`
3. `Android App Bundle`
4. Selecciona el keystore `redjob-upload.jks`
5. Alias: `redjob-upload`
6. Build variant: `release`

El resultado sera un `.aab` firmado para Play Console.

## 3. Configurar assetlinks.json

Cuando subas el primer AAB a Play Console y actives Play App Signing, entra a:

`Release > Setup > App signing`

Copia la huella SHA-256 del certificado de firma de la app. Despues crea:

`/.well-known/assetlinks.json`

usando `twa/assetlinks.template.json` y reemplazando el texto de ejemplo por la huella real.

Debe quedar publico en:

`https://redjob.com.mx/.well-known/assetlinks.json`

Debe responder:

- HTTP 200
- `Content-Type: application/json`
- Sin redirecciones

## 4. Subir a Google Play Console

1. Crea la app en Play Console.
2. Nombre: RedJob.
3. Idioma predeterminado: Espanol.
4. Package ID: `mx.com.redjob`.
5. Sube el `.aab` firmado.
6. Completa ficha de tienda, politicas, privacidad, eliminacion de cuenta y Data Safety.
7. Publica primero en prueba cerrada si tu cuenta de Play lo requiere.

## 5. Validaciones recomendadas

Despues de publicar `assetlinks.json`:

```powershell
curl.exe -I https://redjob.com.mx/.well-known/assetlinks.json
```

Tambien valida que la PWA siga funcionando:

- `https://redjob.com.mx/`
- `https://redjob.com.mx/manifest.webmanifest`
- `https://redjob.com.mx/service-worker.js`
