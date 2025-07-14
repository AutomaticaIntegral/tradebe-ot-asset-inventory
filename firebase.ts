// firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Tu configuración personal de la aplicación web de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbtsYJEnIh5g7MeEvyI7CZ9L_2nV_97H4",
  authDomain: "inventariotradebev0.firebaseapp.com",
  projectId: "inventariotradebev0",
  storageBucket: "inventariotradebev0.appspot.com", // Asegúrate que sea .appspot.com
  messagingSenderId: "856174799263",
  appId: "1:856174799263:web:7a4acbcd93e537ddc9f5aa",
  measurementId: "G-G4J4R3CWJB"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que usarás en la aplicación
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 