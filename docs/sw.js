// BUILD: 20260915T0840Z
const CACHE_NAME = 'nova360-v3-20260915T0840Z';
const SHELL_URLS = ['./', './manifest.json', './icon.svg'];

// Install – pre-cache shell then activate immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate – delete all old caches, claim clients, notify them to reload
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
      .then(() =>
        self.clients.matchAll({ includeUncontrolled: true }).then((clients) =>
          clients.forEach((c) => c.postMessage({ type: 'SW_UPDATED' }))
        )
      )
  );
});

// Fetch – network-first for HTML navigation, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (!url.protocol.startsWith('http')) return;

  // Navigation requests (the HTML page itself) → always try network first
  // so users receive new deployments immediately
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});

async function networkFirst(request) {
  try {
    const res = await fetch(request);
    if (res.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, res.clone());
    }
    return res;
  } catch (_) {
    const cached = await caches.match(request) || await caches.match('./');
    if (cached) return cached;
    throw _;
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const res = await fetch(request);
    if (res.status === 200 && res.type !== 'opaque') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, res.clone());
    }
    return res;
  } catch (_) {
    throw _;
  }
}

// Allow the page to trigger skipWaiting so the update banner can activate the new SW
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
