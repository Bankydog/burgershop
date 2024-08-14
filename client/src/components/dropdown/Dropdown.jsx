import { useState } from "react";
import { Link } from "react-router-dom";

function Dropdown({ state, logout }) {
  const items = [
    { label: "Cart", action: "/cart" },
    { label: "Profile", action: "/profile" },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div className="z-0 mr-6">
      {state.user && (
        <div
          onClick={() => setOpen(!open)}
          className="text-white cursor-pointer"
        >
          Welcome, {state.user.username}
        </div>
      )}
      {open && (
        <ul className="dropdown-menu bg-white shadow-lg rounded mt-3">
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
