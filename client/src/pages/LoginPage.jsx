import React, { useState } from "react";
import Navbar from "../navbar/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authentication.jsx";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      username,
      password,
    });
  };

  return (
    <>
      <Navbar />
      <div className="h-[720px] w-full flex justify-center items-center">
        <div className="h-[300px] w-[550px] flex flex-col justify-end items-center border-4 border-sky-500 p-4">
          <h1>Login</h1>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block">
                Username:
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  className="ml-3 border p-1"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </label>
            </div>
            <div className="mt-2">
              <label htmlFor="password" className="block">
                Password:
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  className="ml-4 border p-1"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4">
            <span>Don't have an account?</span>
            <button
              className="text-blue-500 hover:underline ml-2"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
