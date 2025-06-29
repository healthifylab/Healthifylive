// Booking.jsx – Updated with GD Labs Tests and Highlighted Prices
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

  const toggleSelect = (name) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
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

      <div className="mt-8 max-w-xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-2">Selected Tests:</h2>
        {selected.length === 0 ? (
          <p className="text-gray-500">No test selected</p>
        ) : (
          <ul className="list-disc list-inside">
            {selected.map((test, i) => <li key={i}>{test}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
