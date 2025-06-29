// routes/BookingForm.jsx

import React, { useState } from "react";
import { allTests } from "./allTests";
import { allProfiles } from "./allProfiles";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    pincode: "",
    date: "",
    time: "",
    selectedTests: [],
    selectedProfiles: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: Array.from(value, (option) => option.value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking successful! Thank you.");
    console.log("Form Data:", formData);
    // Firebase/WhatsApp/email logic can be added here
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white rounded-xl shadow-md mt-4">
      <h2 className="text-xl font-bold text-center mb-4">Book a Test</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input name="name" placeholder="Name" required onChange={handleChange} className="border p-2 rounded" />
        <input name="age" placeholder="Age" required onChange={handleChange} className="border p-2 rounded" />
        <select name="gender" required onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input name="mobile" placeholder="Mobile" required onChange={handleChange} className="border p-2 rounded" />
        <input name="address" placeholder="Address" required onChange={handleChange} className="border p-2 rounded" />
        <input name="pincode" placeholder="Pincode" required onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="date" required onChange={handleChange} className="border p-2 rounded" />
        <input type="time" name="time" required onChange={handleChange} className="border p-2 rounded" />

        {/* Test Selection */}
        <label className="font-semibold">Select Tests</label>
        <select
          multiple
          value={formData.selectedTests}
          onChange={(e) => handleMultiSelectChange("selectedTests", e.target.selectedOptions)}
          className="border p-2 rounded h-32"
        >
          {allTests.map((test, index) => (
            <option key={index} value={test.name}>
              {test.name} — <span className="line-through text-red-500">₹{test.mrp}</span> <span className="text-green-600">₹{test.price}</span>
            </option>
          ))}
        </select>

        {/* Profile Selection */}
        <label className="font-semibold">Select Profiles</label>
        <select
          multiple
          value={formData.selectedProfiles}
          onChange={(e) => handleMultiSelectChange("selectedProfiles", e.target.selectedOptions)}
          className="border p-2 rounded h-32"
        >
          {allProfiles.map((profile, index) => (
            <option key={index} value={profile.name}>
              {profile.name} — <span className="line-through text-red-500">₹{profile.mrp}</span> <span className="text-green-600">₹{profile.price}</span>
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
