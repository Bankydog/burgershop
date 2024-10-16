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
        <div className="flex flex-col items-center w-full h-screen p-4">
          <h1 className="mb-4 text-2xl">Profile</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                required
                value={profile.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="block text-lg">
                Last Name:
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Enter last name"
                required
                value={profile.lastname}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-lg">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter address"
                required
                value={profile.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telephone" className="block text-lg">
                Telephone:
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                placeholder="Enter telephone"
                required
                value={profile.telephone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                required
                value={profile.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button type="submit" className="p-2 mt-4 text-white bg-blue-500">
              Submit
            </button>
          </form>
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
