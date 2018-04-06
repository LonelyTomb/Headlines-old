const staticCacheName = `headlines-v3`
self.addEventListener('install', event => {
	let cacheArray = [
		'/skeleton',
		'dist/css/uikit.css',
		'dist/js/uikit.js',
		'dist/js/main.js'
	]
	event.waitUntil(
		caches.open(staticCacheName)
			.then(cache => {
				cache.addAll(cacheArray)
					.then(() => {
						console.log('Cached')
					})
			})
	)
})

self.addEventListener('fetch', (event) => {
	let requestUrl = new URL(event.request.url)
	if (requestUrl.origin === location.origin) {
		if (requestUrl.pathname === '/') {
			event.respondWith(caches.match('/skeleton'))
			return
		}
	}

	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) return response
			return fetch(event.request)
		})
	)
})

self.addEventListener('message', event => {
	if (event.data.action === 'skipWaiting') {
		return self.skipWaiting()
	}
})
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(
			cachesNames => {
				return Promise.all(
					cachesNames.filter(cacheName => {
						return cacheName.startsWith('headlines-') && cacheName !== staticCacheName
					}).map(cacheName => {
						return caches.delete(cacheName)
					})
				)
			}
		)
	)
})
