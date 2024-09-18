import AdminNavbar from "../navbar/AdminNavbar.jsx";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { usePost } from "../hook/usePostsAPI.jsx";

export default function CookingPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [states, setStates] = useState("ordered,cooking");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { putCookingTime, putCookedTime, cancelOrder } = usePost();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `http://localhost:4000/admin/cooking?page=${page}&state=${states}${
          search ? `&order_no=${search}` : ""
        }`
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
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handlePageChange = (direction) => {
    if (direction === "next") {
      setPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleStartCooking = async (order_no) => {
    try {
      const response = await putCookingTime({ order_no });
      console.log("Cooking started for order:", order_no, response);
      fetchData();
    } catch (error) {
      console.error("Error starting cooking:", error);
    }
  };

  const handleMarkAsCooked = async (order_no) => {
    try {
      const response = await putCookedTime({ order_no });
      console.log("Cooked for order:", order_no, response);
      fetchData();
    } catch (error) {
      console.error("Error marking as cooked:", error);
    }
  };

  const handleCancelOrder = async (order_no) => {
    try {
      const response = await cancelOrder({ order_no });
      console.log("Order canceled:", order_no, response);
      fetchData();
    } catch (error) {
      console.error("Error canceling order:", error);
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
            <div className="flex mt-3 mb-3 space-x-3">
              <label>
                <select
                  id="states"
                  name="states"
                  className="border rounded"
                  onChange={handleStatesChange}
                  value={states}
                >
                  <option value="ordered,cooking">-- Select a state --</option>
                  <option value="ordered">ordered</option>
                  <option value="cooking">cooking</option>
                  <option value="ordered,cooking">ordered, cooking</option>
                </select>
              </label>
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-col gap-3 md:flex-row"
              >
                <input
                  type="text"
                  id="text"
                  name="text"
                  placeholder="Enter Order.No"
                  onChange={handleSearchChange}
                  value={search}
                  className="mr-2 text-center border border-gray-200 rounded-md"
                />
                <button
                  type="submit"
                  className="w-[188px] md:w-[120px] hidden md:block h-[40px] md:h-[27px] text-white bg-blue-500 rounded md:hide"
                >
                  Search
                </button>
              </form>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 mx-auto md:grid-cols-4">
              {orders.map((order) => (
                <div
                  key={order.order_no}
                  className="w-full max-w-lg p-4 bg-orange-100 border border-black rounded"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Content - Left Column */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">
                        Order: {order.order_no}
                      </h3>
                      <p>
                        Ordered Time:{" "}
                        {new Date(order.ordered_time)
                          .toLocaleString("en-GB", {
                            timeZone: "Asia/Bangkok",
                          })
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
                    </div>
                    {/* Content - Right Column */}
                    <div className="w-[200px] h-[115px] mt-4 flex flex-col items-center justify-center">
                      <img
                        src={`../public/img/${order.state}.png`}
                        alt={order.state}
                        className="object-cover w-[100px] h-[100px] rounded"
                      />
                      <p className="mt-2 text-xl">state: {order.state}</p>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="flex justify-center mt-3 space-x-3 text-2xl">
                    <button
                      className={`w-[100px] h-[40px] border-2 border-black rounded-lg text-white ${
                        order.state === "cooking"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-400 hover:text-slate-100"
                      }`}
                      onClick={() => handleStartCooking(order.order_no)}
                      disabled={order.state === "cooking"}
                    >
                      cooking
                    </button>

                    <button
                      className="w-[100px] h-[40px] bg-green-500 border-2 border-black rounded-lg text-white hover:bg-green-400 hover:text-slate-100"
                      onClick={() => handleMarkAsCooked(order.order_no)}
                    >
                      cooked
                    </button>
                    <button
                      className="w-[100px] h-[40px] bg-red-500 border-2 border-black rounded-lg text-white hover:bg-red-400 hover:text-slate-100"
                      onClick={() => handleCancelOrder(order.order_no)}
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
