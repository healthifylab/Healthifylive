// Search.jsx – Integrated with Full Data List
import { useState } from "react";

const testData = [
  {
    name: "Complete Blood Count (CBC)",
    type: "Test",
    price: 199,
    mrp: 299,
    tat: "Same Day",
    description: "Measures various parameters of blood such as RBC, WBC, Platelets, etc."
  },
  {
    name: "Liver Function Test (LFT)",
    type: "Profile",
    price: 699,
    mrp: 899,
    tat: "24 Hours",
    description: "Evaluates liver health through various enzyme levels."
  },
  {
    name: "Kidney Function Test (KFT)",
    type: "Profile",
    price: 649,
    mrp: 849,
    tat: "24 Hours",
    description: "Checks for creatinine, urea, uric acid, and more."
  },
  {
    name: "Vitamin D Test",
    type: "Test",
    price: 799,
    mrp: 999,
    tat: "24 Hours",
    description: "Checks Vitamin D3 (25-OH) levels in the body."
  },
  {
    name: "Thyroid Profile (T3 T4 TSH)",
    type: "Profile",
    price: 499,
    mrp: 699,
    tat: "Same Day",
    description: "Tests for T3, T4, and TSH to assess thyroid health."
  },
  // Add more tests/profiles as needed...
];

export default function Search() {
  const [query, setQuery] = useState("");

  const results = testData.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-4">Search Tests & Profiles</h1>

      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Type test or profile name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none"
        />
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        {results.map((item, idx) => (
          <div key={idx} className="border rounded p-4 shadow">
            <h2 className="font-semibold text-lg text-green-700">{item.name}</h2>
            <p className="text-sm text-gray-700 italic">{item.description}</p>
            <p className="text-sm">Type: {item.type}</p>
            <p className="text-sm">MRP: <span className="line-through text-red-500">₹{item.mrp}</span></p>
            <p className="text-sm font-semibold text-green-700">Offer Price: ₹{item.price}</p>
            <p className="text-sm">TAT: {item.tat}</p>
          </div>
        ))}
        {results.length === 0 && <p className="text-center text-gray-500">No results found.</p>}
      </div>
    </div>
  );
}
