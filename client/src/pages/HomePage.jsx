import { useState, useEffect } from "react";
import Navbar from "../navbar/navbar.jsx";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/");
      setData(response.data);
      console.log("Fetched data:", response.data);
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
          "Home"
        )}
      </div>
    </>
  );
}
