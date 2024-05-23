import React, { useState } from "react";
import Navbar from "../navbar/navbar.jsx";
// import { useAuth } from "../../contexts/authentication.jsx";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = "user";
    const data = { username, password, role };

    // try {
    //   await register(data, navigate);
    //   setUsername("");
    //   setPassword("");
    // } catch (error) {
    //   console.error("Error registering user:", error);
    // }
  };

  return (
    <>
      <Navbar />
      <div className="h-[720px] w-full flex flex-col justify-center items-center">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              required
              minLength={8}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="border p-2"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border p-2"
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
