// firebase-auth.js

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
  authDomain: "healthify-lab.firebaseapp.com",
  projectId: "healthify-lab",
  storageBucket: "healthify-lab.firebasestorage.app",
  messagingSenderId: "297003315332",
  appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1",
  measurementId: "G-R0R3RYERZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Export auth and OTP login helper
export { auth };

export function sendOTP(phoneNumber) {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
    callback: () => {}
  }, auth);

  return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
}
