// App.jsx – Final Combined File (Fixed Layout + All Sections)
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookingForm from "./components/BookingForm";
import AdminPanel from "./components/AdminPanel";
import FAQ from "./components/FAQ";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import PromoPopup from "./components/PromoPopup";
import { allTests } from "./data/allTests";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false); // For demo toggle only

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 🎉 Promo Popup */}
      <PromoPopup />

      {/* 🔍 Search Bar Outside Header */}
      <div className="w-[59%] mx-auto pt-5">
        <SearchBar allTests={allTests} />
      </div>

      {/* 📋 Toggle for admin demo (in real use, protect this route) */}
      <div className="text-right pr-6 pt-2">
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="text-xs text-blue-600 underline"
        >
          {isAdmin ? "Switch to User" : "Switch to Admin"}
        </button>
      </div>

      {/* 📋 Admin Panel or Booking View */}
      {isAdmin ? (
        <AdminPanel />
      ) : (
        <>
          <BookingForm />
          <FAQ />
        </>
      )}

      {/* 🟢 WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
