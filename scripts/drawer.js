// scripts/Drawer.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier, sendSignInLinkToEmail, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
    authDomain: "healthify-lab.firebaseapp.com",
    databaseURL: "https://healthify-lab-default-rtdb.firebaseio.com",
    projectId: "healthify-lab",
    storageBucket: "healthify-lab.firebasestorage.app",
    messagingSenderId: "297003315332",
    appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1",
    measurementId: "G-R0R3RYERZW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
    size: "invisible"
}, auth);

document.addEventListener("DOMContentLoaded", () => {
    const drawer = document.createElement('div');
    drawer.id = "swipeDrawer";
    drawer.innerHTML = `
        <div class="drawer-header">
            <span>☰  .         HEALTHIFY</span>
            <button id="closeDrawer">✖️</button>
        </div>
        <ul>
            <li><a href="/index.html">🏠 Home</a></li>
            <li><a href="/contact.html">📞 Contact</a></li>
            <li><a href="/booking.html">🧪 Book a Test</a></li>
            <li><a href="/cart.html">🛒 My Cart</a></li>
            <li>
                <button id="loginBtn" style="background: none; border: none; color: #2E2E2E; font-size: 16px; text-align: left; width: 100%; padding: 10px; cursor: pointer;">ℹ️ Login</button>
                <div id="loginForm" style="display: none; padding: 10px;">
                    <input type="email" id="emailInput" placeholder="Enter email" style="width: 100%; padding: 5px; margin-bottom: 5px;">
                    <input type="password" id="passwordInput" placeholder="Enter password" style="width: 100%; padding: 5px; margin-bottom: 5px;">
                    <button id="signInBtn" style="background: #28a745; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; width: 100%; margin-bottom: 5px;">Sign In</button>
                    <button id="signUpBtn" style="background: #17a2b8; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; width: 100%; margin-bottom: 5px;">Sign Up</button>
                    <button id="phoneSignInBtn" style="background: #ffc107; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; width: 100%;">Phone Sign In</button>
                </div>
                <div id="phoneForm" style="display: none; padding: 10px;">
                    <input type="tel" id="phoneInput" placeholder="Enter phone (e.g., +919503832889)" style="width: 100%; padding: 5px; margin-bottom: 5px;">
                    <div id="recaptcha-container"></div>
                    <button id="sendCodeBtn" style="background: #007bff; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; width: 100%; margin-bottom: 5px;">Send Code</button>
                    <input type="text" id="verificationCode" placeholder="Enter code" style="width: 100%; padding: 5px; margin-bottom: 5px;">
                    <button id="verifyCodeBtn" style="background: #28a745; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; width: 100%;">Verify</button>
                </div>
                <div id="userInfo" style="padding: 10px; color: #28a745;"></div>
            </li>
            <li><a>Healthify 2025 All rights reserved</a></li>
        </ul>
    `;
    drawer.classList.add("drawer");

    document.body.appendChild(drawer);

    const openBtn = document.createElement("button");
    openBtn.innerText = "☰";
    openBtn.id = "openDrawer";
    document.body.appendChild(openBtn);

    openBtn.onclick = () => drawer.classList.add("open");
    drawer.querySelector("#closeDrawer").onclick = () => drawer.classList.remove("open");

    const style = document.createElement("style");
    style.textContent = `
        .drawer { position: fixed; top: 0; left: -250px; width: 250px; height: 100%; background: #fff; transition: left 0.3s; z-index: 1000; box-shadow: 2px 0 5px rgba(0,0,0,0.2); }
        .drawer.open { left: 0; }
        .drawer-header { display: flex; justify-content: space-between; padding: 10px; background: #00a884; color: white; }
        .drawer ul { list-style: none; padding: 0; }
        .drawer ul li { padding: 10px; }
        .drawer ul li a { text-decoration: none; color: #2E2E2E; font-size: 16px; }
        #openDrawer { position: fixed; top: 10px; left: 10px; font-size: 24px; background: #00a884; color: white; border: none; cursor: pointer; z-index: 1001; }
    `;
    document.head.appendChild(style);

    // Login Functionality
    const loginBtn = document.getElementById("loginBtn");
    const loginForm = document.getElementById("loginForm");
    const phoneForm = document.getElementById("phoneForm");
    const userInfo = document.getElementById("userInfo");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const signInBtn = document.getElementById("signInBtn");
    const signUpBtn = document.getElementById("signUpBtn");
    const phoneSignInBtn = document.getElementById("phoneSignInBtn");
    const phoneInput = document.getElementById("phoneInput");
    const sendCodeBtn = document.getElementById("sendCodeBtn");
    const verificationCode = document.getElementById("verificationCode");
    const verifyCodeBtn = document.getElementById("verifyCodeBtn");
    let verificationId;

    loginBtn.addEventListener("click", () => {
        loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
        phoneForm.style.display = "none";
        userInfo.innerHTML = "";
    });

    signInBtn.addEventListener("click", () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Signed in successfully!");
                updateUserInfo(userCredential.user);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });

    signUpBtn.addEventListener("click", () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Account created successfully! Please verify your email.");
                updateUserInfo(userCredential.user);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });

    phoneSignInBtn.addEventListener("click", () => {
        loginForm.style.display = "none";
        phoneForm.style.display = "block";
    });

    sendCodeBtn.addEventListener("click", () => {
        const phoneNumber = phoneInput.value;
        signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {
                verificationId = confirmationResult.verificationId;
                alert("Code sent! Please check your phone.");
            })
            .catch((error) => {
                alert("Error: " + error.message);
                window.recaptchaVerifier.render().then((widgetId) => {
                    window.recaptchaVerifier.reset(widgetId);
                });
            });
    });

    verifyCodeBtn.addEventListener("click", () => {
        const code = verificationCode.value;
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
        auth.signInWithCredential(credential)
            .then((userCredential) => {
                alert("Phone number verified and signed in!");
                updateUserInfo(userCredential.user);
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginForm.style.display = "none";
            phoneForm.style.display = "none";
            updateUserInfo(user);
        } else {
            userInfo.innerHTML = "";
        }
    });

    function updateUserInfo(user) {
        userInfo.innerHTML = `Welcome, ${user.email || user.phoneNumber}! <button id="signOutBtn" style="background: #dc3545; color: #fff; border: none; padding: 5px 10px; border-radius: 5px; margin-left: 10px;">Sign Out</button>`;
        document.getElementById("signOutBtn").addEventListener("click", () => {
            signOut(auth).then(() => {
                alert("Signed out successfully!");
                userInfo.innerHTML = "";
                loginForm.style.display = "block";
            }).catch((error) => {
                alert("Error: " + error.message);
            });
        });
    }
});
