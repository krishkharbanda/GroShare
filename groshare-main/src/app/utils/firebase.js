import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1co00tY6DLI6y7-gdGVYXkG1D560TtnQ",
    authDomain: "groshare-23.firebaseapp.com",
    projectId: "groshare-23",
    storageBucket: "groshare-23.firebasestorage.app",
    messagingSenderId: "855698989420",
    appId: "1:855698989420:web:c697046c8fdbb738a11349",
    measurementId: "G-GDCFPCCW5T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
