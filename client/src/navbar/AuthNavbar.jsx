import { Link } from "react-router-dom";
import { useAuth } from "../context/Authentication";
import { useCartItem } from "../hook/cartItem.jsx";
import Dropdown from "../components/dropdown/Dropdown.jsx";

export default function AuthNavbar() {
  const { logout, state } = useAuth();
  const { cartItems, hasItemCart } = useCartItem();

  return (
    <div className="w-full h-[50px] flex justify-center bottom-0 fixed sm:relative sm:bottom-auto sm:top-0 sm:flex sm:justify-end text-xl font-semibold bg-red-500">
      <div className="flex w-[350px] justify-around sm:w-auto mt-2 text-xl">
        <Link to="/cart">
          <div className="w-[50px] self-center flex justify-center cursor-pointer">
            <img
              src="/public/img/cartIcon.png"
              className="static mr-4 size-10"
              alt="cart-icon"
            />
            {hasItemCart() ? (
              <span
                className="w-[25px] h-[25px] ml-3 flex justify-center items-center text-white absolute bg-rose-600 
            border-solid border-2 border-white rounded-full drop-shadow-lg"
              >
                {cartItems.length}
              </span>
            ) : null}
          </div>
        </Link>
        <Link
          to="/"
          className="w-[100px] flex justify-center text-white cursor-pointer "
        >
          Home
        </Link>

        <Dropdown state={state} logout={logout} />
      </div>
    </div>
  );
}
