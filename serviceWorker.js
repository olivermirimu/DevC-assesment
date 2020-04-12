/* eslint-disable arrow-body-style */
/* eslint-disable no-restricted-globals */
const cacheName = 'estimator-v1';
const resourcesToCahe = [
  '/',
  '/index.html',
  '/src/scripts/style.css',
  '/src/scripts/stripped.css',
  '/src/main.mjs',
  '/src/estimator.js',
  '/src/manifest.json',
  '/src/icons/favicon-32x32.png',
  '/src/icons/favicon-16x16.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => {
    return cache.addAll(resourcesToCahe);
  }).catch((err) => console.log(err)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => key));
  }).catch((err) => console.log(err)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((cachedResponse) => {
    return cachedResponse || fetch(event.request);
  }));
});
