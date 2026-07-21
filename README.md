# Mi Plan Vital 🌱

App personal de seguimiento diario de alimentación, medicamentos y peso.
Es una **PWA estática** (sin servidor ni base de datos): todos los datos se guardan
en el dispositivo de quien la usa (localStorage + IndexedDB). Nada sale a internet.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Toda la app (HTML + CSS + JavaScript en un solo archivo) |
| `manifest.webmanifest` | Hace la app instalable (nombre, ícono, color) |
| `sw.js` | Service worker: la app abre aunque no haya internet |
| `icon-192.png` / `icon-512.png` | Íconos de la app instalada |

## Desplegar en Vercel (primera vez)

**Opción A — desde la terminal (recomendada):**

1. Abre una terminal en esta carpeta (`app-salud`).
2. Ejecuta:
   ```
   npx vercel login
   ```
   y sigue el enlace que te da para entrar con tu cuenta (o crearla).
3. Ejecuta:
   ```
   npx vercel --prod
   ```
   Acepta las opciones por defecto (proyecto nuevo, sin build command, output = carpeta actual).
4. Al terminar te da la URL pública, algo como `https://mi-plan-vital.vercel.app`.

**Opción B — con GitHub:**

1. Crea un repositorio en GitHub y sube esta carpeta.
2. En [vercel.com/new](https://vercel.com/new) importa ese repositorio (framework: **Other**, sin build command).
3. Cada vez que hagas push, Vercel redespliega solo.

## Actualizar la app después de un cambio

1. Reemplaza `index.html` (y lo que haya cambiado).
2. **Sube el número de versión en `sw.js`** (`plan-vital-v1` → `plan-vital-v2`) para que
   los teléfonos que ya la instalaron descarguen la versión nueva.
3. Vuelve a ejecutar `npx vercel --prod` (o haz push si usas GitHub).

## Instalarla en el celular

1. Abre la URL de Vercel en el navegador del teléfono.
2. Menú → **"Añadir a pantalla de inicio"** (Android/Chrome la ofrece sola).
3. Queda con su ícono 🌱, pantalla completa y funciona sin conexión.

## Notas

- **Los datos viven en cada dispositivo.** Si la abres en el celular y en el computador,
  cada uno lleva su propio registro. Sincronizar entre dispositivos requeriría la versión
  con cuenta de usuario (Next.js + Supabase) — pendiente para más adelante.
- **Recordatorios:** suenan mientras la app esté abierta. Complementa con alarmas del
  reloj del teléfono para los medicamentos.
- **Cambio de dieta:** en Ajustes → Mi dieta puedes importar un plan nuevo (.json).
  Si solo tienes el PDF, pásaselo a Claude en el chat y pídele el archivo para importar.
