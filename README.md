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

## Repositorio

Código en GitHub (privado): https://github.com/mariacamilaeme/mi-plan-vital

## Desplegar en Vercel (primera vez)

**Opción recomendada — conectar el repositorio (despliegue automático):**

1. Entra a [vercel.com/new](https://vercel.com/new) con tu cuenta.
2. Importa el repositorio `mariacamilaeme/mi-plan-vital` (autoriza el acceso de Vercel
   a GitHub si te lo pide). Framework: **Other**, sin build command.
3. Desde entonces, cada `git push` publica solo — no hay que correr nada más.

**Opción alternativa — desde la terminal:**

```
npx vercel login
npx vercel --prod
```

## Actualizar la app después de un cambio

1. Reemplaza `index.html` (y lo que haya cambiado).
2. **Sube el número de versión en `sw.js`** (`plan-vital-v1` → `plan-vital-v2`) para que
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
3. Queda con su ícono 🌱, pantalla completa y funciona sin conexión.

## Notas

- **Los datos viven en cada dispositivo.** Si la abres en el celular y en el computador,
  cada uno lleva su propio registro. Sincronizar entre dispositivos requeriría la versión
  con cuenta de usuario (Next.js + Supabase) — pendiente para más adelante.
- **Recordatorios:** suenan mientras la app esté abierta. Complementa con alarmas del
  reloj del teléfono para los medicamentos.
- **Cambio de dieta:** en Ajustes → Mi dieta puedes importar un plan nuevo (.json).
  Si solo tienes el PDF, pásaselo a Claude en el chat y pídele el archivo para importar.
