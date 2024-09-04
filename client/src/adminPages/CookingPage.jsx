import AdminNavbar from "../navbar/AdminNavbar.jsx";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";

export default function CookingPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [states, setStates] = useState("ordered,cooking");
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `http://localhost:4000/admin/cooking?page=${page}&state=${states}`
      );
      setOrders(result.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [states, page]);

  const handleStatesChange = (e) => {
    setStates(e.target.value);
    fetchData();
  };

  const handlePageChange = (direction) => {
    if (direction === "next") {
      setPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  console.log("fetch data is ", orders);

  return (
    <div>
      <AdminNavbar />
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
        <>
          <div className="flex flex-col items-center w-full h-auto px-4">
            <div className="flex items-center mt-1 mb-4 space-x-1">
              <label>
                <select
                  id="states"
                  name="states"
                  className="border rounded"
                  onChange={handleStatesChange}
                  value={states}
                >
                  <option value="ordered,cooking">-- Select a states --</option>
                  <option value="ordered">ordered</option>
                  <option value="cooking">cooking</option>
                  <option value="ordered,cooking">ordered, cooking</option>
                </select>
              </label>
            </div>
            <div className="grid w-full max-w-6xl grid-cols-1 gap-4 mx-auto md:grid-cols-3">
              {orders.map((order) => (
                <div
                  key={order.order_no}
                  className="w-full max-w-lg p-4 border rounded"
                >
                  <h3 className="text-lg font-bold">Order: {order.order_no}</h3>
                  <p>Status: {order.state}</p>
                  <p>Total: {order.total_prices} Bath</p>
                  <p>
                    Ordered Time:{" "}
                    {new Date(order.ordered_time)
                      .toLocaleString("en-GB", { timeZone: "Asia/Bangkok" })
                      .replace(",", "")
                      .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")}
                  </p>
                  <div className="mt-2">
                    <h4 className="font-semibold">Items:</h4>
                    {order.items.map((item, index) => (
                      <p key={index}>
                        {item.food_name} - Quantity: {item.amount}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-center w-auto mt-3 space-x-3 text-2xl">
                    <button
                      className="w-[100px] h-[40px] bg-yellow-500 border-2 border-black rounded-lg text-white hover:bg-yellow-400
                    hover:text-slate-100"
                    >
                      cooking
                    </button>
                    <button
                      className="w-[100px] h-[40px] bg-green-500 border-2 border-black rounded-lg text-white hover:bg-green-400
                    hover:text-slate-100"
                    >
                      cooked
                    </button>
                    <button
                      className="w-[100px] h-[40px] bg-red-500 border-2 border-black rounded-lg text-white hover:bg-red-400
                    hover:text-slate-100"
                    >
                      cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center w-full my-4">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={page === 1}
                className={`px-4 py-2 border rounded ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {"<--"}
              </button>
              <span className="mx-4">Page {page}</span>
              <button
                onClick={() => handlePageChange("next")}
                className="px-4 py-2 border rounded"
              >
                {"-->"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
