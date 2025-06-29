import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Healthify Logo" className="h-10" />
        <h1 className="text-xl font-bold text-green-700">Healthify</h1>
      </div>
      <nav className="space-x-4">
        <Link to="/booking" className="text-blue-700 hover:underline">
          Book Test
        </Link>
        <Link to="/admin" className="text-blue-700 hover:underline">
          Admin
        </Link>
      </nav>
    </header>
  );
};

export default Header;
