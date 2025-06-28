// emailjs-enquiry.js
document.getElementById("enquiry-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = this;
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  // Replace with your own EmailJS service info
  emailjs.send("service_id", "template_id", data, "public_key")
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
    }, (err) => {
      alert("Failed to send. Please try again.");
      console.error(err);
    });
});
