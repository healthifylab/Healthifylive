// scripts/generate-report.js
// Requires: jsPDF library
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

window.generateBookingPDF = function () {
  const { jsPDF } = window.jspdf;
  const data = JSON.parse(localStorage.getItem("lastBooking") || "{}");

  if (!data.name) {
    alert("No booking found to generate PDF.");
    return;
  }

  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("🧾 Healthify Booking Confirmation", 20, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  doc.text(`👤 Name: ${data.name}`, 20, 40);
  doc.text(`📱 Mobile: ${data.phone || data.mobile}`, 20, 48);
  doc.text(`📧 Email: ${data.email}`, 20, 56);
  doc.text(`📅 Preferred Date: ${data.date}`, 20, 64);
  doc.text(`🎂 Age: ${data.age}    ⚧ Sex: ${data.sex}`, 20, 72);
  doc.text(`🏠 Address: ${data.address}`, 20, 80);
  doc.text(`📍 Pincode: ${data.pincode} | Landmark: ${data.landmark}`, 20, 88);

  doc.text("🧪 Tests/Profiles Selected:", 20, 100);

  let y = 108;
  let total = 0;
  (data.tests || []).forEach((t, i) => {
    doc.text(`${i + 1}. ${t.TestName || t} – ₹${t.offerPrice || 499}`, 25, y);
    y += 8;
    total += t.offerPrice || 499;
  });

  doc.setFont("helvetica", "bold");
  doc.text(`💰 Total Amount: ₹${total}`, 20, y + 10);

  doc.save("Healthify_Booking.pdf");
};
