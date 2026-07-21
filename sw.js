/* Service worker de Bloom — permite abrir la app sin conexión.
   Al publicar una versión nueva, cambia el número de VERSION para que
   los teléfonos descarguen los archivos actualizados. */
const VERSION = 'bloom-v1';
const ARCHIVOS = [
  './',
  './index.html',
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
  // El resto: primero caché, red como respaldo
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(r => {
      if (r.ok && new URL(e.request.url).origin === location.origin) {
        const copia = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copia));
      }
      return r;
    }))
  );
});
