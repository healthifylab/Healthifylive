import React, { useState } from "react";
import { allTests } from "./allTests";
import { allProfiles } from "./allProfiles";

const BookingForm = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    mobile: "",
    address: "",
    pincode: "",
    date: "",
    time: "",
    selectedTests: [],
    selectedProfiles: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((v) => v !== value)
        : [...prev[name], value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Submitted", form);
    alert("✅ Booking Submitted Successfully!");
    // Optional: Send to Firebase or WhatsApp
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Book a Lab Test</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Patient Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="age"
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            name="mobile"
            placeholder="Mobile Number"
            type="tel"
            value={form.mobile}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
        </div>

        <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold text-blue-700">Select Tests:</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {allTests.map((test, i) => (
              <label key={i} className="text-sm">
                <input
                  type="checkbox"
                  checked={form.selectedTests.includes(test.name)}
                  onChange={() => handleMultiSelect("selectedTests", test.name)}
                />{" "}
                {test.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold text-blue-700">Select Profiles:</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {allProfiles.map((p, i) => (
              <label key={i} className="text-sm">
                <input
                  type="checkbox"
                  checked={form.selectedProfiles.includes(p.name)}
                  onChange={() => handleMultiSelect("selectedProfiles", p.name)}
                />{" "}
                {p.name}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
