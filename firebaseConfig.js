import { initializeApp } from "firebase/app";

import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from 'firebase/firestore'

// 1. Crie um novo projeto no Firebase Console
// 2. Habilite o e-mail e senha auth provider na página de authentication
// 3. Crie um web app e copie o firebseConfigs abaixo 

const firebaseConfig = {
    apiKey: "AIzaSyArEV0mwyV_jrNGf2IeMvZRl0344CvhJv4",
    authDomain: "ddmii-bd1a5.firebaseapp.com",
    projectId: "ddmii-bd1a5",
    storageBucket: "ddmii-bd1a5.firebasestorage.app",
    messagingSenderId: "253176901434",
    appId: "1:253176901434:web:35accfaabdc1369c0f6a03",
    measurementId: "G-YST27Z6X4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');