const staticCacheName = 'headlines-v1'
self.addEventListener('install', event => {
	let cacheArray = [
		'/',
		'dist/js/main.js',
		'dist/css/uikit.css'
	]
	// event.waitUntil(
	// 	caches.open(staticCacheName)
	// 		.then(cache => {
	// 			cache.addAll(cacheArray)
	// 				.then(() => {
	// 					console.log('Cached')
	// 				})
	// 		})
	// )
})

self.addEventListener('fetch', (event) => {
	// event.respondWith(
	// 	// caches.match(event.request).then(response => {
	// 	// 	if (response) return response
	// 	// 	return fetch(event.request)
	// 	// })
	// )
})

self.addEventListener('activate', event => {
	// event.waitUntil(
	// 	caches.keys().then(
	// 		cachesNames => {
	// 			return Promise.all(
	// 				cachesNames.filter(cacheName => {
	// 					return cacheName.startsWith('headlines-') && cacheName !== staticCacheName
	// 				}).map(cacheName => {
	// 					return caches.delete(cacheName)
	// 				})
	// 			)
	// 		}
	// 	)
	// )
})
