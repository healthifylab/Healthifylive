function sendMail() {
  emailjs.send("service_xxxxxx", "template_yyyyyy", {
    name: document.querySelector('#enquiryForm input[name=name]').value,
    email: document.querySelector('#enquiryForm input[name=email]').value,
    query: document.querySelector('#enquiryForm textarea[name=query]').value
  }, "user_public_key_zzz");
}