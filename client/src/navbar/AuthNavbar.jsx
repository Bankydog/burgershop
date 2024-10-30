import { Link } from "react-router-dom";
import { useAuth } from "../context/Authentication";
import { useCartItem } from "../hook/cartItem.jsx";
import Dropdown from "../components/dropdown/Dropdown.jsx";

export default function AuthNavbar() {
  const { logout, state } = useAuth();
  const { cartItems, hasItemCart } = useCartItem();

  return (
    <div className="w-full h-[50px] flex justify-center bottom-0 fixed lgg:relative lgg:bottom-auto lgg:top-0 lgg:flex lgg:justify-end text-xl font-semibold bg-red-500">
      <div
        className="flex justify-around w-auto mt-2 text-xl
      smm:w-[1150px] lgg:w-[300px]"
      >
        <Link to="/cart">
          <div className="w-[50px] self-center flex justify-center cursor-pointer">
            <img
              src="/img/carticon.png"
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
