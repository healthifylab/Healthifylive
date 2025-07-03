// ✅ labtest.js — Blood Tests List with Clickable Test Details
import testData from '../data/testData';
import { useState } from 'react';

export default function LabTest() {
  const [expandedTest, setExpandedTest] = useState(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Blood Tests & Profiles</h2>
      <div className="grid gap-4">
        {Object.entries(testData).map(([key, test]) => (
          <div
            key={key}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{test.name}</h3>
              <button
                onClick={() => setExpandedTest(expandedTest === key ? null : key)}
                className="text-blue-600 underline"
              >
                {expandedTest === key ? 'Hide Details' : 'View Details'}
              </button>
            </div>
            <p className="text-sm text-gray-600">TAT: {test.tat}</p>
            <div className="mt-1">
              <span className="text-gray-500 line-through mr-2">₹{test.mrp}</span>
              <span className="text-green-700 font-semibold">₹{test.price}</span>
              <span className="ml-2 text-sm text-gray-500">(You save ₹{test.mrp - test.price})</span>
            </div>

            {expandedTest === key && (
              <ul className="mt-3 list-disc list-inside text-gray-700">
                {test.includes.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
