import React from "react";

export default function AdminCookCard({
  orders,
  handleStartCooking,
  handleCancelOrder,
  handleCooked,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {orders.map((order) => (
        <div
          key={order.order_no}
          className="flex flex-col p-4 bg-orange-100 border border-black rounded-lg shadow-md"
        >
          <div className="flex flex-col flex-grow">
            <h3 className="text-lg font-bold">Order: {order.order_no}</h3>
            <p className="text-sm">
              Ordered Time:{" "}
              {new Date(order.ordered_time)
                .toLocaleString("en-GB", {
                  timeZone: "Asia/Bangkok",
                })
                .replace(",", "")
                .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")}
            </p>
            <div className="mt-2">
              <h4 className="font-semibold">Items:</h4>
              {order.items.map((item, index) => (
                <p key={index} className="text-sm">
                  {item.food_name} - Quantity: {item.amount}
                </p>
              ))}
            </div>
          </div>
          {/* Right Column - State Image */}
          <div className="flex justify-center mt-4">
            <img
              src={`/img/${order.state}.png`}
              alt={order.state}
              className="object-cover w-20 h-20 rounded"
            />
          </div>
          <p className="mt-2 text-xl font-bold text-center text-rose-500">
            {order.comment}
          </p>
          {/* Buttons */}
          <div className="flex justify-between mt-3 space-x-2">
            <button
              className={`flex-1 px-2 py-1 border-2 border-black rounded-lg text-white ${
                order.state === "cooking"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-400 hover:text-slate-100"
              }`}
              onClick={() => handleStartCooking(order.order_no)}
              disabled={order.state === "cooking"}
            >
              Cooking
            </button>
            <button
              className="flex-1 px-2 py-1 text-white bg-green-500 border-2 border-black rounded-lg hover:bg-green-400 hover:text-slate-100"
              onClick={() => handleCooked(order.order_no)}
              disabled={order.state === "ordered"}
            >
              Cooked
            </button>
            <button
              className="flex-1 px-2 py-1 text-white bg-red-500 border-2 border-black rounded-lg hover:bg-red-400 hover:text-slate-100"
              onClick={() => handleCancelOrder(order.order_no)}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
