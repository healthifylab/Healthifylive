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
  emailjs.send("service_z3ac4pk", "template_5v6t6ku", data, "dJE_JHAoNTxxzTxiT)
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
    }, (err) => {
      alert("Failed to send. Please try again.");
      console.error(err);
    });
});
