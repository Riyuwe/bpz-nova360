// BUILD: 20260915T1800Z
const CACHE_NAME = 'nova360-v3-20260915T1800Z';
const PRECACHE_URLS = ['./'];

// ---------------------------------------------------------------------------
// Install – pre-cache shell assets then activate immediately
// ---------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ---------------------------------------------------------------------------
// Activate – remove stale caches then take control of all clients
// ---------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({type:'window'}).then(cs=>cs.forEach(c=>c.postMessage({type:'SW_ACTIVATED'}))))
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// ---------------------------------------------------------------------------
// Fetch – cache-first strategy with navigation fallback
// ---------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip non-HTTP(S) schemes (e.g. chrome-extension://, data:, blob:)
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  // 1. Try the cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;

  // 2. Cache miss – go to the network
  try {
    const networkResponse = await fetch(request);

    // Only cache valid, non-opaque responses (status 200, same-origin or
    // CORS responses with explicit headers).  Opaque responses (status 0)
    // are unpredictable and can bloat the cache with error pages.
    if (networkResponse.status === 200 && networkResponse.type !== 'opaque') {
      const cache = await caches.open(CACHE_NAME);
      // Clone before consuming – a Response body can only be read once
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (err) {
    // 3. Network failure – for navigation requests fall back to the cached
    //    app shell so the user sees something meaningful offline
    if (request.mode === 'navigate') {
      const shell = await caches.match('./');
      if (shell) return shell;
    }

    // For all other requests propagate the failure (the browser will show
    // its own error or the calling code can handle it)
    throw err;
  }
}
