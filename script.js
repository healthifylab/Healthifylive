// script.js

// Firebase config
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Booking form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.name.value;
      const mobile = form.mobile.value;
      const address = form.address.value;
      const date = form.date.value;
      const test = form.test.value;
      const profile = form.profile.value;

      if (!name || !mobile || !address || !date) {
        alert("Please fill all required fields.");
        return;
      }

      // Save to Firebase
      const bookingRef = ref(db, "bookings/");
      await push(bookingRef, {
        name,
        mobile,
        address,
        date,
        test,
        profile,
        status: "Pending"
      });

      // WhatsApp alert (optional)
      const whatsappMessage = `New Booking:\nName: ${name}\nMobile: ${mobile}\nDate: ${date}\nTest: ${test}\nProfile: ${profile}`;
      const whatsappURL = `https://wa.me/919999999999?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappURL, "_blank");

      alert("Booking confirmed. We'll contact you shortly.");
      form.reset();
    });
  }
});
