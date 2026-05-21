const CACHE_NAME = 'music-player-v3';
const ASSETS = [
  'index.html',
  'm1.mp3','m2.mp3','m3.mp3','m4.mp3',
  'ARXX1080.JPG','img1.png','img2.png','img3.png','img4.png',
  'manifest.json'
];

// ติดตั้ง Service Worker และเก็บไฟล์ลง Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// เรียกใช้งานไฟล์จาก Cache เมื่อไม่มีอินเทอร์เน็ต
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});