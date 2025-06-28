// auth.js
import { auth, db } from './firebase.js';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

import {
  collection,
  addDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

const bookingForm = document.querySelector("form");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please login to book tests.");
    window.location.href = "/";
  }
});

bookingForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(bookingForm);
  const selectedTests = formData.getAll("tests");
  const selectedProfiles = formData.getAll("profiles");

  const payload = {
    name: formData.get("name"),
    age: formData.get("age"),
    sex: formData.get("sex"),
    address: formData.get("address"),
    bookingTime: formData.get("bookingTime"),
    appointmentTime: formData.get("appointmentTime"),
    mobile: formData.get("mobile"),
    tests: selectedTests,
    profiles: selectedProfiles,
    uid: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    status: "Pending"
  };

  try {
    await addDoc(collection(db, "bookings"), payload);
    alert("Booking submitted successfully!");
    bookingForm.reset();
  } catch (err) {
    alert("Error saving booking: " + err.message);
  }
});
// Firebase Auth logic
