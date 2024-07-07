import { useState } from "react";
import AddMenuModel from "../components/modal/AddMenuModel.jsx";
import AdminMenuCard from "../components/cards/AdminMenuCard.jsx";

export default function MenuManagement() {
  const [showModal, setShowModal] = useState(false);

  const categories = [
    { name: "Promotion", value: "promotion" },
    { name: "Hamburger", value: "hamburger" },
    { name: "Fry Chicken", value: "frychicken" },
    { name: "Snacks", value: "snacks" },
    { name: "Beverage", value: "beverage" },
  ];

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <AdminMenuCard categories={categories} />
        <button
          className="w-[100px] h-[100px] bg-green-500 rounded hover:bg-slate-400"
          onClick={() => setShowModal(true)}
        >
          Add Menu
        </button>
      </div>
      <AddMenuModel isVisible={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
