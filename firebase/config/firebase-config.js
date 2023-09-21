import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAfOqWAitubvN2rTpD5MHsneZRczvZ6Kvo",
  authDomain: "ganbk-faf4e.firebaseapp.com",
  projectId: "ganbk-faf4e",
  storageBucket: "ganbk-faf4e.appspot.com",
  messagingSenderId: "74922022574",
  appId: "1:74922022574:web:e48cfc52d9be4d0c20ff3f"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
export { firebase };
