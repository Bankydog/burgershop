import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authentication";

export default function AuthNavbar() {
  const navigate = useNavigate();
  const { logout, state } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-screen h-[50px] flex justify-between bg-red-500">
      <div></div>
      <div className="flex items-center border-solid border-4 border-black mr-3">
        <ul className="flex space-x-4 p-4">
          <li
            className="cursor-pointer text-white"
            onClick={() => handleNavigation("/")}
          >
            Home
          </li>
          <li className="cursor-pointer text-white" onClick={logout}>
            Logout
          </li>
        </ul>
        {state.user && (
          <span className="text-white ml-4">
            Welcome, {state.user.username}
          </span>
        )}
        {/* <div className="text-white ml-4">
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div> */}
      </div>
    </div>
  );
}
