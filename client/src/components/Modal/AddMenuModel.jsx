import React, { useState } from "react";
import { usePost } from "../../hook/usePostsAPI.jsx";

const AddMenuModel = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  const [name, setName] = useState("");
  const [catalog, setCatalog] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const { addMenu } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("catalog", catalog);
    formData.append("price", price);
    formData.append("description", description);
    if (picture) {
      formData.append("picture", picture);
    }

    addMenu(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="w-full bg-white p-2 rounded flex flex-col justify-center items-center">
            {/* Close button */}
            <button
              className="text-black text-xl mr-2 pb-2 self-end"
              onClick={onClose}
            >
              X
            </button>
            <h1>Add Menu</h1>
            <label>
              Name
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Add name of menu"
                className="border p-1 rounded"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </label>
            <label>
              Category
              <select
                id="catalog"
                name="catalog"
                className="border p-1 rounded"
                onChange={(e) => setCatalog(e.target.value)}
                value={catalog}
                required
              >
                <option disabled value="">
                  -- Select a category --
                </option>
                <option value="promotion">Promotion</option>
                <option value="burger">Hamburger</option>
                <option value="frychicken">Fry Chicken</option>
                <option value="snacks">Snacks</option>
                <option value="beverage">Beverage</option>
              </select>
            </label>
            <label>
              Price
              <input
                id="price"
                name="price"
                type="text"
                placeholder="Add price"
                className="border p-1 rounded"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </label>
            <label>
              Description
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Add description"
                className="border p-1 rounded"
                maxLength="100"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </label>

            <label htmlFor="upload">
              Picture
              <input
                id="picture"
                name="picture"
                type="file"
                className="border p-1 rounded"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </label>
            {picture && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(picture)}
                  alt="Uploaded"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Add Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModel;
