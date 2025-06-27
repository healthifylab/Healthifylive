// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
  authDomain: "healthify-lab.firebaseapp.com",
  projectId: "healthify-lab",
  storageBucket: "healthify-lab.firebasestorage.app",
  messagingSenderId: "297003315332",
  appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1",
  measurementId: "G-R0R3RYERZW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
// Final firebase config here
