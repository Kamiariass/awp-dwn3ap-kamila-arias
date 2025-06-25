const CACHE_NAME = "v1-cache";
const urlsToCache = [
  "./",
  "index.html",
  "detalles.html",
  "favoritos.html",
  "style.css",
  "js/main.js",
  "js/buscador.js",
  "js/detalles.js",
  "js/favoritos.js",
  "js/instalacion.js",
  "datos-alumnos.txt",
  "img/alumno.jpg",
  "img/alumno2.jpg",
  "img/banner-home.png",
  "img/icon-192.png",
  "img/icon-512.png",
  "img/logo-pokemon-79x45.png",
  "img/pokemon-fondo.png",
  "img/sabrina.jpg",
  "img/user-default.jpg"
];

// Instalación del SW y caché inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Archivos cacheados correctamente");
      return cache.addAll(urlsToCache);
    })
  );
});

if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('✅ Service Worker registrado'))
        .catch(err => console.log('❌ Error al registrar el SW:', err));
    }

// Activación y limpieza de cachés viejos
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("[SW] Borrando caché antigua:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes y responder desde caché o red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
