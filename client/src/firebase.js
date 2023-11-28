// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "irani-estate.firebaseapp.com",
  projectId: "irani-estate",
  storageBucket: "irani-estate.appspot.com",
  messagingSenderId: "40814910617",
  appId: "1:40814910617:web:997632862b52a93f402c08",
};
console.log(firebaseConfig.apiKey);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
