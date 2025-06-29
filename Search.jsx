// Search.jsx – Search Tests & Profiles
import { useState } from "react";

const sampleData = [
  { name: "CBC Test", type: "Test", price: 299, mrp: 399, tat: "Same Day" },
  { name: "Liver Function Profile", type: "Profile", price: 899, mrp: 1099, tat: "24 Hrs" },
];

export default function Search() {
  const [query, setQuery] = useState("");

  const results = sampleData.filter(item =>
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
            <p className="text-sm">Type: {item.type}</p>
            <p className="text-sm">MRP: <span className="line-through text-red-500">₹{item.mrp}</span></p>
            <p className="text-sm">Offer Price: ₹{item.price}</p>
            <p className="text-sm">TAT: {item.tat}</p>
          </div>
        ))}
        {results.length === 0 && <p className="text-center text-gray-500">No results found.</p>}
      </div>
    </div>
  );
}
