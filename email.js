// EmailJS // ✅ EmailJS Integration
import emailjs from '@emailjs/browser';

export const sendEmail = (templateParams) => {
  return emailjs.send(
    'service_z3ac4pk',         // Service ID
    'template_5v6t6ku',        // Template ID
    templateParams,
    'dJE_JHAoNTxxzTxiT'        // Public Key
  );
};
 using provided service/template/public key
