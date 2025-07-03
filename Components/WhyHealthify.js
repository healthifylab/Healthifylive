import React from 'react';

const WhyHealthify = () => {
  return (
    <div className="bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">🔬 Why Choose Healthify Lab?</h2>
        <p className="text-lg text-gray-700 mb-10">
          Your trusted partner in preventive healthcare.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-2">💉 Hassle-Free Sample Collection</h3>
            <p>No need to visit a lab—our technician comes to your doorstep.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-2">🧪 Advanced Diagnostics</h3>
            <p>State-of-the-art labs ensure accurate and reliable results.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-2">🚚 Fast Turnaround</h3>
            <p>Get your reports within 24–48 hours via email and WhatsApp.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-2">📍 We Serve Mumbai Region</h3>
            <p>We cover Mumbai, Navi Mumbai, and Thane areas for sample collection.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-2">✅ 1000+ Happy Customers</h3>
            <p>Trusted by families across the city for preventive care.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-2">📞 Book Today</h3>
            <p>Your health deserves the best—schedule your test now with Healthify Lab!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyHealthify;
