const SuccessfulModal = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h1>Successful</h1>
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessfulModal;
