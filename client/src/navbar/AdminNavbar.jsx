import { Link } from "react-router-dom";
import { useAuth } from "../context/Authentication";

export default function AdminNavbar() {
  const { logout, state } = useAuth();
  return (
    <div className="w-full h-[50px] flex justify-end items-center text-xl font-semibold bg-blue-500">
      <div className="mr-5 text-white ">Welcome, {state.user.username}</div>
      <Link to={"/"}>
        <span className="mr-5 text-white">Home</span>
      </Link>
      <Link to={"/login"}>
        <span className="mr-5 text-white cursor-pointer" onClick={logout}>
          Log out
        </span>
      </Link>
    </div>
  );
}
