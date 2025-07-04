// scripts/firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function sendOTP(phoneNumber) {
  const recaptchaContainer = document.getElementById("recaptcha-container");
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
      size: "invisible",
      callback: (response) => {}
    }, auth);
  }

  return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
}

export function sendEmailLink(email) {
  const actionCodeSettings = {
    url: "http://localhost:3000/login.html",
    handleCodeInApp: true,
  };
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem("emailForSignIn", email);
      document.getElementById("loginStatus").textContent = "📧 Login link sent to your email!";
    })
    .catch((error) => {
      console.error("Email link error:", error);
      document.getElementById("loginStatus").textContent = "❌ Failed to send link.";
    });
}
