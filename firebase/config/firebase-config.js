import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import googleServices from "../../google-services.json";

// Build the web-SDK config from the project's google-services.json so the
// values stay in one place (the file that native builds already require)
// instead of being duplicated as literals in source code.
const projectInfo = googleServices.project_info ?? {};
const client = (googleServices.client ?? [])[0] ?? {};

const firebaseConfig = {
  apiKey: client.api_key?.[0]?.current_key,
  authDomain: `${projectInfo.project_id}.firebaseapp.com`,
  projectId: projectInfo.project_id,
  storageBucket: projectInfo.storage_bucket,
  messagingSenderId: projectInfo.project_number,
  appId: client.client_info?.mobilesdk_app_id,
};

// Initialize once; reuse the existing app on Fast Refresh to avoid
// "duplicate-app" errors.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// initializeAuth throws if called twice for the same app (Fast Refresh),
// so fall back to the existing auth instance.
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

// The compat namespace shares the same underlying default app.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = getFirestore(app);
const storage = getStorage(app);

export default auth;
export { firebase, db, storage, firebaseConfig };
