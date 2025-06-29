// App.jsx
import React from "react";
import SearchBar from "./components/SearchBar";
import BookingForm from "./components/BookingForm";
import AdminPanel from "./components/AdminPanel"; // Optional route
import FAQ from "./components/FAQ";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import PromoPopup from "./components/PromoPopup";

import { allTests } from "./data/allTests";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      {/* 🎉 Promo Popup */}
      <PromoPopup />

      {/* 🔍 Direct Search Bar (outside menu) */}
      <SearchBar allTests={allTests} />

      {/* 🧾 Booking Form */}
      <BookingForm />

      {/* ❓ FAQs */}
      <FAQ />

      {/* 🟢 Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
