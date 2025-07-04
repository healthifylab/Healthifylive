// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
  authDomain: "https://healthify-lab.firebaseapp.com",
  projectId: "healthify-lab",
  storageBucket: "healthify-lab.firebasestorage.app",
  messagingSenderId: "297003315332",
  appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1"
};
firebase.initializeApp(firebaseConfig);

// Initialize EmailJS
emailjs.init("dJE_JHAoNTxxzTxiT");

function submitBooking() {
  const form = document.getElementById("booking-form");
  if (form) {
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      age: formData.get("age"),
      sex: formData.get("sex"),
      address: formData.get("address"),
      location: formData.get("location"),
      landmark: formData.get("landmark"),
      pincode: formData.get("pincode"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      appointment_date: formData.get("appointment_date"),
      appointment_time: formData.get("appointment_time"),
      fetch_tests_data from: public-tests-data.json ("tests")
      fetch_profiles_data from: public-tests.json ("profiles")
    };

    // Generate booking ID
    const bookingId = `HFL${Date.now()}`;

    // Save to Firestore
    firebase.firestore().collection("bookings").doc(bookingId).set(data)
      .then(() => {
        // Send EmailJS
        emailjs.send("service_z3ac4pk", "template_5v6t6ku", {
          ...data,
          booking_id: bookingId,
          tests: data.tests.join(", "),
          profiles: data.profiles.join(", ")
        })
          .then(() => {
            // Show confirmation
            const confirmation = document.getElementById("confirmation");
            confirmation.style.display = "block";
            confirmation.textContent = `Booking successful! Your Booking ID: ${bookingId}`;

            // Generate PDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text("Healthify Booking Receipt", 10, 10);
            doc.text(`Booking ID: ${bookingId}`, 10, 20);
            doc.text(`Name: ${data.name}`, 10, 30);
            doc.text(`Mobile: ${data.mobile}`, 10, 40);
            doc.text(`Tests: ${data.tests.join(", ")}`, 10, 50);
            doc.text(`Profiles: ${data.profiles.join(", ")}`, 10, 60);
            doc.text(`Date: ${data.appointment_date}`, 10, 70);
            doc.text(`Time: ${data.appointment_time}`, 10, 80);
            doc.save(`Healthify_Booking_${bookingId}.pdf`);
          })
          .catch(error => console.error("EmailJS error:", error));
      })
      .catch(error => console.error("Firestore error:", error));
  }
}

// Pre-fill selected tests/profiles
document.addEventListener("DOMContentLoaded", () => {
  const selectedTests = JSON.parse(localStorage.getItem("selectedTests") || "[]");
  if (selectedTests.length > 0) {
    const testDropdown = document.getElementById("test-dropdown");
    const profileDropdown = document.getElementById("profile-dropdown");
    selectedTests.forEach(value => {
      if (testDropdown.querySelector(`option[value="${value}"]`)) {
        testDropdown.querySelector(`option[value="${value}"]`).selected = true;
      }
      if (profileDropdown.querySelector(`option[value="${value}"]`)) {
        profileDropdown.querySelector(`option[value="${value}"]`).selected = true;
      }
    });
    localStorage.removeItem("selectedTests");
  }
});
