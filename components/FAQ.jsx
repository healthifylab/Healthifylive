import React, { useState } from "react";

const faqs = [
  {
    question: "Is sample collection free?",
    answer: "Yes, home sample collection is completely free of charge."
  },
  {
    question: "When will I get the report?",
    answer: "Most reports are delivered on the same day via WhatsApp and email."
  },
  {
    question: "Do I need to fast before tests?",
    answer: "Some tests require fasting. We'll notify you in advance if needed."
  },
  {
    question: "Can I book multiple profiles and tests?",
    answer: "Yes, you can book multiple tests and profiles at the same time."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-center mb-6">❓ Frequently Asked Questions</h2>
      {faqs.map((faq, i) => (
        <div key={i} className="border-b py-3 cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <p className="text-lg font-semibold text-blue-700">{faq.question}</p>
            <span>{openIndex === i ? "−" : "+"}</span>
          </div>
          {openIndex === i && <p className="text-gray-600 mt-2">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
