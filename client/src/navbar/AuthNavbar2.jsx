import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authentication";
import { useCartItem } from "../hook/cartItem.jsx";
import Dropdown from "../components/dropdown/Dropdown.jsx";

export default function AuthNavbar2() {
  const { logout, state } = useAuth();
  const { cartItems, hasItemCart } = useCartItem();
  return (
    <div className="fixed bottom-0 w-full h-[60px] sm:hidden flex justify-around bg-red-500 shadow-lg">
      <div className="flex items-center w-auto space-x-8 text-lg font-semibold">
        <Link to="/cart">
          <div className="flex items-center justify-center w-[100px] cursor-pointer">
            <img
              src="../public/img/cartIcon.png"
              className="static size-10"
              alt="cart-icon"
            />
            {hasItemCart() ? (
              <span
                className="w-[25px] h-[25px] ml-2 mb-6 flex justify-center items-center text-white absolute bg-rose-600 
            border-solid border-2 border-white rounded-full drop-shadow-lg"
              >
                {cartItems.length}
              </span>
            ) : null}
          </div>
        </Link>
        <Link
          to="/"
          className="text-white cursor-pointer w-[100px] text-center"
        >
          Home
        </Link>

        <Dropdown state={state} logout={logout} />
      </div>
    </div>
  );
}
