import { useState, useEffect } from "react";
import Header from "../components/header/Header.jsx";
import Navbar from "../navbar/navbar.jsx";
import { TailSpin } from "react-loader-spinner";
import { useCartItem } from "../hook/cartItem.jsx";
import { usePost } from "../hook/usePostsAPI.jsx";
import { useAuth } from "../context/Authentication.jsx";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const { cartItems, setCartItems } = useCartItem();
  const { getProfile, postCartItems } = usePost();
  const { userId } = useAuth();
  const [comment, setComment] = useState("");
  const [isUpload, setIsUpload] = useState(false);

  const fetchProfile = async () => {
    try {
      const result = await getProfile(userId);
      setProfileData(result);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const total_prices = cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  const handleIncrease = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.catalog_id === itemId ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const handleDecrease = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.catalog_id === itemId && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      )
    );
  };

  const handleRemove = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.catalog_id !== itemId)
    );
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    setIsUpload(true);
    const cartData = {
      cartItems,
      comment,
      total_prices,
    };
    console.log(cartData);
    try {
      await postCartItems(userId, cartData);
      setCartItems([]);
    } catch (error) {
      console.error("Failed to send data:", error);
    } finally {
      setIsUpload(false);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="h-screen w-full flex flex-col bg-gray-100">
        {isLoading ? (
          <div className="flex-grow flex justify-center items-center">
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
        ) : (
          <div className="flex-grow flex">
            <div className="flex-1 p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center h-full">
                  <img
                    src="/img/noitem.png"
                    className="w-[500px] h-auto"
                    alt="No items in cart"
                  />
                  <p className="text-xl mt-4 text-gray-600">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <div className="flex flex-col space-y-1">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.catalog_id}-${item.amount}`}
                      className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200"
                    >
                      <img
                        src={item.image_url}
                        alt={item.food_name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1 mx-4">
                        <div className="text-lg font-semibold text-gray-800">
                          {item.food_name}
                        </div>
                        <div className="text-md text-gray-600">
                          Price: {item.price} Bath
                        </div>
                      </div>
                      <div className="flex items-center space-x-5">
                        <button
                          onClick={() => handleDecrease(item.catalog_id)}
                          className="w-[50px] h-[50px] px-4 text-xl border-solid border-2 rounded-2xl shadow-lg hover:bg-sky-100 active:bg-sky-300 active:border-none"
                        >
                          -
                        </button>
                        <div className="text-lg font-bold text-gray-800">
                          {item.amount}
                        </div>
                        <button
                          onClick={() => handleIncrease(item.catalog_id)}
                          className="w-[50px] h-[50px] px-4 text-xl border-solid border-2 rounded-2xl shadow-lg hover:bg-sky-100 active:bg-sky-300 active:border-none"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemove(item.catalog_id)}
                          className="w-[100px] h-[50px] px-4 text-xl text-white bg-rose-500 border-solid border-2 rounded-2xl shadow-lg hover:bg-red-700 active:bg-rose-500 active:border-none active:text-yellow-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-1/3 p-6 bg-white rounded-lg shadow-md border border-gray-200">
              <div className="text-2xl font-semibold mb-4 text-gray-800">
                Order Summary
              </div>
              <div className="text-md mb-4">
                <div className="flex flex-col mb-2 space-y-3">
                  <span className="font-semibold">
                    Total Price :{" "}
                    <span className="font-extrabold text-2xl text-green-500">
                      {total_prices} Bath
                    </span>
                  </span>
                  <span className="font-semibold">Cash on delivery</span>
                  <span className="font-semibold">
                    Shipping address :{" "}
                    <span>
                      {profileData?.address ? (
                        <span className="font-extrabold text-2xl text-green-500">
                          {profileData.address}
                        </span>
                      ) : (
                        <span className="font-extrabold text-2xl text-red-500">
                          Address not available
                        </span>
                      )}
                    </span>
                  </span>
                </div>
                <div className="mt-4">
                  <label htmlFor="order-comment" className="font-semibold">
                    Add Comment:
                  </label>
                  <textarea
                    id="order-comment"
                    rows="4"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your comments here..."
                    value={comment}
                    onChange={handleCommentChange}
                  />
                  {isUpload ? (
                    <button
                      className={`mt-2 px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md
                    `}
                    >
                      Uploading...
                    </button>
                  ) : (
                    <button
                      className={`mt-2 px-4 py-2 ${
                        profileData?.address ? "bg-blue-500" : "bg-gray-500"
                      } text-white font-semibold rounded-lg shadow-md
                    hover:${
                      profileData?.address ? "bg-blue-600" : "bg-gray-600"
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      onClick={handleSubmit}
                      disabled={!profileData?.address}
                    >
                      Confirm
                    </button>
                  )}
                  {profileData?.address ? null : (
                    <span className="font-extrabold text-2xl ml-5">
                      <Link to="/profile" className="text-blue-500 underline">
                        Add your address here
                      </Link>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
