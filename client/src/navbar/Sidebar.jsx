import React, { useState } from "react";

function Sidebar({ setKeyword }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    { name: "Promotion", value: "promotion" },
    { name: "Hamburger", value: "burger" },
    { name: "Fry Chicken", value: "frychicken" },
    { name: "Snacks", value: "snacks" },
    { name: "Beverage", value: "beverage" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative">
      {/* Hamburger button */}
      <button
        className="flex items-center p-2 bg-yellow-500 rounded-lg lgg:hidden"
        onClick={toggleMenu}
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Sliding menu with transparent background */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white lgg:bg-transparent bg-opacity-50 backdrop-blur-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lgg:translate-x-0 lgg:relative lgg:w-[300px]`}
      >
        <button
          className="absolute text-3xl font-bold text-white top-4 right-4 lgg:hidden"
          onClick={toggleMenu}
        >
          &times;
        </button>
        <ul className="flex flex-col gap-4 p-6 mt-10">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setKeyword(item.value);
                  setIsOpen(false); // Close menu on selection
                }}
                className="w-full text-xl font-bold text-center text-white bg-red-500 rounded-lg h-14 hover:bg-red-600"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
