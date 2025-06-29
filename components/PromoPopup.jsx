// components/PromoPopup.jsx
import React, { useState, useEffect } from "react";

const PromoPopup = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-white p-4 rounded-lg shadow-xl border">
      <p className="text-lg font-bold text-blue-700">🎉 Full Body Checkup @ ₹499!</p>
      <p className="text-sm text-gray-600">Book Now | Free Sample Collection | Same-Day Reports</p>
      <button onClick={() => setVisible(false)} className="absolute top-2 right-3 text-gray-500 text-xl">×</button>
    </div>
  );
};

export default PromoPopup;
