self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        // If the response is found in the cache, return it
        return response;
      }
      // Otherwise, fetch the resource from the network
      return fetch(event.request).then(function(response) {
        // Check if we received a valid response
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        // Clone the response
        var responseToCache = response.clone();
        // Save the response to the cache
        caches.open('my-cache').then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        // Return the response
        return response;
      });
    })
  );
});
