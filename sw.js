var APP_PREFIX = "UTSYefta"; 
var VERSION = "UTSVersion_00"; 
var CACHE_NAME = APP_PREFIX + VERSION;

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      cache.addAll([
        "/",
        "/index.html",
        "/about.html",
        "/blog.html",
        "/contact.html",
        "/portfolio-example-01.html",
        "/styles.css",
        "/Tutorial/*.html",
        "/Tutorial/step05-individual-pages/*.html",
        "/img/icon.png"
      ]);
    })
  );
  return self.clients.claim();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        
        return response;
      } else {
        return fetch(event.request)
          .then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            throw error;
          });
      }
    })
  );
});