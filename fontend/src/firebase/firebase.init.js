// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv1yPXIwDIyYQUjjJulFCCCOpr1-qPJpc",
  authDomain: "online-health-care-74bbc.firebaseapp.com",
  projectId: "online-health-care-74bbc",
  storageBucket: "online-health-care-74bbc.firebasestorage.app",
  messagingSenderId: "770462880494",
  appId: "1:770462880494:web:d06ca4f36c7432db8219ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);