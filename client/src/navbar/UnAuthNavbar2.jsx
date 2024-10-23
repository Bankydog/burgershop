import React from "react";
import { Link } from "react-router-dom";

export default function UnAuthNavbar2() {
  return (
    <div className="fixed bottom-0 w-full h-[60px] sm:hidden bg-red-500 shadow-lg">
      <ul className="flex justify-around p-4 space-x-6 text-lg font-semibold">
        <li className="text-white transition-all duration-300 cursor-pointer hover:text-yellow-300">
          <Link to="/">Home</Link>
        </li>
        <li className="text-white transition-all duration-300 cursor-pointer hover:text-yellow-300">
          <Link to="/login">Login</Link>
        </li>
        <li className="text-white transition-all duration-300 cursor-pointer hover:text-yellow-300">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}
