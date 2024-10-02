import React from "react";
import AdminNavbar from "../navbar/AdminNavbar.jsx";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { usePost } from "../hook/usePostsAPI.jsx";
import AdminRiderCard from "../components/cards/AdminRiderCard.jsx";

export default function RiderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [states, setStates] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { putSendingTime, putSendedTime, putFinishTime, cancelOrder } =
    usePost();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `http://localhost:4000/admin/rider?page=${page}&state=${states}${
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
    setPage(1);
    fetchData();
  };

  const handlePageChange = (direction) => {
    if (direction === "next") {
      setPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleStartSending = async (order_no) => {
    try {
      const response = await putSendingTime({ order_no });
      console.log("Sending started for order:", order_no, response);
      fetchData();
    } catch (error) {
      console.error("Error starting sending:", error);
    }
  };

  const handleSended = async (order_no) => {
    try {
      const response = await putSendedTime({ order_no });
      console.log("Sended for order:", order_no, response);
      fetchData();
    } catch (error) {
      console.error("Error marking as sended:", error);
    }
  };

  const handleFinished = async (order_no) => {
    try {
      const response = await putFinishTime({ order_no });
      console.log("Finish order:", order_no, response);
      fetchData();
    } catch (error) {
      console.error("Error marking as finish:", error);
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
                  className="w-[150px] ml-2 border rounded"
                  onChange={handleStatesChange}
                  value={states}
                >
                  <option value="">-- Select a state --</option>
                  <option value="cooked">cooked</option>
                  <option value="sending">sending</option>
                  <option value="sended">sended</option>
                  <option value="cooked,sending,sended">
                    cooked, sending, sended
                  </option>
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
            {orders.length > 0 ? (
              <AdminRiderCard
                orders={orders}
                handleStartSending={handleStartSending}
                handleSended={handleSended}
                handleFinished={handleFinished}
                handleCancelOrder={handleCancelOrder}
              />
            ) : (
              <div className="text-center">No orders available</div>
            )}
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
