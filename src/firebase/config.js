// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcpcSEf2C4XQhncDzHc1fRjeMYTQozhFg",
    authDomain: "authentication-f3cfc.firebaseapp.com",
    projectId: "authentication-f3cfc",
    storageBucket: "authentication-f3cfc.appspot.com",
    messagingSenderId: "467570450467",
    appId: "1:467570450467:web:19760c96707c210b6fd196"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
