import React from "react";
import { Link } from "react-router-dom";

export default function UnAuthNavbar() {
  const menuItems = [
    { name: "Home", value: "/" },
    { name: "Login", value: "/login" },
    { name: "Register", value: "/register" },
  ];

  return (
    <div className="w-full h-[50px] flex justify-center bottom-0 fixed sm:relative sm:bottom-auto sm:top-0 sm:flex sm:justify-end text-xl font-semibold bg-red-500">
      <ul className="w-[350px] flex justify-around items-center p-4 space-x-4 text-xl">
        {menuItems.map((item) => (
          <li key={item.value} className="text-white cursor-pointer">
            <Link to={item.value}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
