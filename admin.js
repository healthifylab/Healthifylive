// admin.js
import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import {
  collection, getDocs, updateDoc, doc
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

const loginBox = document.getElementById("login-box");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const errorEl = document.getElementById("login-error");
const table = document.getElementById("bookingTable");

loginBtn.addEventListener('click', async () => {
  const email = emailEl.value.trim();
  const password = passEl.value.trim();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    errorEl.innerText = "Login failed: " + err.message;
  }
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginBox.style.display = 'none';
    dashboard.style.display = 'block';
    const querySnapshot = await getDocs(collection(db, "bookings"));
    table.innerHTML = '';
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${data.name}</td>
        <td>${(data.tests || []).join(", ")}</td>
        <td>${(data.profiles || []).join(", ")}</td>
        <td><strong>${data.status || 'Pending'}</strong></td>
        <td>
          <button onclick="updateStatus('${docSnap.id}', 'Confirmed')">✅</button>
          <button onclick="updateStatus('${docSnap.id}', 'Rejected')">❌</button>
          <button onclick="updateStatus('${docSnap.id}', 'Hold')">⏸</button>
        </td>
      `;
      table.appendChild(tr);
    });
  }
});

// Define updateStatus globally
window.updateStatus = async (id, status) => {
  const bookingRef = doc(db, "bookings", id);
  await updateDoc(bookingRef, { status });
  alert("Status updated to " + status);
  location.reload();
};
