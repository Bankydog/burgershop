import AdminNavbar from "../navbar/AdminNavbar.jsx";
import { Link } from "react-router-dom";

export default function HomePageAdmin() {
  return (
    <>
      <AdminNavbar />
      <div className="flex items-center justify-center w-screen h-screen space-x-[100px]">
        <Link to={"/menumanagement"}>
          <div className="flex flex-col items-center gap-3">
            <img
              src="../public/img/burger.png"
              alt="menu-management"
              className="h-[100px] w-[100px]"
            />
            <span className="text-lg font-bold">Add Menu</span>
          </div>
        </Link>
        <Link to={"/cooking"}>
          <div className="flex flex-col items-center gap-3">
            <img
              src="../public/img/cooking.png"
              alt="menu-management"
              className="h-[100px] w-[100px]"
            />
            <span className="text-lg font-bold">Cook</span>
          </div>
        </Link>
        <Link to={"/rider"}>
          <div className="flex flex-col items-center gap-3">
            <img
              src="../public/img/rider.png"
              alt="menu-management"
              className="h-[100px] w-[100px]"
            />
            <span className="text-lg font-bold">Rider</span>
          </div>
        </Link>
        <Link to={"/statistics"}>
          <div className="flex flex-col items-center gap-3">
            <img
              src="../public/img/statistics.png"
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
