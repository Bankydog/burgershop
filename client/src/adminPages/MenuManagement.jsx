import { useState } from "react";
import AddMenuModel from "../components/Modal/AddMenuModel.jsx";

export default function MenuManagement() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="">Menu</h1>
        <ul>
          <li>Promotion</li>
          <li>Hamburger</li>
          <li>Fry Chicken</li>
          <li>Snacks</li>
          <li>Beverage</li>
        </ul>
        <button
          className="w-[100px] h-[100px] bg-green-500 rounded hover:bg-slate-400"
          onClick={() => setShowModal(true)}
        >
          add menu
        </button>
      </div>
      <AddMenuModel isVisible={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
