import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/header/Header.jsx";
import Navbar from "../navbar/navbar.jsx";
import { TailSpin } from "react-loader-spinner";
import { useAuth } from "../context/Authentication.jsx";
import { usePost } from "../hook/usePostsAPI.jsx";
import SuccessfulModal from "../components/modal/SuccessfulModal.jsx";

function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    lastname: "",
    address: "",
    telephone: "",
    email: "",
  });
  const { getProfile, postProfile, putProfile, hasDataProfile } = usePost();
  const { userId } = useAuth();

  const fetchData = async (userId) => {
    try {
      const result = await getProfile(userId);
      if (result) {
        setProfile(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (hasDataProfile) {
        await putProfile(profile, userId);
      } else {
        await postProfile(profile, userId);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("Error submitting profile");
    }
  };

  useEffect(() => {
    fetchData(userId);
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-auto h-screen p-4 bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mt-14 md:mb-64 ">
            <h1 className="mb-6 text-2xl font-bold text-center">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "lastname", label: "Last Name", type: "text" },
                { id: "address", label: "Address", type: "text" },
                { id: "telephone", label: "Telephone", type: "tel" },
                { id: "email", label: "Email", type: "email" },
              ].map(({ id, label, type }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block mb-2 text-sm font-medium"
                  >
                    {label}:
                  </label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    required
                    value={profile[id]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-3 text-white transition bg-blue-500 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <SuccessfulModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default ProfilePage;
