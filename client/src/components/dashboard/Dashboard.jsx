import AddToCartModal from "../modal/AddToCartModal";
import { useState } from "react";

function Dashboard({ data, onAddToCart }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddToCartClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleAddToCart = (item) => {
    onAddToCart(item);
    setShowModal(false);
  };

  return (
    <>
      <div className="grid h-auto grid-cols-1 gap-5 p-4 pb-20 bg-gray-100 rounded-lg sm:h-screen snd:grid-cols-2 mdd:grid-cols-3 xll:grid-cols-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-[250px] h-[400px] bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center p-4"
          >
            <img
              src={item.image_url}
              alt={item.food_name}
              className="w-full h-[200px] sm:w-[200px] sm:h-[200px] rounded-lg object-cover"
            />
            <div className="text-lg font-semibold text-center">
              {item.food_name}
            </div>
            <div className="text-xl font-bold sm:text-2xl">
              {item.price} Bath
            </div>

            <button
              onClick={() => handleAddToCartClick(item)}
              className="w-[200px] sm:w-[140px] h-[50px] bg-red-500 rounded-3xl text-white font-bold hover:bg-black hover:text-yellow-300
               active:bg-gray-900 active:text-yellow-400 transition-all duration-300"
            >
              ADD TO CART
            </button>
            <AddToCartModal
              isVisible={showModal}
              onClose={() => setShowModal(false)}
              item={selectedItem}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
