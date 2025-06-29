// components/BookingForm.jsx
import React, { useState, useEffect } from "react";
import { allTests } from "../data/allTests";
import { allProfiles } from "../data/allProfiles";

const BookingForm = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    pincode: "",
    date: "",
    time: "",
    selectedTests: [],
    selectedProfiles: [],
    location: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setForm((prev) => ({
        ...prev,
        location: `${position.coords.latitude}, ${position.coords.longitude}`,
      }));
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e, type) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);
    setForm({ ...form, [type]: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Send data to Firebase here or trigger WhatsApp/Email
    console.log("Booking Submitted:", form);
    alert("Booking confirmed! ✅");
  };

  return (
    <form
      className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Book a Test</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" placeholder="Patient Name" onChange={handleChange} required className="border p-3 rounded" />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required className="border p-3 rounded" />
        <select name="gender" onChange={handleChange} required className="border p-3 rounded">
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required className="border p-3 rounded" />
        <input name="address" placeholder="Full Address" onChange={handleChange} required className="border p-3 rounded col-span-2" />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required className="border p-3 rounded" />
        <input type="date" name="date" onChange={handleChange} required className="border p-3 rounded" />
        <input type="time" name="time" onChange={handleChange} required className="border p-3 rounded" />

        <select multiple onChange={(e) => handleMultiSelect(e, "selectedTests")} className="border p-3 rounded h-40">
          {allTests.map((test, index) => (
            <option key={index} value={test.name}>
              {test.name} – ₹<s>{test.mrp}</s> ₹{test.discounted}
            </option>
          ))}
        </select>

        <select multiple onChange={(e) => handleMultiSelect(e, "selectedProfiles")} className="border p-3 rounded h-40">
          {allProfiles.map((profile, index) => (
            <option key={index} value={profile.name}>
              {profile.name} – ₹<s>{profile.mrp}</s> ₹{profile.discounted}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="mt-6 bg-green-600 text-white py-2 px-6 rounded-xl hover:bg-green-700"
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
