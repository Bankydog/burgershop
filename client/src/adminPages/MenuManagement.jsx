import { useState, useEffect } from "react";
import { usePost } from "../hook/usePostsAPI.jsx";
import AddMenuModel from "../components/modal/AddMenuModel.jsx";
import AdminMenuCard from "../components/cards/AdminMenuCard.jsx";
import { TailSpin } from "react-loader-spinner";

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
        <div className="w-screen h-screen flex justify-center items-center">
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
        <div className="w-screen h-auto flex flex-col justify-center items-center">
          <AdminMenuCard
            categories={categories}
            data={data}
            fetchData={fetchData}
            isLoading={isLoading}
          />
          <button
            className="w-[100px] h-[100px] mt-5 bg-green-500 rounded hover:bg-slate-400"
            onClick={() => setShowModal(true)}
          >
            Add Menu
          </button>
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
