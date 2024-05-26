import React from "react";
import { useNavigate } from "react-router-dom";

export default function UnAuthNavbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-screen h-[50px] flex justify-between bg-red-500">
      <div></div>
      <div className="border-solid border-4 border-black  mr-3">
        <ul className="flex space-x-4 p-4">
          <li
            className="cursor-pointer text-white"
            onClick={() => handleNavigation("/")}
          >
            Home
          </li>
          <li
            className="cursor-pointer text-white"
            onClick={() => handleNavigation("/login")}
          >
            Login
          </li>
          <li
            className="cursor-pointer text-white"
            onClick={() => handleNavigation("/register")}
          >
            Register
          </li>
        </ul>
      </div>
    </div>
  );
}
