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
