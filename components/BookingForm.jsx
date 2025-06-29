// components/BookingForm.jsx
import React, { useState } from "react";
import { allTests } from "../data/allTests";
import { allProfiles } from "../data/allProfiles";
// import { db } from "../firebase"; // Uncomment if using Firebase
// import { collection, addDoc } from "firebase/firestore";

const BookingForm = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    pincode: "",
    location: "",
    date: "",
    time: "",
    tests: [],
    profiles: [],
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e, field) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, [field]: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Push to Firebase
    // try {
    //   await addDoc(collection(db, "bookings"), form);
    //   setSuccess(true);
    // } catch (error) {
    //   console.error("Booking failed:", error);
    // }

    console.log("Booking Data:", form);
    setSuccess(true);

    // Optional: WhatsApp Alert
    window.open(
      `https://wa.me/91${form.mobile}?text=Hi ${form.name}, your Healthify test booking is confirmed for ${form.date} at ${form.time}.`,
      "_blank"
    );
  };

  // Get user's location (basic geo)
  React.useEffect(() => {
    navigator.geolocation?.getCurrentPosition((pos) => {
      const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
      setForm((prev) => ({ ...prev, location: coords }));
    });
  }, []);

  return (
    <div id="booking" className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center t
      
