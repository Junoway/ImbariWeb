// lib/firebase.ts
"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getDatabase, type Database } from "firebase/database";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function hasFirebaseConfig(cfg: typeof firebaseConfig) {
  // Minimum needed for your usage (Auth + Realtime DB)
  return Boolean(cfg.apiKey && cfg.authDomain && cfg.databaseURL && cfg.projectId && cfg.appId);
}

/**
 * We export non-null instances for client usage.
 * If Firebase env vars are missing, we throw a clear error on the client
 * (so you find it immediately), rather than exporting Auth|null and breaking typing everywhere.
 *
 * If you prefer "soft fail" (no throw), tell me and I’ll adjust.
 */
if (!hasFirebaseConfig(firebaseConfig)) {
  // This will only run in the browser because of "use client".
  // It will NOT break Next build workers server-side.
  throw new Error(
    "Firebase config is missing. Set NEXT_PUBLIC_FIREBASE_* environment variables in Vercel (Production + Preview)."
  );
}

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database: Database = getDatabase(app);
const auth: Auth = getAuth(app);

export { app, database, auth };
