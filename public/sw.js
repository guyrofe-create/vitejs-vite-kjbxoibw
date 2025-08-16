// אין skipWaiting אוטומטי — כדי לאפשר פרומפט למשתמש
self.addEventListener('install', () => {
  // אפשר לשים כאן פרה-קאש אם תרצה; כרגע no-op
});

// תופס שליטה על טאבּים פתוחים אחרי האקטיבציה
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// מטפל בהודעות מהקליינט
self.addEventListener('message', (e) => {
  const d = e.data || {};

  // בקשה לדלג על ה-waiting אחרי אישור המשתמש מהאפליקציה
  if (d.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }

  // נוטיפיקציה ידנית (אם נדרש)
  if (d.type === 'SHOW') {
    self.registration.showNotification(d.title || 'התראה', {
      body: d.body || '',
      // אפשר גם להוסיף icon/badge אם תרצה:
      // icon: '/icons/icon-192.png',
      // badge: '/icons/icon-192.png'
    });
  }
});
