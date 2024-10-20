import React from "react";
import { Link } from "react-router-dom";

export default function UnAuthNavbar() {
  return (
    <div className="w-full h-[50px] flex justify-between items-center bg-red-500">
      <div></div>
      <div className="">
        <ul className="flex p-4 space-x-4 text-xl">
          <li className="text-white cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="text-white cursor-pointer">
            <Link to="/login">Login</Link>
          </li>
          <li className="text-white cursor-pointer">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
