import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEiIE8_6mpSWsJL_FPNvWLV0aLF3R7-bI",
  authDomain: "entertainment-web-app-e6674.firebaseapp.com",
  projectId: "entertainment-web-app-e6674",
  storageBucket: "entertainment-web-app-e6674.appspot.com",
  messagingSenderId: "461541289497",
  appId: "1:461541289497:web:3ade04ef73423601d18488",
  measurementId: "G-3P3VKX0BH6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
