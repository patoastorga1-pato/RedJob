# RedJob como app Android/iOS

Esta carpeta ya queda preparada para convertir RedJob en app instalable para Play Store y App Store usando Capacitor.

## Que se agrego

- `package.json`: comandos para preparar y sincronizar la app movil.
- `capacitor.config.json`: configuracion de nombre, identificador y carpeta web.
- `scripts/prepare-mobile.js`: crea `dist-mobile` con solo los archivos necesarios para la app.

El identificador inicial de la app es:

```text
mx.com.redjob.app
```

Conviene mantenerlo fijo porque despues sera el identificador usado por Android y iOS.

## Requisitos en tu computadora

Para Android:

1. Instalar Node.js.
2. Instalar Android Studio.
3. Crear una cuenta en Google Play Console.

Para iPhone/App Store:

1. Tener una Mac.
2. Instalar Xcode.
3. Crear una cuenta de Apple Developer.

## Preparar el proyecto

Abre terminal dentro de la carpeta `RedJob` y ejecuta:

```bash
npm install
```

Despues prepara los archivos moviles:

```bash
npm run mobile:prepare
```

Esto crea la carpeta `dist-mobile`.

## Crear app Android

Solo la primera vez:

```bash
npm run mobile:add:android
```

Cuando hagas cambios en RedJob:

```bash
npm run mobile:sync
```

Para abrir Android Studio:

```bash
npm run mobile:open:android
```

Desde Android Studio se genera el archivo `.aab` para subirlo a Play Store.

## Crear app iOS

Esto requiere Mac.

Solo la primera vez:

```bash
npm run mobile:add:ios
```

Cuando hagas cambios en RedJob:

```bash
npm run mobile:sync
```

Para abrir Xcode:

```bash
npm run mobile:open:ios
```

Desde Xcode se sube la app a App Store Connect.

## Importante sobre config.js

La app movil necesita `config.js` con:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Si `config.js` existe en tu computadora, `mobile:prepare` lo copia a `dist-mobile`.

No subas `config.js` a GitHub si contiene tus valores reales. Para la app movil, basta con que exista localmente al momento de generar Android/iOS.

## Costos y cuentas

- Google Play Console tiene una cuota unica de registro.
- Apple Developer Program tiene membresia anual.

Revisa siempre las paginas oficiales antes de pagar o publicar, porque las reglas pueden cambiar.

## Archivos que si puedes subir a GitHub

- `package.json`
- `capacitor.config.json`
- `scripts/prepare-mobile.js`
- `MOBILE_APP_GUIDE.md`

Cuando generes las carpetas `android` e `ios`, normalmente tambien conviene subirlas a GitHub porque son el proyecto nativo.

## Archivos que no debes subir

- `node_modules`
- `dist-mobile`
- `config.js`
- claves privadas de Android
- certificados o perfiles privados de Apple
