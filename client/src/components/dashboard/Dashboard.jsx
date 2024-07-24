import AddToCartModal from "../modal/AddToCartModal";
import { useState } from "react";

function Dashboard({ data }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-[250px] h-[400px] bg-white rounded-lg shadow-lg  flex flex-col justify-evenly items-center"
          >
            <img
              src={item.image_url}
              alt={item.food_name}
              className="w-[200px] h-[200px] rounded-lg object-cover"
            />
            <div className="font-semibold text-lg text-center">
              {item.food_name}
            </div>
            <div className=" font-bold text-[30px]">{item.price} Bath</div>

            <button
              onClick={() => setShowModal(true)}
              className="w-[140px] h-[50px] bg bg-red-500 rounded-3xl text-white font-bold hover:bg-black hover:text-yellow-300
               active:bg-gray-900 active:text-yellow-400"
            >
              ADD TO CART
            </button>
            <AddToCartModal
              isVisible={showModal}
              onClose={() => setShowModal(false)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
