// scripts/Firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
  authDomain: "healthify-lab.firebaseapp.com",
  projectId: "healthify-lab",
  storageBucket: "healthify-lab.firebasestorage.app",
  messagingSenderId: "297003315332",
  appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function sendOTP(phoneNumber) {
  const recaptchaContainer = document.getElementById("recaptcha-container");
  if (!recaptchaContainer) return Promise.reject("Recaptcha container missing");
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
      size: "invisible",
      callback: () => {}
    }, auth);
  }
  return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
}

export function sendEmailLink(email) {
  const actionCodeSettings = {
    url: "https://healthifylive.vercel.app/login.html",
    handleCodeInApp: true
  };
  return auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem("emailForSignIn", email);
      document.getElementById("loginStatus").textContent = "📧 Login link sent to your email!";
    })
    .catch(error => {
      console.error("Email link error:", error);
      document.getElementById("loginStatus").textContent = "❌ Failed to send link.";
    });
}
