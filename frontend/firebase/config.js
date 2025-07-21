// Import necessary Firebase functions
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase project config (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyBPTF-18-78GBhbSkUinyLJ1QeWvcJEHBM",
    authDomain: "medipredict-46e3c.firebaseapp.com",
    projectId: "medipredict-46e3c",
    storageBucket: "medipredict-46e3c.firebasestorage.app",
    messagingSenderId: "1018444268776",
    appId: "1:1018444268776:web:e8cc79c52b1ab4de33f55d",
    measurementId: "G-DN831KECVX"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };