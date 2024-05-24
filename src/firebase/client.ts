import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_CLIENT_SECRET,
    authDomain: "blog-database-b66a1.firebaseapp.com",
    projectId: "blog-database-b66a1",
    storageBucket: "blog-database-b66a1.appspot.com",
    messagingSenderId: "4253562809",
    appId: "1:4253562809:web:dac716f8aa0f454256e868"
};

export const app = initializeApp(firebaseConfig);