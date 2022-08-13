import admin from 'firebase-admin';
const serviceAccount = require('/public/firebaseServiceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const fbAdmin = {
  db: admin.firestore(),
  auth: admin.auth()
};
