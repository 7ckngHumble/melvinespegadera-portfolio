const CACHE_NAME = "portfolio-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-500.png",
  // All images in your repo
  "/ESPEGADERA, MELVIN M IMG_0305.jpg",
  "/Hire Me Yes!.pdf",
  "/Resume-Application-Letter-Benotskie-31.pdf",
  "/Resume-Application-Letter-Benotskie-32.pdf",
  "/checkmark_dark.png",
  "/checkmark_light.png",
  "/education_dark.png",
  "/education_light.png",
  "/email_dark.png",
  "/email_light.png",
  "/epbi-dark.png",
  "/epbi-light.png",
  "/experience_dark.png",
  "/experience_light.png",
  "/github_dark.png",
  "/github_light.png",
  "/linkedin_dark.png",
  "/linkedin_light.png",
  "/location-dark.png",
  "/location_light.png",
  "/mobileview.css",
  "/phone-dark.png",
  "/phone-light.png",
  "/profile 31.png",
  "/project one.jpg",
  "/project two.png",
  "/project three.png",
  "/theme_dark.png",
  "/theme_light.png",
  "/twitter-dark.png",
  "/twitter-light.png"
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedRes) => {
      return cachedRes || fetch(event.request);
    })
  );
});
