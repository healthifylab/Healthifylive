import React, { useState } from "react";

const SearchBar = ({ allTests }) => {
  const [query, setQuery] = useState("");

  const filtered = allTests.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search test or profile..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {query && (
        <div className="absolute z-10 bg-white w-full max-h-60 overflow-y-auto shadow-lg mt-1 rounded border border-gray-200">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div key={idx} className="p-2 hover:bg-blue-50 cursor-pointer text-sm">
                <div className="font-medium text-blue-700">{item.name}</div>
                <div className="text-xs text-gray-600">
                  MRP: <span className="line-through text-red-500">₹{item.mrp}</span> &nbsp;
                  <span className="text-green-600 font-semibold">₹{item.price}</span>
                  &nbsp; • {item.tat}
                </div>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500 text-sm">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
