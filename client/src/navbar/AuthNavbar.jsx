import { Link } from "react-router-dom";
import { useAuth } from "../context/Authentication";
import { useCartItem } from "../hook/cartItem.jsx";
import Dropdown from "../components/dropdown/Dropdown.jsx";

export default function AuthNavbar() {
  const { logout, state } = useAuth();
  const { cartItems, hasItemCart } = useCartItem();

  return (
    <div className="w-full h-[50px] flex justify-end text-xl font-semibold bg-red-500">
      <div className="w-auto flex mt-2">
        <Link to="/cart">
          <div className="w-auto flex justify-between cursor-pointer mr-2">
            <img
              src="../public/img/cartIcon.png"
              className="size-10 mr-4 static"
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
        <Link to="/" className="cursor-pointer text-white mr-6">
          Home
        </Link>

        <Dropdown state={state} logout={logout} />
      </div>
    </div>
  );
}
