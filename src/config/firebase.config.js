// src/config/firebase.config.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de Firebase obtenida desde las variables de entorno (en el ejercicio de la clase, esto estaba en el archivo data.js
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Exportar la instancia de Firestore para usarla en otros archivos
export const db = getFirestore(app);