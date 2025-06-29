// routes/SearchBar.jsx

import React, { useState } from "react";
import { allTests } from "./allTests";
import { allProfiles } from "./allProfiles";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const filteredTests = allTests.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredProfiles = allProfiles.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Search tests or profiles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-2 rounded shadow-sm"
      />

      <div className="mt-4 space-y-4">
        {filteredTests.map((test, index) => (
          <div key={index} className="border rounded p-3 shadow-sm">
            <h3 className="font-semibold">{test.name}</h3>
            <p className="text-sm text-gray-600">{test.description}</p>
            <p className="text-sm">
              <span className="text-red-500 line-through mr-2">₹{test.mrp}</span>
              <span className="text-green-600 font-bold">₹{test.price}</span>
              <span className="ml-4 text-gray-500">TAT: {test.tat}</span>
            </p>
          </div>
        ))}

        {filteredProfiles.map((profile, index) => (
          <div key={index} className="border rounded p-3 shadow-sm">
            <h3 className="font-semibold">{profile.name}</h3>
            <p className="text-sm text-gray-600">Includes: {profile.tests.join(", ")}</p>
            <p className="text-sm">
              <span className="text-red-500 line-through mr-2">₹{profile.mrp}</span>
              <span className="text-green-600 font-bold">₹{profile.price}</span>
              <span className="ml-4 text-gray-500">TAT: {profile.tat}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
