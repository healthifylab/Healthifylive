// firebase-auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

let recaptchaVerifier;
function getOrCreateRecaptcha(auth) {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {},
    });
  }
  return recaptchaVerifier;
}

export function sendOTP(phone) {
  const verifier = getOrCreateRecaptcha(auth);
  return signInWithPhoneNumber(auth, phone, verifier);
}

export function startOTPLogin() {
  const phone = document.getElementById("phoneInput").value.trim();
  if (!phone.startsWith("+91")) {
    alert("Include +91 before number");
    return;
  }

  sendOTP(phone)
    .then((confirmationResult) => {
      const code = prompt("Enter OTP:");
      return confirmationResult.confirm(code);
    })
    .then((result) => {
      alert("✅ Logged in as " + result.user.phoneNumber);
    })
    .catch((error) => {
      alert("❌ OTP failed: " + error.message);
    });
}

export { auth };
