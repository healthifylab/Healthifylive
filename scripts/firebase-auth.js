// firebase-auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config (from your project)
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
const auth = getAuth(app);

// Recaptcha setup
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved - allow signInWithPhoneNumber.
    console.log("Recaptcha verified");
  }
}, auth);

// Send OTP
export function sendOTP(phoneNumber) {
  return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
}

// Logout
export function logout() {
  return signOut(auth);
}

export { auth };
