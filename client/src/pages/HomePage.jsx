import { useState, useEffect } from "react";
import Header from "../components/header/Header.jsx";
import Navbar from "../navbar/navbar.jsx";
import Sidebar from "../navbar/Sidebar.jsx";
import Dashboard from "../components/dashboard/Dashboard.jsx";
import { useCartItem } from "../hook/cartItem.jsx";
import { useNonUser } from "../hook/nonUserAPI.jsx";
import { TailSpin } from "react-loader-spinner";

export default function HomePage() {
  const { getMenuByKeyword } = useNonUser();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("promotion");
  const { cartItems, handleAddToCart } = useCartItem();

  const fetchData = async (keyword) => {
    try {
      const result = await getMenuByKeyword(keyword);
      setData(result);
      // console.log("Fetched data:", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(keyword);
  }, [keyword]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="h-screen w-full flex justify-center items-center">
        {isLoading ? (
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#DB3F3F"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <div className="w-full h-full flex">
            <div className="w-[25%] h-screen bg-yellow-400">
              <Sidebar setKeyword={setKeyword} />
            </div>
            <div className="w-full">
              <Dashboard data={data} onAddToCart={handleAddToCart} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
