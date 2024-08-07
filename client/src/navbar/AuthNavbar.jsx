import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authentication";
import Dropdown from "../components/dropdown/Dropdown.jsx";

export default function AuthNavbar() {
  const { logout, state } = useAuth();

  return (
    <div className="w-full h-[50px] flex justify-end text-xl font-semibold bg-red-500">
      <div className="w-auto flex mt-2">
        <Link to="/" className="cursor-pointer text-white mr-6">
          Home
        </Link>
        <Dropdown state={state} logout={logout} />
      </div>
    </div>
  );
}
