import React, { useState } from "react";
import Header from "../components/header/Header.jsx";
import Navbar from "../navbar/navbar.jsx";
import Navbar2 from "../navbar/Navbar2.jsx";
import { useAuth } from "../context/Authentication.jsx";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = "user";
    const data = { username, password, role };

    try {
      await register(data, navigate);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex items-center justify-center w-auto h-screen p-4 bg-gray-100">
        <div className="w-full max-w-md p-8 mb-32 bg-white rounded-lg shadow-lg md:mb-96">
          <h1 className="mb-6 text-2xl font-bold text-center">Register</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                required
                minLength={8}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white transition bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
      <Navbar2 />
    </>
  );
}
