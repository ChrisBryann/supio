import { AppOptions, cert, getApps, initializeApp } from "firebase-admin/app";

const firebaseAdminConfig: AppOptions = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
  }),
};

// Initialize Firebase Admin
if (getApps().length <= 0) {
  initializeApp(firebaseAdminConfig);
}
