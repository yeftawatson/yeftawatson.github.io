self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      // Clone the request
      var fetchRequest = event.request.clone();

      // Try fetching from the network
      return fetch(fetchRequest).then(function(response) {
        // Check if we received a valid response
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        var responseToCache = response.clone();

        caches.open('my-cache').then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
