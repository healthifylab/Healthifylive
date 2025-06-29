import React from "react";
import SearchBar from "./components/SearchBar";
import { allTests } from "./data/allTests";

function App() {
  return (
    <div className="pt-20">
      {/* Only Search visible outside menu */}
      <SearchBar allTests={allTests} />
    </div>
  );
}

export default App;
