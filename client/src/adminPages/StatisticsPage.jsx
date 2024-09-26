import React, { useEffect, useState } from "react";
import AdminNavbar from "../navbar/AdminNavbar.jsx";
import axios from "axios";

export default function StatisticsPage() {
  const [data, setData] = useState("");

  const fetchData = async () => {
    const result = await axios.get("http://localhost:4000/admin/statistics");
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="">
      <AdminNavbar />
      <div className="flex justify-center ">
        <div
          className="w-[800px] flex flex-col md:h-[800px] h-[617px] md:justify-center items-center md:gap-16
         bg-blue-300 md:mt-10 border-solid md:rounded-xl md:border-8 md:border-sky-700 justify-center"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-5xl">Total sales</h1>
            <div className="w-[300px] h-[80px] md:w-[600px] md:h-[80px] bg-white rounded-xl border-solid border-8 border-black">
              {data.newTotalSales}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-5 md:flex md:flex-row">
            <div className="flex flex-col items-center">
              <p className="text-5xl">Finishes</p>
              <div className="w-[300px] h-[80px] bg-white rounded-xl border-solid border-8 border-green-400">
                {data.finishesOrder}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-5xl">Cancels</p>
              <div className="w-[300px] h-[80px] bg-white rounded-xl border-solid border-8 border-rose-400">
                {data.cancelOrders}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
