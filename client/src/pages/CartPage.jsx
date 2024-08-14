import { useState, useEffect } from "react";
import Header from "../components/header/Header.jsx";
import Navbar from "../navbar/navbar.jsx";
import { TailSpin } from "react-loader-spinner";
import { useCartItem } from "../hook/cartItem.jsx";

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { cartItems } = useCartItem();

  useEffect(() => {
    // Simulate a data fetch or loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the time as needed

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

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
          <div className="w-full h-full flex flex-col items-center">
            {cartItems.length === 0 ? (
              <div className="text-xl">Your cart is empty</div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex justify-between p-4 border-b"
                >
                  <img
                    src={item.image_url}
                    alt={item.food_name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1 mx-4">
                    <div className="text-lg font-semibold">
                      {item.food_name}
                    </div>
                    <div className="text-md">Price: {item.price}</div>
                  </div>
                  <div className="text-lg font-bold">{item.amount}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
