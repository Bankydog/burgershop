import React from "react";
import { Link } from "react-router-dom";

export default function UnAuthNavbar() {
  return (
    <div className="w-full h-[50px] flex justify-between bg-red-500">
      <div></div>
      <div className="border-solid border-4 border-black mr-3">
        <ul className="flex space-x-4 p-4">
          <li className="cursor-pointer text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer text-white">
            <Link to="/login">Login</Link>
          </li>
          <li className="cursor-pointer text-white">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
