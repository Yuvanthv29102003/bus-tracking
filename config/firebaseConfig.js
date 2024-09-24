// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzFtuXEQGY2PHCdF0jJy96Gk1MOJYnTgE",
  authDomain: "bus-tracking-87f10.firebaseapp.com",
  projectId: "bus-tracking-87f10",
  storageBucket: "bus-tracking-87f10.appspot.com",
  messagingSenderId: "101155764389",
  appId: "1:101155764389:web:54e74d137f58e3c62db54c",
  measurementId: "G-ZCSY892FP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);