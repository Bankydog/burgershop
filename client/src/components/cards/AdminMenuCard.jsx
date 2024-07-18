import { useState } from "react";
import { usePost } from "../../hook/usePostsAPI";

const AdminMenuCard = ({ categories, data, fetchData }) => {
  const { deleteMenu } = usePost();

  const colorByCat = (value) => {
    switch (value) {
      case "promotion":
        return "bg-red-500";
      case "burger":
        return "bg-yellow-500";
      case "frychicken":
        return "bg-orange-500";
      case "snacks":
        return "bg-green-500";
      case "beverage":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenu(id);
      await fetchData();
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <div className="h-auto flex flex-col justify-center items-center">
      <div className="w-full max-w-5xl mt-3">
        {categories.map((category, index) => (
          <div key={index} className="mb-8">
            <h1
              className={`h-[40px] w-full flex justify-center items-center mt-2 rounded-md text-white text-3xl shadow-md ${colorByCat(
                category.value
              )}`}
            >
              {category.name}
            </h1>
            <ul className="w-[1000px] flex flex-wrap justify-center items-center gap-4">
              {data
                .filter((items) => items[0].catalog === category.value)
                .map((items, idx) =>
                  items.map((item, index) => (
                    <li
                      key={index}
                      className="flex flex-col items-center p-4 mt-2 bg-white rounded-lg shadow-md"
                    >
                      <div className="font-semibold mb-2">{item.food_name}</div>
                      <div className="mb-2">{item.price}</div>
                      <img
                        src={item.image_url}
                        alt={item.food_name}
                        className="w-[100px] h-[100px] rounded-lg"
                      />
                      <div>{item.description}</div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-[100px] h-[30px] bg-red-500 rounded mt-2 text-lg shadow-md hover:bg-red-700 hover:text-white"
                      >
                        DELETE
                      </button>
                    </li>
                  ))
                )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenuCard;
