var APP_PREFIX = 'Portofolio'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
  '/',                     // If you have separate JS/CSS files,
  '/index.html',            // add path to those files here            // add path to those files here            // add path to those files here            // add path to those files here
  '/blog.html', 
  '/contact.html',  
  '/portofolio-example01.html', 
  '/styles.css.html',    
  '/about.html',
  '/css/app.css',
  '/js/app.js',
  '/images/icon.png',
]

// Install the service worker and cache the files
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
