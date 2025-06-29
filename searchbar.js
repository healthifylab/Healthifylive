// components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = ({ allTests }) => {
  const [query, setQuery] = useState("");

  const filteredTests = allTests.filter((test) =>
    test.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-[59%] mx-auto mt-4">
      <input
        type="text"
        placeholder="Search for a test or profile"
        className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto z-10">
          {filteredTests.map((test, index) => (
            <li key={index} className="p-3 border-b hover:bg-gray-100 cursor-pointer">
              <div className="font-medium text-blue-700">{test.name}</div>
              <div className="text-sm text-gray-600 line-through">₹{test.mrp}</div>
              <div className="text-green-600 font-semibold">₹{test.discounted}</div>
              <div className="text-xs text-gray-500">TAT: {test.tat}</div>
            </li>
          ))}
          {filteredTests.length === 0 && (
            <li className="p-3 text-gray-500">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
            
