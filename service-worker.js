self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('travel-time-cache').then(function(cache) {
            return cache.addAll([
                '/travel-time-loading-bar/',
                '/travel-time-loading-bar/index.html',
                '/travel-time-loading-bar/manifest.json',
                '/travel-time-loading-bar/icon.png'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
