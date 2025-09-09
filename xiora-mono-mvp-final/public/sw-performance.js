// パフォーマンス最適化に特化したService Worker
const CACHE_NAME = 'xiora-performance-v1'
const STATIC_CACHE = 'xiora-static-v1'
const DYNAMIC_CACHE = 'xiora-dynamic-v1'
const IMAGE_CACHE = 'xiora-images-v1'
const FONT_CACHE = 'xiora-fonts-v1'

// キャッシュ戦略の定義
const CACHE_STRATEGIES = {
  STATIC: 'cache-first',
  DYNAMIC: 'stale-while-revalidate',
  IMAGES: 'cache-first',
  FONTS: 'cache-first',
  API: 'network-first'
}

// キャッシュの有効期限（秒）
const CACHE_EXPIRATION = {
  STATIC: 24 * 60 * 60, // 24時間
  DYNAMIC: 5 * 60, // 5分
  IMAGES: 7 * 24 * 60 * 60, // 7日
  FONTS: 30 * 24 * 60 * 60, // 30日
  API: 1 * 60 // 1分
}

// プリキャッシュするリソース
const PRECACHE_RESOURCES = [
  '/',
  '/ja',
  '/en',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png'
]

// インストール時の処理
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    Promise.all([
      // 静的リソースのキャッシュ
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(PRECACHE_RESOURCES)
      }),
      
      // フォントのキャッシュ
      caches.open(FONT_CACHE).then(cache => {
        return cache.addAll([
          '/fonts/inter-var.woff2',
          '/fonts/cormorant-garamond-var.woff2'
        ])
      }),
      
      // 重要な画像のキャッシュ
      caches.open(IMAGE_CACHE).then(cache => {
        return cache.addAll([
          '/images/hero-bg.jpg',
          '/images/logo.svg',
          '/images/og-image.jpg'
        ])
      })
    ]).then(() => {
      console.log('Service Worker: Pre-caching completed')
      return self.skipWaiting()
    })
  )
})

// アクティベート時の処理
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    Promise.all([
      // 古いキャッシュの削除
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (![CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, FONT_CACHE].includes(cacheName)) {
              console.log('Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      
      // クライアントの制御を開始
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker: Activation completed')
    })
  )
})

// フェッチイベントの処理
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // キャッシュ戦略の決定
  const strategy = determineCacheStrategy(request)
  
  event.respondWith(
    handleRequest(request, strategy)
  )
})

// キャッシュ戦略の決定
function determineCacheStrategy(request) {
  const url = new URL(request.url)
  
  // 静的リソース
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname.startsWith('/fonts/') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js')) {
    return CACHE_STRATEGIES.STATIC
  }
  
  // 画像
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
    return CACHE_STRATEGIES.IMAGES
  }
  
  // フォント
  if (url.pathname.match(/\.(woff|woff2|ttf|otf)$/)) {
    return CACHE_STRATEGIES.FONTS
  }
  
  // API
  if (url.pathname.startsWith('/api/')) {
    return CACHE_STRATEGIES.API
  }
  
  // その他（動的コンテンツ）
  return CACHE_STRATEGIES.DYNAMIC
}

// リクエストの処理
async function handleRequest(request, strategy) {
  try {
    switch (strategy) {
      case CACHE_STRATEGIES.STATIC:
        return await cacheFirst(request, STATIC_CACHE)
      
      case CACHE_STRATEGIES.IMAGES:
        return await cacheFirst(request, IMAGE_CACHE)
      
      case CACHE_STRATEGIES.FONTS:
        return await cacheFirst(request, FONT_CACHE)
      
      case CACHE_STRATEGIES.API:
        return await networkFirst(request, DYNAMIC_CACHE)
      
      case CACHE_STRATEGIES.DYNAMIC:
      default:
        return await staleWhileRevalidate(request, DYNAMIC_CACHE)
    }
  } catch (error) {
    console.error('Service Worker: Request handling failed:', error)
    
    // オフライン時のフォールバック
    if (request.destination === 'document') {
      return caches.match('/offline.html')
    }
    
    // その他のリソースはネットワークから取得を試行
    return fetch(request)
  }
}

