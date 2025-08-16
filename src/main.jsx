// הרשמת Service Worker + פרומפט לעדכון גרסה
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        // יוזם בדיקת עדכון ברקע
        reg.update?.();

        // אם כבר יש Worker במצב waiting – הצע ריענון
        if (reg.waiting) promptToReload(reg);

        // מאזינים לעדכון חדש שמותקן ברקע
        reg.addEventListener('updatefound', () => {
          const newSW = reg.installing;
          if (!newSW) return;
          newSW.addEventListener('statechange', () => {
            // ניכנס לכאן רק אם כבר יש controller (כלומר זו לא ההתקנה הראשונה)
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              promptToReload(reg);
            }
          });
        });
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });

    // כשמתחלף ה־controller אחרי SKIP_WAITING – מרעננים אוטומטית
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  });
}

function promptToReload(reg) {
  const ok = window.confirm('יש גרסה חדשה. לרענן עכשיו?');
  if (ok) {
    reg.waiting?.postMessage({ type: 'SKIP_WAITING' });
  }
}
