var CACHE_NAME = "website";
var urlsToCache = [
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "index.html",
  "/main.f35862829a7e3aae5527.hot-update.js",
  "/manifest.json",
  "/favicon.ico",
  "/logo192.png",
  " https://opentdb.com/api_category.php",

  "/",
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
self.addEventListener('activate', function(event) {

  var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(CACHE_NAME) {
          if (cacheAllowlist.indexOf(CACHE_NAME) === -1) {
            return caches.delete(CACHE_NAME);
          }
        })
      );
    })
  );
});