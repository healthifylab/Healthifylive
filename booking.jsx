// Booking.jsx – Full Booking Form with Test Selection
import { useState } from "react";

const testData = [
  { name: "Complete Blood Count (CBC)", type: "Test", price: 160, mrp: 200, tat: "Same Day" },
  { name: "Liver Function Test (LFT)", type: "Profile", price: 440, mrp: 550, tat: "Same Day" },
  { name: "Kidney Function Test (KFT)", type: "Profile", price: 360, mrp: 450, tat: "Same Day" },
  { name: "Fasting Blood Sugar (FBS)", type: "Test", price: 80, mrp: 100, tat: "Same Day" },
  { name: "HbA1c", type: "Test", price: 320, mrp: 400, tat: "Same Day" },
  { name: "TSH", type: "Test", price: 160, mrp: 200, tat: "Same Day" },
  { name: "Lipid Profile", type: "Profile", price: 320, mrp: 400, tat: "Same Day" },
  { name: "Vitamin D (25-OH)", type: "Test", price: 720, mrp: 900, tat: "24 Hours" },
  { name: "Vitamin B12", type: "Test", price: 600, mrp: 750, tat: "24 Hours" },
  { name: "Iron Studies", type: "Profile", price: 520, mrp: 650, tat: "24 Hours" },
  { name: "Thyroid Profile (T3, T4, TSH)", type: "Profile", price: 400, mrp: 500, tat: "Same Day" },
  { name: "Diabetes Profile", type: "Profile", price: 720, mrp: 900, tat: "Same Day" },
  { name: "Calcium Test", type: "Test", price: 160, mrp: 200, tat: "Same Day" },
  { name: "Uric Acid", type: "Test", price: 120, mrp: 150, tat: "Same Day" },
  { name: "CRP", type: "Test", price: 280, mrp: 350, tat: "Same Day" },
];

export default function Booking() {
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "",
    mobile: "",
    address: "",
    pincode: "",
    date: "",
    time: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleSelect = (name) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected.length === 0) return alert("Please select at least one test or profile.");
    if (!form.name || !form.mobile || !form.date || !form.time) return alert("Please fill all required fields.");
    setSubmitted(true);
    console.log("Booking Submitted", { ...form, selected });
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Book Your Test</h1>

      <div className="max-w-3xl mx-auto grid gap-4">
        {testData.map((item, idx) => (
          <div
            key={idx}
            className={`border rounded-xl p-4 shadow bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${selected.includes(item.name) ? 'ring-2 ring-green-400' : ''}`}
            onClick={() => toggleSelect(item.name)}
          >
            <div>
              <h2 className="font-semibold text-lg text-green-700">{item.name}</h2>
              <p className="text-sm">Type: {item.type}</p>
              <p className="text-sm font-bold text-green-700">Offer Price: ₹{item.price}</p>
              <p className="text-sm">MRP: <span className="text-red-600 line-through">₹{item.mrp}</span></p>
              <p className="text-sm text-blue-700">You Save: ₹{item.mrp - item.price}</p>
              <p className="text-sm">TAT: {item.tat}</p>
            </div>
            <div className="text-sm text-gray-500">{selected.includes(item.name) ? '✔ Selected' : 'Click to Select'}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white mt-8 p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-bold mb-4">Patient Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="border p-2 rounded" name="name" placeholder="Full Name*" value={form.name} onChange={handleChange} />
          <input className="border p-2 rounded" name="age" placeholder="Age" value={form.age} onChange={handleChange} />
          <input className="border p-2 rounded" name="sex" placeholder="Sex" value={form.sex} onChange={handleChange} />
          <input className="border p-2 rounded" name="mobile" placeholder="Mobile Number*" value={form.mobile} onChange={handleChange} />
          <input className="border p-2 rounded col-span-2" name="address" placeholder="Full Address" value={form.address} onChange={handleChange} />
          <input className="border p-2 rounded" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
          <input className="border p-2 rounded" name="date" type="date" placeholder="Date*" value={form.date} onChange={handleChange} />
          <input className="border p-2 rounded" name="time" type="time" placeholder="Time*" value={form.time} onChange={handleChange} />
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
          Confirm Booking
        </button>

        {submitted && (
          <div className="mt-4 text-green-700 font-semibold">✅ Your booking has been submitted successfully!</div>
        )}
      </form>
    </div>
  );
}
