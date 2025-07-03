import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I book a blood test?',
    answer: 'Just visit our website, select your test or health profile, fill the booking form, and our technician will visit your home.'
  },
  {
    question: 'Where does Healthify Lab operate?',
    answer: 'We currently serve Mumbai, Navi Mumbai, and Thane.'
  },
  {
    question: 'When will I get my test report?',
    answer: 'Most reports are delivered within 24-48 hours via email and WhatsApp.'
  },
  {
    question: 'Do I need to visit the lab?',
    answer: 'No! We provide home sample collection—no lab visit needed.'
  },
  {
    question: 'Will I get a receipt?',
    answer: 'Yes, you will receive a PDF receipt and booking ID on your email after confirmation.'
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-md p-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left font-medium text-lg flex justify-between items-center"
            >
              {faq.question}
              <span>{activeIndex === index ? '-' : '+'}</span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
