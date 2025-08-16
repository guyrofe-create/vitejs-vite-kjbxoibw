self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('message', (e) => {
  const d = e.data || {};
  if (d.type === 'SHOW') {
    self.registration.showNotification(d.title || 'התראה', { body: d.body || '' });
  }
});
