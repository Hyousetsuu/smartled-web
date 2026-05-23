// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  // projectId dll opsional untuk Realtime Database dasar, tapi kalau ada silakan copas semua
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor Database agar bisa dipakai di file lain
export const db = getDatabase(app);