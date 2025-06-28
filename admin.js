// admin.js
import { auth, db } from './firebase.js';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

import {
  collection,
  getDocs,
  updateDoc,
  doc
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

const bookingList = document.getElementById("booking-list");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    const email = prompt("Admin Email:");
    const password = prompt("Admin Password:");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Login failed");
      return;
    }
  }

  loadBookings();
});

async function loadBookings() {
  const snapshot = await getDocs(collection(db, "bookings"));
  bookingList.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "booking-card";
    div.innerHTML = `
      <strong>${data.name}</strong> (${data.age}, ${data.sex})<br>
      📞 ${data.mobile} <br>
      🧪 Tests: ${data.tests?.join(", ") || "-"}<br>
      📋 Profiles: ${data.profiles?.join(", ") || "-"}<br>
      🕓 Booking: ${data.bookingTime}<br>
      🩺 Appointment: ${data.appointmentTime}<br>
      🏷️ Status: <b>${data.status}</b><br>
      <button onclick="updateStatus('${docSnap.id}', 'Confirmed')">Confirm</button>
      <button onclick="updateStatus('${docSnap.id}', 'Hold')">Hold</button>
      <button onclick="updateStatus('${docSnap.id}', 'Rejected')">Reject</button>
    `;
    bookingList.appendChild(div);
  });
}

window.updateStatus = async (id, newStatus) => {
  const ref = doc(db, "bookings", id);
  await updateDoc(ref, { status: newStatus });
  alert("Status updated to " + newStatus);
  loadBookings();
};
// Admin dashboard JS for status control
