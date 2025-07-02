// Firebase config (from your provided credentials)

const firebaseConfig = {

  apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",

  authDomain: "healthify-lab.firebaseapp.com",

  projectId: "healthify-lab",

  storageBucket: "healthify-lab.firebasestorage.app",

  messagingSenderId: "297003315332",

  appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1",

  measurementId: "G-R0R3RYERZW"

};



firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();



// --- Phone OTP Login ---

let confirmationResult;



window.sendOTP = function () {

  const phoneNumber = document.getElementById("phoneInput").value;

  const appVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {

    size: "invisible"

  });



  auth.signInWithPhoneNumber(phoneNumber, appVerifier)

    .then(result => {

      confirmationResult = result;

      document.getElementById("loginStatus").textContent = "✅ OTP sent to " + phoneNumber;

    })

    .catch(err => {

      console.error(err);

      alert("❌ Error sending OTP: " + err.message);

    });

};



window.verifyOTP = function () {

  const otp = document.getElementById("otpInput").value;



  confirmationResult.confirm(otp)

    .then(result => {

      const user = result.user;

      document.getElementById("loginStatus").textContent = "✅ Logged in as " + user.phoneNumber;

      localStorage.setItem("user", JSON.stringify({ phone: user.phoneNumber }));

      window.location.href = "index.html";

    })

    .catch(err => {

      console.error(err);

      alert("❌ Incorrect OTP");

    });

};



// --- Email Link Login ---

window.sendEmailLink = function () {

  const email = document.getElementById("emailInput").value;



  const actionCodeSettings = {

    url: window.location.href,

    handleCodeInApp: true

  };



  auth.sendSignInLinkToEmail(email, actionCodeSettings)

    .then(() => {

      window.localStorage.setItem("emailForSignIn", email);

      document.getElementById("loginStatus").textContent = "📨 Login link sent to " + email;

    })

    .catch(err => {

      console.error(err);

      alert("❌ Failed to send email link: " + err.message);

    });

};



// Handle email login callback

if (auth.isSignInWithEmailLink(window.location.href)) {

  let email = window.localStorage.getItem("emailForSignIn");

  if (!email) email = window.prompt("Please enter your email");



  auth.signInWithEmailLink(email, window.location.href)

    .then(result => {

      document.getElementById("loginStatus").textContent = "✅ Logged in as " + result.user.email;

      localStorage.setItem("user", JSON.stringify({ email: result.user.email }));

      window.location.href = "index.html";

    })

    .catch(err => {

      console.error(err);

      alert("❌ Login failed: " + err.message);

    });

}

