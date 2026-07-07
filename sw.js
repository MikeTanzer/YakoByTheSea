/* Yako by the Sea — service worker (offline + installable PWA) */
const CORE = 'yako-core-v10';    // versioned: bumped whenever the code/art below changes
const MEDIA = 'yako-media';      // persistent: recorded clips cached as they play (survives version bumps)
const CORE_ASSETS = [
  './',
  './index.html',
  './keyboard-fun.html',
  './manifest.webmanifest',
  './js/i18n.js',
  './js/audio.js',
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

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CORE).then((c) => c.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      // drop stale CORE versions, but keep the persistent MEDIA cache of downloaded clips
      .then((keys) => Promise.all(keys.filter((k) => k !== CORE && k !== MEDIA).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// A clip/scene is immutable once recorded — cache-first, kept in the persistent MEDIA cache.
const isMedia = (url) => url.origin === location.origin &&
  (url.pathname.includes('/voice/') ||
   (/\.(mp3|jpg|jpeg|png|mp4)$/i.test(url.pathname) && url.pathname.includes('/scenes/')));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Recorded voice clips (and static scene images): cache-first so replays work OFFLINE.
  // Stored full (they are played start-to-finish, never range-seeked).
  if (isMedia(url) && !req.headers.has('range')) {
    e.respondWith(
      caches.open(MEDIA).then((c) => c.match(req).then((hit) =>
        hit || fetch(req).then((res) => {
          if (res && res.status === 200) c.put(req, res.clone());
          return res;
        }).catch(() => hit)
      ))
    );
    return;
  }

  // Looping background videos + any ranged request: never intercept, let the
  // range-capable server stream them (video seeking / the ping-pong loop).
  if (req.headers.has('range') || req.destination === 'video' || req.destination === 'audio') return;

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
