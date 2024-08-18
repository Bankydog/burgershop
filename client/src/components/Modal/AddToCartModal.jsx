import { useState } from "react";
import { useAuth } from "../../context/Authentication";
import { Link } from "react-router-dom";

function AddToCartModal({ isVisible, onClose, item, onAddToCart }) {
  const [count, setCount] = useState(1);
  const { isAuthenticated } = useAuth();

  if (!isVisible) {
    return null;
  }

  const handleCount = (event) => {
    setCount((prevCount) => Math.max(1, prevCount + event));
  };

  const handleConfirm = () => {
    if (count > 0) {
      onAddToCart({ ...item, amount: count });
      setCount(1);
      onClose();
    }
  };

  return isAuthenticated ? (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[700px] h-[400px] flex flex-col justify-between items-center bg-white rounded-lg shadow-md">
        <div className="w-full h-[50px] bg-red-500 rounded-t-lg"></div>
        <div className="text-2xl font-semibold">Amount</div>
        <div className="w-[75%] h-[60px] flex justify-center items-center">
          <button
            onClick={() => handleCount(-1)}
            className="w-[70px] h-[70px] px-4 text-xl border-solid border-2 rounded-2xl shadow-lg
             hover:bg-sky-100 active:bg-sky-300 active:border-none "
          >
            -
          </button>
          <span className="w-[200px] mx-4 text-xl text-center">{count}</span>
          <button
            onClick={() => handleCount(1)}
            className="w-[70px] h-[70px] px-4 text-xl border-solid border-2 rounded-2xl shadow-lg
             hover:bg-sky-100 active:bg-sky-300 active:border-none"
          >
            +
          </button>
        </div>
        <div className="w-[55%] h-[60px] flex justify-between mb-5">
          <button
            onClick={handleConfirm}
            className="w-[150px] h-[60px] text-3xl bg-green-500 rounded-lg shadow-lg border-solid border-2 border-black
          hover:bg-green-400 hover:text-gray-100 active:bg-green-600 active:border-none focus:ring"
          >
            CONFIRM
          </button>
          <button
            className="w-[150px] h-[60px] text-3xl bg-red-500 rounded-lg shadow-lg border-solid border-2 border-black 
            hover:bg-red-400 hover:text-gray-100 active:bg-red-600 active:border-none focus:ring"
            onClick={onClose}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[700px] h-[400px] flex flex-col justify-around items-center bg-white rounded-lg shadow-md">
        <div className="text-3xl">Please Log in</div>
        <div className="w-[55%] h-[60px] flex justify-between mb-5 ">
          <Link to={"/login"}>
            <button
              className="w-[150px] h-[60px] text-3xl bg-green-500 rounded-lg shadow-lg border-solid border-2 border-black
          hover:bg-green-400 hover:text-gray-100 active:bg-green-600 active:border-none focus:ring"
            >
              Log in
            </button>
          </Link>
          <button
            className="w-[150px] h-[60px] text-3xl bg-red-500 rounded-lg shadow-lg border-solid border-2 border-black 
            hover:bg-red-400 hover:text-gray-100 active:bg-red-600 active:border-none focus:ring"
            onClick={onClose}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCartModal;
