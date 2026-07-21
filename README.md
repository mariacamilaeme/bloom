# Bloom 🌸

Compañía diaria de alimentación, medicamentos y bienestar — una app personal.
Es una **PWA estática** (sin servidor ni base de datos): todos los datos se guardan
en el dispositivo de quien la usa (localStorage + IndexedDB). Nada sale a internet.

## Stack y arquitectura

Bloom es una **PWA estática instalable**, sin framework ni bundler:
HTML semántico + CSS moderno (custom properties, `color-mix`, tokens de tema
claro/oscuro y acento) + JavaScript vanilla (ES2020). Persistencia local con
**localStorage** (estado) e **IndexedDB** (fotos). Funciona offline vía Service Worker.

¿Por qué no React/Next? Para una app de un solo usuario, sin backend, la carga
instantánea, el cero build y la privacidad total (nada sale del dispositivo) pesan
más que un framework. El código está separado por responsabilidades para mantenerlo
profesional y fácil de evolucionar. El salto a Next.js + Supabase tiene sentido el día
que se quiera **sincronizar entre dispositivos** o **push real** (ver Notas).

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Estructura y marcado de la app |
| `styles.css` | Todos los estilos (temas, componentes, animaciones) |
| `app.js` | Toda la lógica (estado, render, recetas, calendario, fotos…) |
| `manifest.webmanifest` | Hace la app instalable (nombre, ícono, color) |
| `sw.js` | Service worker: la app abre aunque no haya internet |
| `icon-192.png` / `icon-512.png` | Íconos de la app instalada |
| `build-artifact.mjs` | Utilidad opcional: genera una versión de un solo archivo para compartir |

## Repositorio

Código en GitHub (privado): https://github.com/mariacamilaeme/bloom

## Desplegar en Vercel (primera vez)

**Opción recomendada — conectar el repositorio (despliegue automático):**

1. Entra a [vercel.com/new](https://vercel.com/new) con tu cuenta.
2. Importa el repositorio `mariacamilaeme/bloom` (autoriza el acceso de Vercel
   a GitHub si te lo pide). Framework: **Other**, sin build command.
3. Desde entonces, cada `git push` publica solo — no hay que correr nada más.

**Opción alternativa — desde la terminal:**

```
npx vercel login
npx vercel --prod
```

## Actualizar la app después de un cambio

1. Edita `styles.css`, `app.js` o `index.html` según corresponda.
2. **Sube el número de versión en `sw.js`** (`bloom-v6` → `bloom-v7`) para que
   los teléfonos que ya la instalaron descarguen la versión nueva.
3. Publica:
   ```
   git add -A
   git commit -m "Descripción del cambio"
   git push
   ```
   (con el repo conectado, Vercel despliega solo; si no, corre `npx vercel --prod`).

## Instalarla en el celular

1. Abre la URL de Vercel en el navegador del teléfono.
2. Menú → **"Añadir a pantalla de inicio"** (Android/Chrome la ofrece sola).
3. Queda con su ícono 🌸, pantalla completa y funciona sin conexión.

## Notas

- **Los datos viven en cada dispositivo.** Si la abres en el celular y en el computador,
  cada uno lleva su propio registro. Sincronizar entre dispositivos requeriría la versión
  con cuenta de usuario (Next.js + Supabase) — pendiente para más adelante.
- **Recordatorios:** suenan mientras la app esté abierta. Complementa con alarmas del
  reloj del teléfono para los medicamentos.
- **Cambio de dieta:** en Ajustes → Mi dieta puedes importar un plan nuevo (.json).
  Si solo tienes el PDF, pásaselo a Claude en el chat y pídele el archivo para importar.
