const CACHE_NAME = 'music-player-v1';
const ASSETS = [
  'index.html',
  'music1.mp3', // ใส่ชื่อไฟล์เพลงทั้งหมดของคุณ
  'img1.jpg',   // ใส่ชื่อรูปภาพทั้งหมดของคุณ
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