// ✅ Send confirmation email using EmailJS and PDF attachment
import emailjs from '@emailjs/browser';
import { generateBookingPDF } from './pdfgenerator';

export async function sendConfirmationEmail(formData) {
  try {
    const pdfBlob = generateBookingPDF(formData);
    const reader = new FileReader();

    reader.onloadend = async function () {
      const base64PDF = reader.result.split(',')[1]; // Remove the data prefix

      const templateParams = {
        to_name: formData.name,
        to_email: formData.email || 'report@healthifylab.com',
        mobile: formData.mobile,
        tests: formData.selectedTests.join(', '),
        total: `₹${formData.totalPrice}`,
        booking_id: formData.bookingId || 'N/A',
        pdf_file: base64PDF,
      };

      await emailjs.send(
        'service_z3ac4pk',         // ✅ Replace with your service ID
        'template_5v6t6ku',        // ✅ Replace with your template ID
        templateParams,
        'dJE_JHAoNTxxzTxiT'        // ✅ Your public key
      );
    };

    reader.readAsDataURL(pdfBlob); // Convert PDF to base64
  } catch (error) {
    console.error('Email send error:', error);
  }
}
