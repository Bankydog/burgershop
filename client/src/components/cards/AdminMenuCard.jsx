import { useEffect, useState } from "react";
import { usePost } from "../../hook/usePostsAPI";

const AdminMenuCard = ({ categories }) => {
  const { getMenu } = usePost();
  const [data, setData] = useState([]);

  const getCategoryClass = (categoryValue) => {
    switch (categoryValue) {
      case "promotion":
        return "bg-red-500";
      case "hamburger":
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMenu();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getMenu]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="w-full max-w-md">
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <div>{item.food_name}</div>
              <div>{item.price}</div>
              <img
                src={item.image_url}
                alt={item.food_name}
                className="w-[100px] h-[100px]"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminMenuCard;

{
  /* <div className="w-full flex flex-col justify-center items-center">
  <h1 className="text-2xl font-bold mb-4">Menu</h1>
  <div className="w-full max-w-md">
    {menu.map((menuItem) => (
      <div key={menuItem.category} className="mb-4">
        <h1
          className={`flex justify-center items-center text-3xl font-bold ${getCategoryClass(
            menuItem.category
          )} text-white p-2 rounded`}
        >
          {menuItem.category}
        </h1>
        <ul className="mt-2">
          {Array.isArray(menuItem.data) && menuItem.data.length > 0 ? (
            menuItem.data.map((item) => (
              <li
                key={item.name}
                className="flex justify-between items-center bg-white shadow-md rounded p-2 mb-2"
              >
                <span className="font-semibold">{item.name}</span>
                <span className="font-semibold">{item.price}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No items available</li>
          )}
        </ul>
      </div>
    ))}
  </div>
</div>; */
}
