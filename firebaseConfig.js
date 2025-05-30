import { initializeApp } from "firebase/app";

import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from 'firebase/firestore'

// 1. Crie um novo projeto no Firebase Console
// 2. Habilite o e-mail e senha auth provider na página de authentication
// 3. Crie um web app e copie o firebseConfigs abaixo 

const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');