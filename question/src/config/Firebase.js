// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdjFt4In0BWpp7Zg-z8tkov0aj48beIvs",
  authDomain: "fire-base-6fd96.firebaseapp.com",
  projectId: "fire-base-6fd96",
  storageBucket: "fire-base-6fd96.appspot.com",
  messagingSenderId: "930206595784",
  appId: "1:930206595784:web:baafe6890a55ffc37803fd",
  measurementId: "G-6SEFEQDQT3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
