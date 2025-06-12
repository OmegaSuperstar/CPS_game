import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlh3AhuFoEAWt24WW6lLshdJVGhzZUfLg",
  authDomain: "benchmark-game.firebaseapp.com",
  projectId: "benchmark-game",
  storageBucket: "benchmark-game.firebasestorage.app",
  messagingSenderId: "927533654542",
  appId: "1:927533654542:web:4ed097ce6d558f1e1cd25f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);