// Service worker: cache-first per i file statici, rete per le API
const CACHE = 'paperelle-v6';
const FILES = [
  './', './index.html', './punti.html', './kiosk.html', './admin.html', './info.html',
  './stile.css', './api.js', './manifest.webmanifest',
  './logo.png', './icon-192.png', './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // le chiamate al Worker non vanno mai in cache
  if (e.request.url.includes('workers.dev')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
