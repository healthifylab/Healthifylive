// scripts/lead-submission.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
    authDomain: "healthify-lab.firebaseapp.com",
    projectId: "healthify-lab",
    storageBucket: "healthify-lab.firebasestorage.app",
    messagingSenderId: "297003315332",
    appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1"
};

console.log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized, setting up Firestore...");
const db = getFirestore(app);

document.getElementById("callBackForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const submissionStatus = document.getElementById("submissionStatus");
    console.log("Form submitted:", { name, mobile, email });

    if (!name || !mobile.match(/^\+91[0-9]{10}$/)) {
        submissionStatus.className = "error";
        submissionStatus.textContent = "❌ Please enter a valid name and mobile number (+91 followed by 10 digits).";
        return;
    }

    submissionStatus.textContent = "📞 Submitting your request...";
    try {
        console.log("Attempting to save lead to Firestore...");
        await addDoc(collection(db, "leads"), {
            name: name,
            mobile: mobile,
            email: email || "Not provided",
            timestamp: new Date().toISOString(),
            status: "New Enquiry"
        });
        console.log("Lead saved successfully!");
        submissionStatus.className = "success";
        submissionStatus.textContent = "✅ Request submitted! We’ll call you soon.";
        document.getElementById("callBackForm").reset();
        setTimeout(() => window.close(), 2000); // Close window after 2 seconds
    } catch (error) {
        console.error("Error submitting lead:", error);
        submissionStatus.className = "error";
        submissionStatus.textContent = `❌ Failed to submit: ${error.message}. Try again or contact support.`;
    }
});
