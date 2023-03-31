self.addEventListener('fetch', function (event) {
  event.respondWith(
      caches.open(cacheName)
          .then(function(cache) {
              cache.match(event.request)
                  .then( function(cacheResponse) {
                      if(cacheResponse)
                          return cacheResponse
                      else
                          return fetch(event.request)
                              .then(function(networkResponse) {
                                  cache.put(event.request, networkResponse.clone())
                                  return networkResponse
                              })
                  })
          })
  )
});
