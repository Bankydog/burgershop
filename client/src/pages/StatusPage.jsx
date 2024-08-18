import Header from "../components/header/Header.jsx";
import Navbar from "../navbar/navbar.jsx";
import { TailSpin } from "react-loader-spinner";

const StatusPage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="h-screen w-full flex justify-center items-center">
        Check status of your order
      </div>
    </>
  );
};

export default StatusPage;
