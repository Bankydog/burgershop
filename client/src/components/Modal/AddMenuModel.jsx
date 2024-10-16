import { useState } from "react";
import { usePost } from "../../hook/usePostsAPI.jsx";
import SuccessfulModal from "./SuccessfulModal.jsx";
import imageCompression from "browser-image-compression";

const AddMenuModel = ({ isVisible, onClose, fetchData }) => {
  if (!isVisible) {
    return null;
  }

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [catalog, setCatalog] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        setPicture(compressedFile);
      } catch (error) {
        console.error("Error compressing file:", error);
      }
    }
  };

  const { addMenu } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setErrorMessage(""); // Reset any previous error message

    const formData = new FormData();
    formData.append("name", name);
    formData.append("catalog", catalog);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("picture", picture);

    try {
      await addMenu(formData);
      setShowModal(true);
      fetchData();
      // Reset form fields after successful submission
      setName("");
      setCatalog("");
      setPrice("");
      setDescription("");
      setPicture(null);
    } catch (error) {
      setErrorMessage("Error adding menu: " + error.message); // Display error message
      console.error("Error adding menu:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="w-[600px] flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center w-full p-4 bg-white rounded">
            <button
              type="button"
              className="self-end pb-2 mr-2 text-xl text-black"
              onClick={onClose}
            >
              X
            </button>
            <h1>Add Menu</h1>

            {/* Input Fields */}
            <label className="flex flex-col w-full mb-2">
              Name
              <input
                type="text"
                placeholder="Add name of menu"
                className="p-1 border rounded"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </label>
            <label className="flex flex-col w-full mb-2">
              Category
              <select
                className="p-1 border rounded"
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
            <label className="flex flex-col w-full mb-2">
              Price
              <input
                type="text"
                placeholder="Add price"
                className="p-1 border rounded"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </label>
            <label className="flex flex-col w-full mb-2">
              Description
              <input
                type="text"
                placeholder="Add description"
                className="p-1 border rounded"
                maxLength="100"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </label>
            <label className="flex flex-col w-full mb-2">
              Picture
              <input
                type="file"
                className="p-1 border rounded"
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
                  className="object-cover w-32 h-32 rounded"
                />
              </div>
            )}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            {isUploading ? (
              <button
                className="p-2 mt-4 text-white bg-pink-500 rounded"
                disabled
              >
                Uploading...
              </button>
            ) : (
              <button
                type="submit"
                className="p-2 mt-4 text-white bg-blue-500 rounded"
              >
                Add Menu
              </button>
            )}
          </div>
          <SuccessfulModal isVisible={showModal} onClose={handleModalClose} />
        </form>
      </div>
    </div>
  );
};

export default AddMenuModel;
