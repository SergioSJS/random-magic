// Service Worker básico para PWA
const CACHE_NAME = 'random-magic-v1'
const BASE_PATH = '/random-magic'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache apenas recursos essenciais
        return cache.addAll([
          `${BASE_PATH}/`,
          `${BASE_PATH}/index.html`,
          `${BASE_PATH}/favicon.svg`
        ]).catch(err => {
          console.log('Cache install error:', err)
        })
      })
  )
  self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  // Não fazer cache de requisições para a API
  if (event.request.url.includes('api.scryfall.com')) {
    return
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna do cache se disponível, senão busca da rede
        return response || fetch(event.request)
      })
      .catch(() => {
        // Fallback para requisições que falharam
        return fetch(event.request)
      })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

