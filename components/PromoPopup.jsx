// components/PromoPopup.jsx
import React, { useState, useEffect } from "react";

const PromoPopup = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 10000); // hide after 10 sec
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 bg-white p-4 border border-blue-200 rounded-xl shadow-lg max-w-sm w-full">
      <button
        onClick={() => setShow(false)}
        className="absolute top-2 right-3 text-gray-600 text-lg font-bold"
      >
        ×
      </button>
      <h2 className="text-lg font-semibold text-blue-700">🎉 Full Body Checkup @ ₹499!</h2>
      <p className="text-sm text-gray-600 mt-1">
        Home Sample Collection | Same-Day Report
      </p>
      <a
        href="#booking"
        className="mt-3 inline-block bg-green-600 text-white px-4 py-1 rounded shadow hover:bg-green-700 text-sm"
      >
        Book Now
      </a>
    </div>
  );
};

export default PromoPopup;
