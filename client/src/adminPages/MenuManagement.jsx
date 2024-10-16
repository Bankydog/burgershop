import React from "react";
import { useState, useEffect } from "react";
import { usePost } from "../hook/usePostsAPI.jsx";
import AddMenuModel from "../components/modal/AddMenuModel.jsx";
import AdminMenuCard from "../components/cards/AdminMenuCard.jsx";
import { TailSpin } from "react-loader-spinner";
import AdminNavbar from "../navbar/AdminNavbar.jsx";

export default function MenuManagement() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const { getMenu } = usePost();
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { name: "Promotion", value: "promotion" },
    { name: "Hamburger", value: "burger" },
    { name: "Fry Chicken", value: "frychicken" },
    { name: "Snacks", value: "snacks" },
    { name: "Beverage", value: "beverage" },
  ];

  const fetchData = async () => {
    try {
      const result = await getMenu();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-auto">
          <AdminNavbar />
          <button
            className="w-[100px] h-[100px] text-white font-medium mt-5 bg-green-500 rounded hover:bg-slate-400"
            onClick={() => setShowModal(true)}
          >
            Add Menu
          </button>
          <AdminMenuCard
            categories={categories}
            data={data}
            fetchData={fetchData}
            isLoading={isLoading}
          />

          <AddMenuModel
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            fetchData={fetchData}
          />
        </div>
      )}
    </>
  );
}
