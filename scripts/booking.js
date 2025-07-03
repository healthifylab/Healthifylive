// booking.js

import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { auth, sendOTP } from "./firebase-auth.js";

// EmailJS
const EMAIL_SERVICE_ID = "service_z3ac4pk";
const EMAIL_TEMPLATE_ID = "template_5v6t6ku";
const EMAIL_PUBLIC_KEY = "dJE_JHAoNTxxzTxiT";

const db = getFirestore();

export async function submitBooking(data) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const bookingData = {
      ...data,
      uid: user.uid,
      phone: user.phoneNumber,
      createdAt: serverTimestamp(),
    };

    // 1. Save to Firestore
    await addDoc(collection(db, "bookings"), bookingData);

    // 2. Send email using EmailJS
    await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      {
        name: data.name,
        email: data.email,
        phone: user.phoneNumber,
        date: data.date,
        address: data.address,
        tests: data.tests.join(", "),
        pincode: data.pincode,
        landmark: data.landmark,
      },
      EMAIL_PUBLIC_KEY
    );

    alert("✅ Booking submitted & email sent successfully!");
  } catch (error) {
    console.error("❌ Booking error:", error);
    alert("Booking failed. Please try again.");
  }
}

export function startOTPLogin() {
  const phone = document.getElementById("phoneInput").value.trim();
  if (!phone.startsWith("+91")) {
    alert("Please include +91 before mobile number.");
    return;
  }

  sendOTP(phone)
    .then((confirmationResult) => {
      const code = prompt("Enter the OTP you received:");
      return confirmationResult.confirm(code);
    })
    .then((result) => {
      console.log("✅ Logged in:", result.user.phoneNumber);
      alert("Login successful!");
    })
    .catch((error) => {
      console.error("❌ OTP error:", error);
      alert("Failed to verify OTP.");
    });
}

// Footer HTML to be included in all pages
const footerHTML = `
<footer style="text-align: center; padding: 30px 10px; background-color: #f8f8f8; margin-top: 50px;">
  <p style="margin-bottom: 10px;">Follow us on</p>
  <div style="font-size: 24px;">
    <a href="https://twitter.com/healthify_lab" target="_blank" style="margin: 0 10px; color: #1DA1F2;">
      <i class="fab fa-x-twitter"></i>
    </a>
    <a href="https://instagram.com/healthifylab" target="_blank" style="margin: 0 10px; color: #C13584;">
      <i class="fab fa-instagram"></i>
    </a>
    <a href="https://facebook.com/healthify" target="_blank" style="margin: 0 10px; color: #4267B2;">
      <i class="fab fa-facebook"></i>
    </a>
  </div>
  <p style="margin-top: 10px;">&copy; 2025 Healthify Lab. All rights reserved.</p>
</footer>
`;

// Optional: Inject footer dynamically if using JS templates
if (typeof document !== 'undefined') {
  const footerContainer = document.querySelector("footer");
  if (footerContainer) footerContainer.innerHTML = footerHTML;
}
