/* MediAUS service worker: network first, cache fallback, so updates show straight away while testing. */
var CACHE = 'mediaus-v12';
var ASSETS = [
  './',
  'index.html',
  'styles.css',
  'data/core.js',
  'data/sources.js',
  'data/reviews.js',
  'data/facts/amiodarone.js',
  'data/facts/digoxin.js',
  'data/facts/amoxicillin.js',
  'data/facts/baclofen.js',
  'data/facts/pantoprazole.js',
  'data/facts/tacrolimus.js',
  'data/facts/piperacillin-tazobactam.js',
  'data/facts/lidocaine.js',
  'data/facts/empagliflozin.js',
  'data/facts/ketamine.js',
  'data/facts/ipratropium.js',
  'data/facts/metformin.js',
  'data/facts/paracetamol.js',
  'data/facts/glyceryl-trinitrate.js',
  'data/facts/salbutamol.js',
  'data/facts/atorvastatin.js',
  'data/facts/ibuprofen.js',
  'data/facts/demo.js',
  'data/meds.js',
  'data/resolve.js',
  'app.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return res;
      })
      .catch(function () {
        return caches.match(e.request).then(function (hit) { return hit || caches.match('index.html'); });
      })
  );
});
