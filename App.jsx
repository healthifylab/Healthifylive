import React from "react";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <div className="pt-20">
      <BookingForm />
    </div>
  );
}

export default App;
import BookingForm from "./components/BookingForm";
import FAQ from "./components/FAQ";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import PromoPopup from "./components/PromoPopup";

function App() {
  return (
    <>
      <PromoPopup />
      <BookingForm />
      <FAQ />
      <FloatingWhatsApp />
    </>
  );
}
