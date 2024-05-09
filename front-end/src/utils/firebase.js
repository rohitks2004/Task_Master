// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmaster-73796.firebaseapp.com",
  projectId: "taskmaster-73796",
  storageBucket: "taskmaster-73796.appspot.com",
  messagingSenderId: "221566611909",
  appId: "1:221566611909:web:f345bb635447393bae1bac",
  measurementId: "G-8RQ77WYP28"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);