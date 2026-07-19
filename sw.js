/* Yako by the Sea — service worker (offline + installable PWA) */
const CORE = 'yako-core-v36';    // versioned: bumped whenever the code/art below changes
const MEDIA = 'yako-media';      // persistent: clips + scene stills cached as played (survives version bumps)
const FONTS = 'yako-fonts';      // persistent: Google Fonts CSS + woff2 (so text looks right offline)
const CORE_ASSETS = [
  './',
  './index.html',
  './keyboard-fun.html',
  './manifest.webmanifest',
  './js/i18n.js',
  './js/audio.js',
  './js/cloud.js',
  './data/firebase.js',
  './data/lessons.js',
  './data/vocab.js',
  './data/music.js',
  './data/strings.en.js',
  './data/strings.fr.js',
  './data/strings.es.js',
  './data/strings.he.js',
  './data/strings.tl.js',
  './background.jpg',
  './gameui.png',
  './freepanel.png',
  './yako.png',
  './yako_cheer.png',
  './ui/yako_wave.png',
  './ui/favicon.png',
  './ui/icon-192.png',
  './ui/icon-512.png',
  './ui/icon-maskable-512.png'
];
// Painted scene stills + the piper are small; precache them so backgrounds show
// OFFLINE even before the (large, runtime-cached) looping videos are downloaded.
const MEDIA_PRECACHE = [
  './scenes/mission.png', './scenes/bigsur.png', './scenes/carmelvalley.png',
  './scenes/pebble.png', './scenes/pacificgrove.png', './scenes/montereybay.png',
  './scenes/piper.png'
];

// Add a list to a cache one-by-one so a single missing/renamed file can't fail the
// whole install (which would silently break offline for everyone).
function addAllSafe(cacheName, urls) {
  return caches.open(cacheName).then((c) =>
    Promise.all(urls.map((u) => c.add(u).catch(() => {})))
  );
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    Promise.all([addAllSafe(CORE, CORE_ASSETS), addAllSafe(MEDIA, MEDIA_PRECACHE)])
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      // drop stale CORE versions; keep the persistent MEDIA + FONTS caches
      .then((keys) => Promise.all(keys.filter((k) => k !== CORE && k !== MEDIA && k !== FONTS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// A clip/scene is immutable once recorded — cache-first, kept in the persistent MEDIA cache.
const isMedia = (url) => url.origin === location.origin &&
  (url.pathname.includes('/voice/') ||
   (/\.(mp3|jpg|jpeg|png|mp4)$/i.test(url.pathname) && url.pathname.includes('/scenes/')));

// Cache-first helper for immutable, persistent assets (media, fonts).
function cacheFirst(cacheName, req) {
  return caches.open(cacheName).then((c) => c.match(req).then((hit) =>
    hit || fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
      return res;
    }).catch(() => hit)
  ));
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts (stylesheet + woff2 files): cache-first so text renders in the
  // right font OFFLINE after the first online visit.
  if (url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com') {
    e.respondWith(cacheFirst(FONTS, req));
    return;
  }

  // Recorded voice clips + painted scene stills: cache-first so replays work OFFLINE.
  // Stored full (played start-to-finish, never range-seeked).
  if (isMedia(url) && !req.headers.has('range')) {
    e.respondWith(cacheFirst(MEDIA, req));
    return;
  }

  // Looping background videos + any ranged request: never intercept, let the
  // range-capable server stream them (video seeking / the ping-pong loop).
  if (req.headers.has('range') || req.destination === 'video' || req.destination === 'audio') return;

  // Runtime caching is limited to our own origin plus the Firebase SDK scripts.
  // Never cache other cross-origin traffic (e.g. Firestore/auth API responses —
  // they carry per-user data and must not be replayed stale from Cache Storage).
  const cacheable = url.origin === location.origin ||
    (url.origin === 'https://www.gstatic.com' && url.pathname.startsWith('/firebasejs/'));
  if (!cacheable) return;   // let the network handle it untouched

  // Everything else (html/js/data/art): network-first when online, core cache when offline.
  e.respondWith(
    fetch(req).then((res) => {
      if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
        const copy = res.clone();
        caches.open(CORE).then((c) => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req).then((h) =>
      h || (req.mode === 'navigate' ? caches.match('./keyboard-fun.html') : undefined)
    ))
  );
});
