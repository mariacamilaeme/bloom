/* Service worker de Bloom — permite abrir la app sin conexión.
   Al publicar una versión nueva, cambia el número de VERSION para que
   los teléfonos descarguen los archivos actualizados. */
const VERSION = 'bloom-v9';
const ARCHIVOS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // La página principal: primero red (para recibir actualizaciones), caché si no hay conexión
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => { const copia = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copia)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // El resto (incluye las fuentes de Google): primero caché, red como respaldo.
  // Las fuentes se guardan al primer uso para que la app abra igual sin conexión.
  const url = new URL(e.request.url);
  const cacheable = url.origin === location.origin ||
    url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(r => {
      // Las respuestas opacas (no-cors) llegan con ok=false: también valen para los hosts de fuentes
      if ((r.ok || r.type === 'opaque') && cacheable) {
        const copia = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copia));
      }
      return r;
    }))
  );
});
