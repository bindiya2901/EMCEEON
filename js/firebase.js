// ================= FIREBASE CONFIG =================

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth, GoogleAuthProvider } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔐 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDnf7JaZDyz4_EMsBdB9At27KBUuweFXls",
  authDomain: "maze-49534.firebaseapp.com",
  projectId: "maze-49534",
  storageBucket: "maze-49534.firebasestorage.app",
  messagingSenderId: "550382927351",
  appId: "1:550382927351:web:7f97194148b68c964e42f2"
};

// Initialize
const app = initializeApp(firebaseConfig);

// Export ONLY these
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);