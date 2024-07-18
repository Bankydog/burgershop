import { useState, useEffect } from "react";
import Header from "../components/header/Header.jsx";
import Navbar from "../navbar/navbar.jsx";
import { useNonUser } from "../hook/nonUserAPI.jsx";
import { TailSpin } from "react-loader-spinner";

function Sidebar({ setKeyword }) {
  const menuItems = [
    { name: "Promotion", value: "promotion" },
    { name: "Hamburger", value: "burger" },
    { name: "Fry Chicken", value: "frychicken" },
    { name: "Snacks", value: "snacks" },
    { name: "Beverage", value: "beverage" },
  ];

  return (
    <nav>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setKeyword(item.value)}
              className="w-[300px] h-[120px] mt-2 text-3xl font-extrabold bg-yellow-400 hover:bg-red-500 hover:text-white hover:rounded-lg flex justify-center items-center"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Dashboard({ data }) {
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full h-[400px] bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <img
              src={item.image_url}
              alt={item.food_name}
              className="w-[150px] h-[150px] rounded-lg mb-4 object-cover"
            />
            <div className="font-semibold text-lg mb-2 text-center">
              {item.food_name}
            </div>
            <div className="text-gray-600 mb-2">${item.price}</div>
            <div className="text-gray-500 text-sm text-center">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { getMenuByKeyword } = useNonUser();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("promotion");

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
              <Dashboard data={data} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
