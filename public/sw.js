// Service Worker para cache offline
const CACHE_NAME = 'trukando-v1.0.5';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/icons/favicon.ico',
];

// Instalação do SW
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Cache aberto, adicionando assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.log('[SW] Erro ao cachear alguns assets:', err);
      });
    })
  );
  self.skipWaiting();
});

// Ativação do SW
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker ativado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - Estratégia: Network First, com fallback para Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip para requisições que não são GET
  if (request.method !== 'GET') {
    return;
  }

  // Skip para requisições externas (exceto se estiver em cache)
  if (url.origin !== location.origin) {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // Estratégia Network First para aplicação
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Não cachear respostas que não são sucesso
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clonar a resposta
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Se offline, tentar cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Fallback para página offline se disponível
          if (request.destination === 'document') {
            return caches.match('/');
          }

          return new Response('Offline - Conteúdo não disponível', {
            status: 503,
            statusText: 'Service Unavailable',
          });
        });
      })
  );
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
