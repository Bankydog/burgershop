import React from "react";

export default function AdminRiderCard({
  orders,
  handleStartSending,
  handleSended,
  handleFinished,
  handleCancelOrder,
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
            <div className="w-[200px] h-[115px] mt-4 flex flex-col items-center justify-center place-self-center">
              <img
                src={`../public/img/${order.state}.png`}
                alt={order.state}
                className="object-cover w-[100px] h-[100px] rounded"
              />
              <p className="mt-2 text-xl">State: {order.state}</p>
            </div>
          </div>
          <div className="flex justify-center mt-2 mb-2">
            <p className="text-xl font-bold text-rose-500">{order.comment}</p>
          </div>
          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-3 text-2xl md:grid-cols-2 place-items-center">
            <button
              className={`w-[100px] h-[40px] border-2 border-black rounded-lg text-white ${
                ["sending", "sended"].includes(order.state)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-400 hover:text-slate-100"
              }`}
              onClick={() => handleStartSending(order.order_no)}
              disabled={["sending", "sended"].includes(order.state)}
            >
              Sending
            </button>
            <button
              className={`w-[100px] h-[40px] bg-blue-500 border-2 border-black rounded-lg text-white  ${
                ["sended"].includes(order.state)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-400 hover:text-slate-100"
              }`}
              onClick={() => handleSended(order.order_no)}
              disabled={["cooked", "sended"].includes(order.state)}
            >
              Sended
            </button>
            <button
              className="w-[100px] h-[40px] bg-green-500 border-2 border-black rounded-lg text-white hover:bg-green-400 hover:text-slate-100"
              onClick={() => handleFinished(order.order_no)}
              disabled={["cooked", "sending"].includes(order.state)}
            >
              Finish
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
