// ✅ PDF Generator for Booking Confirmation using jsPDF

import jsPDF from "jspdf";

export function generateBookingPDF(data) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Healthify Lab - Booking Confirmation", 20, 20);
  doc.setFontSize(12);
  doc.text(`Booking ID: ${data.bookingId || 'N/A'}`, 20, 35);
  doc.text(`Patient Name: ${data.name}`, 20, 45);
  doc.text(`Email: ${data.email || 'Not Provided'}`, 20, 55);
  doc.text(`Mobile: ${data.mobile}`, 20, 65);
  doc.text(`Age: ${data.age}`, 20, 75);
  doc.text(`Address: ${data.address}`, 20, 85);
  doc.text(`Landmark: ${data.landmark}`, 20, 95);
  doc.text(`Pincode: ${data.pincode}`, 20, 105);
  doc.text(`Selected Tests/Profiles: ${data.selectedTests.join(", ")}`, 20, 115);
  doc.text(`Total Amount: ₹${data.totalPrice}`, 20, 125);

  doc.setFontSize(10);
  doc.text("Thank you for choosing Healthify Lab. We’ll contact you soon.", 20, 145);

  return doc.output("blob");
}
