import React from "react";

function Dashboard({ data }) {
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full h-[400px] bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <img
              src={item.image_url}
              alt={item.food_name}
              className="w-[150px] h-[150px] rounded-lg mb-4 object-cover"
            />
            <div className="font-semibold text-lg mb-2 text-center">
              {item.food_name}
            </div>
            <div className="text-gray-600 mb-2">${item.price}</div>
            <div className="text-gray-500 text-sm text-center">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
