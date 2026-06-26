import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let _auth: Auth | null = null;
let _initError: string | null = null;

function hasConfig(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId
  );
}

export function getFirebaseInitError(): string | null {
  return _initError;
}

export function getFirebaseAuth(): Auth | null {
  if (typeof window === "undefined") return null;
  if (_auth) return _auth;
  if (_initError) return null;

  if (!hasConfig()) {
    _initError =
      "Firebase web config missing. Copy .env.example to .env.local and set NEXT_PUBLIC_FIREBASE_* values.";
    return null;
  }

  try {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    _auth = getAuth(app);
    return _auth;
  } catch (e) {
    _initError = e instanceof Error ? e.message : String(e);
    return null;
  }
}

declare global {
  interface Window {
    recaptchaVerifier?: import("firebase/auth").RecaptchaVerifier;
  }
}
