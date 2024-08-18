import Navbar from "../navbar/navbar.jsx";
import { useNavigate } from "react-router-dom";

export default function HomePageAdmin() {
  const navigate = useNavigate();

  const handleToManagement = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar />
      <div className="h-screen w-full flex justify-center items-center">
        <img
          src="../public/img/burger.png"
          alt="menu-management"
          className="h-[100px] w-[100px]"
          onClick={() => handleToManagement("/menumanagement")}
        />
      </div>
    </>
  );
}
