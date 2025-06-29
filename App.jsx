import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import PromoPopup from "./PromoPopup";
import Hero from "./Hero";
import BookingForm from "./BookingForm";
import SearchBar from "./SearchBar";
import AdminPanel from "./AdminPanel";
import { allTests } from "./allTests";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="w-[59%] mx-auto pt-5">
        <SearchBar allTests={allTests} />
      </div>
      <PromoPopup />
      <Hero />
      <Routes>
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
