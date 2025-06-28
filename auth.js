// auth.js
import app from "./firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const db = getFirestore(app);
const form = document.getElementById("booking-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const bookingData = {};

  for (let [key, value] of formData.entries()) {
    bookingData[key] = value;
  }

  bookingData.createdAt = serverTimestamp();
  bookingData.status = "Pending";

  try {
    await addDoc(collection(db, "bookings"), bookingData);
    alert("✅ Booking submitted successfully!");
    form.reset();
  } catch (err) {
    alert("❌ Error saving booking: " + err.message);
  }
});
