<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Panel – Healthify Lab</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- Header -->
  <header>
    <img src="logo.png" alt="Healthify Logo" class="logo" />
    <nav class="top-nav">
      <a href="index.html">🏠 Home</a>
      <a href="about.html">ℹ️ About</a>
      <a href="contact.html">📬 Contact Us</a>
      <a href="booking.html">🧾 Book a Test</a>
      <a href="admin.html">🔒 Admin</a>
    </nav>
  </header>

  <!-- Admin Panel -->
  <section class="admin-section">
    <h2>🔒 Admin Panel</h2>
    <table id="bookingsTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Mobile</th>
          <th>Address</th>
          <th>Date</th>
          <th>Test(s)</th>
          <th>Profile(s)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>

  <!-- Footer -->
  <footer>
    <p>📞 +91-9503832889 | ✉️ report@healthifylab.com</p>
    <p>&copy; 2025 Healthify Lab. All rights reserved.</p>
  </footer>

  <!-- Firebase & Admin Script -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

    // Your Firebase config (replace with real values)
    const firebaseConfig = {
      apiKey: "YOUR_FIREBASE_KEY",
      authDomain: "YOUR_PROJECT.firebaseapp.com",
      databaseURL: "https://YOUR_PROJECT.firebaseio.com",
      projectId: "YOUR_PROJECT",
      storageBucket: "YOUR_PROJECT.appspot.com",
      messagingSenderId: "XXXXXX",
      appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // Reference to bookings
    const bookingsRef = ref(db, 'bookings');
    const tableBody = document.querySelector("#bookingsTable tbody");

    // Listen for data
    onValue(bookingsRef, (snapshot) => {
      tableBody.innerHTML = ""; // clear
      snapshot.forEach((child) => {
        const b = child.val();
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${b.name}</td>
          <td>${b.mobile}</td>
          <td>${b.address}</td>
          <td>${b.date} ${b.time || ""}</td>
          <td>${(b.selectedTests || []).join(", ")}</td>
          <td>${(b.selectedProfiles || []).join(", ")}</td>
          <td>${b.status || "Pending"}</td>
        `;
        tableBody.appendChild(row);
      });
    });
  </script>

</body>
</html>
