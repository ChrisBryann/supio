import { initFirestore } from "@auth/firebase-adapter";
import { firestore } from "firebase-admin";
import { AppOptions, cert, getApps, getApp, initializeApp } from "firebase-admin/app";

const firebaseAdminConfig: AppOptions = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  }),
};

// Initialize Firebase Admin
const admin_app = getApps().length > 0 ? getApp() : initializeApp(firebaseAdminConfig);
export const firestore_admin = initFirestore(firebaseAdminConfig);