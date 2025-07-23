// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAR-K6T8Z7k7BpFDFrKQe9_4jSWYRb-YhI",
  authDomain: "fit-n-trim.firebaseapp.com",
  projectId: "fit-n-trim",
  storageBucket: "fit-n-trim.firebasestorage.app",
  messagingSenderId: "258828481976",
  appId: "1:258828481976:web:d8edf0c288e4665a0f0b4d",
  measurementId: "G-P4LTLS1ZQM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


