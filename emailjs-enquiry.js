// emailjs-enquiry.js
// Include EmailJS SDK from CDN
import emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";

emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS user ID

document.getElementById("enquiry-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => {
      alert("✅ Enquiry sent successfully!");
      this.reset();
    }, (error) => {
      alert("❌ Failed to send enquiry. " + error.text);
    });
});
