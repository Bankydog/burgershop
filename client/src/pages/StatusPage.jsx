import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header/Header.jsx";
import Navbar from "../navbar/navbar.jsx";
import { TailSpin } from "react-loader-spinner";
import { useAuth } from "../context/Authentication.jsx";

const StatusPage = () => {
  const { userId } = useAuth();
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/posts/carts/${userId}`
      );
      const data = response.data.data;
      setOrderData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleSeeMore = (order_no) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [order_no]: !prev[order_no],
    }));
  };

  const filteredOrders = orderData.filter(
    ({ state }) => !["finish", "cancel"].includes(state)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col items-center w-full h-[850px] p-6 bg-gray-100">
        <h1 className="mb-4 text-2xl font-bold">Order Status</h1>
        {orderData.length > 0 ? (
          <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
            {filteredOrders.map((order) => (
              <div key={order.order_no} className="mb-4">
                <h2 className="mb-2 text-xl font-semibold">
                  Order Number: {order.order_no}
                </h2>
                <img
                  src={`../public/img/${order.state}.png`}
                  alt={order.state}
                  className="w-[100px] mx-auto my-5"
                />
                <p>
                  <strong>Status:</strong> {order.state}
                </p>
                <p>
                  <strong>Total Price:</strong> {order.total_prices} Bath
                </p>
                <p>
                  <strong>Ordered Time:</strong>{" "}
                  {new Date(order.ordered_time).toLocaleString()}
                </p>
                {expandedOrders[order.order_no] && (
                  <div>
                    <h3 className="text-lg font-semibold">Items:</h3>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.food_name} - {item.amount}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* See More button */}
                <button
                  className="mt-2 text-blue-500 hover:underline"
                  onClick={() => handleSeeMore(order.order_no)}
                >
                  {expandedOrders[order.order_no] ? "See Less" : "See More"}
                </button>

                <hr className="my-4" />
              </div>
            ))}
          </div>
        ) : (
          <p>No order data available.</p>
        )}
      </div>
    </>
  );
};

export default StatusPage;
