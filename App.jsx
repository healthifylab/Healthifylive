// 📁 File: src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PromoPopup from "./components/PromoPopup";
import Hero from "./components/Hero";
import BookingForm from "./components/BookingForm";
import SearchBar from "./components/SearchBar";
import AdminPanel from "./components/AdminPanel";
import { allTests } from "./data/allTests";

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
