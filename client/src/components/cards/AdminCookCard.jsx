import React from "react";

export default function AdminCookCard({
  orders,
  handleStartCooking,
  handleCancelOrder,
  handleCooked,
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 mx-auto md:grid-cols-4">
      {orders.map((order) => (
        <div
          key={order.order_no}
          className="w-full max-w-lg p-4 bg-orange-100 border border-black rounded"
        >
          <div className="flex flex-col md:flex-row">
            {/* Content - Left Column */}
            <div className="flex-1">
              <h3 className="text-lg font-bold">Order: {order.order_no}</h3>
              <p>
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
                  <p key={index}>
                    {item.food_name} - Quantity: {item.amount}
                  </p>
                ))}
              </div>
            </div>
            {/* Content - Right Column */}
            <div className="w-[200px] h-[115px] mt-4 flex flex-col items-center justify-center">
              <img
                src={`../public/img/${order.state}.png`}
                alt={order.state}
                className="object-cover w-[100px] h-[100px] rounded"
              />
              <p className="mt-2 text-xl">State: {order.state}</p>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-center mt-3 space-x-3 text-2xl">
            <button
              className={`w-[100px] h-[40px] border-2 border-black rounded-lg text-white ${
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
              className="w-[100px] h-[40px] bg-green-500 border-2 border-black rounded-lg text-white hover:bg-green-400 hover:text-slate-100"
              onClick={() => handleCooked(order.order_no)}
              disabled={order.state === "ordered"}
            >
              Cooked
            </button>
            <button
              className="w-[100px] h-[40px] bg-red-500 border-2 border-black rounded-lg text-white hover:bg-red-400 hover:text-slate-100"
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
