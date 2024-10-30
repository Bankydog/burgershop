import { useState } from "react";
import { Link } from "react-router-dom";

function Dropdown({ state, logout }) {
  const items = [
    { label: "Cart", action: "/cart" },
    { label: "Profile", action: "/profile" },
    { label: "Order", action: "/status" },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-10 sm:mr-6 w-[100px]">
      {state.user && (
        <div
          onClick={() => setOpen(!open)}
          className="text-center text-white cursor-pointer"
        >
          {state.user.username}
        </div>
      )}
      {open && (
        <ul className="absolute h-[180px] mb-3 bg-blue-100 rounded shadow-lg bottom-full sm:top-full sm:mt-2">
          {items.map((item, index) => (
            <li key={index} className="p-2 hover:bg-sky-200 hover:rounded">
              <Link to={item.action} className="text-black">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="p-2 hover:bg-sky-200 hover:rounded">
            <Link to={"/login"}>
              <button onClick={logout} className="text-black">
                Log out
              </button>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
