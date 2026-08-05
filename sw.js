const CACHE_NAME = 'multitaskcoder-v3.4';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.webmanifest',
    './css/common.css',
    './css/home.css',
    './css/theory.css',
    './css/typing.css',
    './css/debugger.css',
    './css/quizzes.css',
    './css/analytics.css',
    './js/common.js',
    './js/theory.js',
    './js/typing.js',
    './js/debugger.js',
    './js/quizzes.js',
    './js/analytics.js',
    './data/python.json',
    './data/java.json',
    './data/c.json',
    './pages/theory.html',
    './pages/typing.html',
    './pages/debugger.html',
    './pages/quizzes.html',
    './pages/analytics.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
