import React from "react";

function Sidebar({ setKeyword }) {
  const menuItems = [
    { name: "Promotion", value: "promotion" },
    { name: "Hamburger", value: "burger" },
    { name: "Fry Chicken", value: "frychicken" },
    { name: "Snacks", value: "snacks" },
    { name: "Beverage", value: "beverage" },
  ];

  return (
    <nav>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setKeyword(item.value)}
              className="w-[300px] h-[120px] mt-2 text-3xl font-extrabold bg-yellow-400 hover:bg-red-500 hover:text-white hover:rounded-lg flex justify-center items-center"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
