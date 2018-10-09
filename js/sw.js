console.log('Service Worker Registered!');

//installing the service worker
self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(cache_name).then(function(cache){
      return cache.addAll(cacheFiles);
    })
  );
});

//array of files to be cached
let cache_name= 'v1'; //https://developers.google.com/web/fundamentals/primers/service-workers/
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/css/responsiveness.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/sw.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

//fetch events
self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(response){
      if(response){
        console.log('Found ', e.request, ' in cache'); //https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/
        return response;
      }
      else{
        console.log('Could not find ', e.request, 'in cache, FETCHING!');//https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/
        return fetch(e.request).then(function(response){
          let responseToCache = response.clone(); //https://developers.google.com/web/fundamentals/primers/service-workers/
          caches.open(cache_name).then(function(cache){
            cache.put(e.request, responseToCache);
          });
          return response;
        })
      };
    })
  );
});
