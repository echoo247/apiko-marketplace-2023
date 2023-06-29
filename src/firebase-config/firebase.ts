// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC54MNjv2Et0S9Qp6Vs58eBqJ7MlDt3TcU",
    authDomain: "apiko-marketplace-2023-3429c.firebaseapp.com",
    projectId: "apiko-marketplace-2023-3429c",
    storageBucket: "apiko-marketplace-2023-3429c.appspot.com",
    messagingSenderId: "18032398686",
    appId: "1:18032398686:web:b0d29a06bc7aed3cbeffcf"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);