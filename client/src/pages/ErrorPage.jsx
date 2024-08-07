import Header from "../components/header/Header";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Navbar />
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="text-5xl">Page Not Found</div>
        <button
          onClick={() => navigate("/")}
          className="w-[100px] h-[100px] rounded-2xl bg-red-500 hover:bg-black text-white text-3xl hover:text-yellow-500 shadow-2xl
          mt-10"
        >
          Go Back
        </button>
      </div>
    </>
  );
}
