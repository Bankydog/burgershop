import React from "react";
import AdminNavbar from "../navbar/AdminNavbar.jsx";
import { Link } from "react-router-dom";

export default function HomePageAdmin() {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col items-center justify-center h-screen gap-5 smm:grid smm:grid-cols-2 smm:gap-4 md:flex md:flex-row md:space-x-20">
        <Link to={"/menumanagement"}>
          <div className="flex flex-col items-center gap-3">
            <img
              src="/img/burger.png"
              alt="menu-management"
              className="h-[100px] w-[100px]"
            />
            <span className="text-lg font-bold">Add Menu</span>
          </div>
        </Link>
        <Link to={"/cooking"}>
          <div className="flex flex-col items-center gap-3">
            <img
              src="/img/cooking.png"
              alt="menu-management"
              className="h-[100px] w-[100px]"
            />
            <span className="text-lg font-bold">Cook</span>
          </div>
        </Link>
        <Link to={"/rider"}>
          <div className="flex flex-col items-center gap-3">
            <img
              src="/img/rider.png"
              alt="menu-management"
              className="h-[100px] w-[100px]"
            />
            <span className="text-lg font-bold">Rider</span>
          </div>
        </Link>
        <Link to={"/statistics"}>
          <div className="flex flex-col items-center gap-3">
            <img
              src="/img/statistics.png"
              alt="menu-management"
              className="h-[100px] w-[100px]"
            />
            <span className="text-lg font-bold">Statistics</span>
          </div>
        </Link>
      </div>
    </>
  );
}
