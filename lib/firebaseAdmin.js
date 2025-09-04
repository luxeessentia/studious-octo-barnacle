// Server-side Firebase admin helper. Provide FIREBASE_ADMIN_KEY in Vercel env (JSON string)
export function initFirebaseAdmin() {
  try {
    const admin = require('firebase-admin');
    if (!admin.apps.length) {
      if (process.env.FIREBASE_ADMIN_KEY) {
        const cfg = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
        admin.initializeApp({ credential: admin.credential.cert(cfg) });
      } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        admin.initializeApp();
      } else {
        console.warn('FIREBASE_ADMIN_KEY not set; admin SDK not initialized');
        return null;
      }
    }
    return admin;
  } catch (e) {
    console.warn('firebase-admin not available', e.message || e);
    return null;
  }
}