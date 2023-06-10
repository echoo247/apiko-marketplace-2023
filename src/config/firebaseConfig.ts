import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database"


const firebaseConfig = {
    apiKey: "AIzaSyCb_ANB2AwrWSwp7vTq5MGM8lVm1j-WJ7k",
    authDomain: "apiko-marketplace-2023.firebaseapp.com",
    databaseURL: "https://apiko-marketplace-2023-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "apiko-marketplace-2023",
    storageBucket: "apiko-marketplace-2023.appspot.com",
    messagingSenderId: "222785207362",
    appId: "1:222785207362:web:0c4aa568e29baa314f81db",
    measurementId: "G-8TK636V8SV"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);
