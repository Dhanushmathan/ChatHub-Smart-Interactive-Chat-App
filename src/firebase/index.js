import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQ8qcai1zRFNUyEDgLOAXmmg30RgpxYF8",
    authDomain: "chat-web-app-b0c5d.firebaseapp.com",
    projectId: "chat-web-app-b0c5d",
    storageBucket: "chat-web-app-b0c5d.firebasestorage.app",
    messagingSenderId: "1085936478352",
    appId: "1:1085936478352:web:54504c13dd1ee8ca041015"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };