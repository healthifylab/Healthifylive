// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore, collection, getDocs, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  // 🔐 Use your actual Firebase project config
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "healthify-lab",
  storageBucket: "healthify-lab.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const bookingList = document.getElementById("booking-list");

async function loadBookings() {
  const snapshot = await getDocs(collection(db, "bookings"));
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const id = docSnap.id;

    const container = document.createElement("div");
    container.style.border = "1px solid #ccc";
    container.style.padding = "10px";
    container.style.marginBottom = "15px";
    container.style.borderRadius = "8px";

    container.innerHTML = `
      <strong>${data.name} (${data.age} yrs, ${data.sex})</strong><br/>
      📞 ${data.mobile}<br/>
      🏠 ${data.address}<br/>
      🧪 Tests: ${data.tests || '—'}<br/>
      📋 Profiles: ${data.profiles || '—'}<br/>
      📅 Appointment: ${data.appointmentDateTime}<br/>
      <strong>Status: ${data.status || "Pending"}</strong><br/><br/>
    `;

    const actions = document.createElement("div");

    ["Confirm", "Hold", "Reject", "Reschedule"].forEach((status) => {
      const btn = document.createElement("button");
      btn.textContent = status;
      btn.style.marginRight = "8px";
      btn.onclick = async () => {
        await updateDoc(doc(db, "bookings", id), { status });
        alert(`Booking marked as ${status}`);
        window.location.reload();
      };
      actions.appendChild(btn);
    });

    container.appendChild(actions);
    bookingList.appendChild(container);
  });
}

loadBookings();
