import React from "react";

const SuccessfulModal = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="p-4 bg-white rounded">
        <h1>Successful</h1>
        <button
          className="p-2 mt-2 text-white bg-blue-500 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessfulModal;
