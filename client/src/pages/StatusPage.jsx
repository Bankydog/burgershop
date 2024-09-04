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

  console.log("group data is :", orderData);

  const handleSeeMore = (order_no) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [order_no]: !prev[order_no],
    }));
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
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
      <div className="h-screen w-full flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="h-screen w-full flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-4">Order Status</h1>
        {orderData.length > 0 ? (
          <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
            {orderData.map((order) => (
              <div key={order.order_no} className="mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Order Number: {order.order_no}
                </h2>
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

                {/* Conditionally render items if expanded */}
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
