// Search.jsx – Real GD Labs Data
import { useState } from "react";

const testData = [
  { name: "Complete Blood Count (CBC)", type: "Test", price: 160, mrp: 200, tat: "Same Day", description: "Basic blood count including RBCs, WBCs, and Platelets." },
  { name: "Liver Function Test (LFT)", type: "Profile", price: 440, mrp: 550, tat: "Same Day", description: "Analyzes liver enzymes, proteins, and bilirubin." },
  { name: "Kidney Function Test (KFT)", type: "Profile", price: 360, mrp: 450, tat: "Same Day", description: "Assesses urea, creatinine, uric acid and other markers." },
  { name: "Fasting Blood Sugar (FBS)", type: "Test", price: 80, mrp: 100, tat: "Same Day", description: "Measures glucose level after fasting." },
  { name: "HbA1c (Glycated Hemoglobin)", type: "Test", price: 320, mrp: 400, tat: "Same Day", description: "Monitors long-term glucose levels (last 3 months)." },
  { name: "TSH (Thyroid Stimulating Hormone)", type: "Test", price: 160, mrp: 200, tat: "Same Day", description: "Evaluates thyroid function." },
  { name: "Lipid Profile", type: "Profile", price: 320, mrp: 400, tat: "Same Day", description: "Measures cholesterol and triglyceride levels." },
  { name: "Vitamin D (25-OH)", type: "Test", price: 720, mrp: 900, tat: "24 Hours", description: "Assesses Vitamin D3 level in blood." },
  { name: "Vitamin B12", type: "Test", price: 600, mrp: 750, tat: "24 Hours", description: "Checks Vitamin B12 levels." },
  { name: "Iron Studies (Serum Iron, TIBC, % Saturation)", type: "Profile", price: 520, mrp: 650, tat: "24 Hours", description: "Analyzes iron deficiency or overload." },
  { name: "Thyroid Profile (T3, T4, TSH)", type: "Profile", price: 400, mrp: 500, tat: "Same Day", description: "Comprehensive thyroid hormone test." },
  { name: "Diabetes Profile", type: "Profile", price: 720, mrp: 900, tat: "Same Day", description: "Includes FBS, PPBS, HbA1c and more." },
  { name: "Calcium Test", type: "Test", price: 160, mrp: 200, tat: "Same Day", description: "Checks calcium level in blood." },
  { name: "Uric Acid Test", type: "Test", price: 120, mrp: 150, tat: "Same Day", description: "Used to detect gout or kidney issues." },
  { name: "CRP (C-Reactive Protein)", type: "Test", price: 280, mrp: 350, tat: "Same Day", description: "Marker of inflammation or infection." },
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