// Cache First戦略
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)
  
  if (cachedResponse) {
    // キャッシュの有効期限チェック
    if (isCacheValid(cachedResponse, cacheName)) {
      return cachedResponse
    } else {
      // 期限切れのキャッシュを削除
      await cache.delete(request)
    }
  }
  
  // ネットワークから取得してキャッシュ
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone()
      cache.put(request, responseToCache)
    }
    return networkResponse
  } catch (error) {
    // ネットワークエラー時は古いキャッシュがあれば使用
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

// Network First戦略
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      const responseToCache = networkResponse.clone()
      cache.put(request, responseToCache)
    }
    return networkResponse
  } catch (error) {
    // ネットワークエラー時はキャッシュから取得
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

// Stale While Revalidate戦略
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)
  
  // バックグラウンドでキャッシュを更新
  const updateCache = async () => {
    try {
      const networkResponse = await fetch(request)
      if (networkResponse.ok) {
        const responseToCache = networkResponse.clone()
        cache.put(request, responseToCache)
      }
    } catch (error) {
      console.warn('Service Worker: Background cache update failed:', error)
    }
  }
  
  // 非同期でキャッシュ更新を開始
  updateCache()
  
  // キャッシュされたレスポンスがあれば返す
  if (cachedResponse) {
    return cachedResponse
  }
  
  // キャッシュがない場合はネットワークから取得
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone()
      cache.put(request, responseToCache)
    }
    return networkResponse
  } catch (error) {
    throw error
  }
}

// キャッシュの有効期限チェック
function isCacheValid(response, cacheName) {
  const cacheTime = response.headers.get('sw-cache-time')
  if (!cacheTime) return true
  
  const expiration = CACHE_EXPIRATION[cacheName.toUpperCase()] || 0
  const now = Math.floor(Date.now() / 1000)
  
  return (now - parseInt(cacheTime)) < expiration
}

// バックグラウンド同期
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered:', event.tag)
  
  if (event.tag === 'background-sync') {
    event.waitUntil(performBackgroundSync())
  }
})

// バックグラウンド同期の実行
async function performBackgroundSync() {
  try {
    // 古いキャッシュのクリーンアップ
    await cleanupExpiredCaches()
    
    // 重要なリソースのプリフェッチ
    await prefetchImportantResources()
    
    console.log('Service Worker: Background sync completed')
  } catch (error) {
    console.error('Service Worker: Background sync failed:', error)
  }
}

// 期限切れキャッシュのクリーンアップ
async function cleanupExpiredCaches() {
  const cacheNames = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, FONT_CACHE]
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const requests = await cache.keys()
    
    for (const request of requests) {
      const response = await cache.match(request)
      if (response && !isCacheValid(response, cacheName)) {
        await cache.delete(request)
        console.log('Service Worker: Expired cache removed:', request.url)
      }
    }
  }
}

// 重要なリソースのプリフェッチ
async function prefetchImportantResources() {
  const importantResources = [
    '/ja/about',
    '/ja/catalog',
    '/ja/contact'
  ]
  
  const cache = await caches.open(DYNAMIC_CACHE)
  
  for (const resource of importantResources) {
    try {
      const response = await fetch(resource)
      if (response.ok) {
        const responseToCache = response.clone()
        // キャッシュ時間をヘッダーに追加
        responseToCache.headers.set('sw-cache-time', Math.floor(Date.now() / 1000).toString())
        cache.put(resource, responseToCache)
        console.log('Service Worker: Prefetched:', resource)
      }
    } catch (error) {
      console.warn('Service Worker: Prefetch failed:', resource, error)
    }
  }
}

// プッシュ通知の処理
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received')
  
  const options = {
    body: event.data ? event.data.text() : '新しい更新があります',
    icon: '/images/logo.svg',
    badge: '/images/badge.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: '詳細を見る',
        icon: '/images/explore.png'
      },
      {
        action: 'close',
        title: '閉じる',
        icon: '/images/close.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Xiora', options)
  )
})

// 通知クリック時の処理
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked:', event.action)
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// メッセージの処理
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received:', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    event.ports[0].postMessage({
      type: 'CACHE_STATUS',
      caches: {
        static: STATIC_CACHE,
        dynamic: DYNAMIC_CACHE,
        images: IMAGE_CACHE,
        fonts: FONT_CACHE
      }
    })
  }
})

// エラーハンドリング
self.addEventListener('error', (event) => {
  console.error('Service Worker: Error occurred:', event.error)
})

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker: Unhandled rejection:', event.reason)
})

console.log('Service Worker: Performance-optimized service worker loaded')
