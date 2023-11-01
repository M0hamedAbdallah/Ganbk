import { getAuth, initializeAuth ,getReactNativePersistence} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAfOqWAitubvN2rTpD5MHsneZRczvZ6Kvo",
  authDomain: "ganbk-faf4e.firebaseapp.com",
  projectId: "ganbk-faf4e",
  storageBucket: "ganbk-faf4e.appspot.com",
  messagingSenderId: "74922022574",
  appId: "1:74922022574:web:e48cfc52d9be4d0c20ff3f",
  storageBucket: "gs://ganbk-faf4e.appspot.com"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export default auth;
const db = getFirestore(app);
const storage = getStorage(app);
export { firebase, db, storage , firebaseConfig};
