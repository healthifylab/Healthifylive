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
emailjs.init(dJE_JHAoNTxxzTxiT);

function submitBooking() {
  const form = document.getElementById("booking-form");
  if (form) {
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      test: formData.get("test")
    };

    // Save to Firestore
    firebase.firestore().collection("bookings").add(data)
      .then(() => {
        // Send EmailJS
        emailjs.send("service_z3ac4pk", "template_5v6t6ku", data)
          .then(() => alert("Booking submitted successfully!"))
          .catch(error => console.error("EmailJS error:", error));
      })
      .catch(error => console.error("Firestore error:", error));
  }
}
