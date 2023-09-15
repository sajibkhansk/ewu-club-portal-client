// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAobbisQ8QLJYzQVJ7q0OvS7cNaTRzyKfs",
  authDomain: "ewu-club-portal.firebaseapp.com",
  projectId: "ewu-club-portal",
  storageBucket: "ewu-club-portal.appspot.com",
  messagingSenderId: "56178875165",
  appId: "1:56178875165:web:cd3338e733fa5515d69ff4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;