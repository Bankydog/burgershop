import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userDataFromToken = jwtDecode(token);
        setState((prevState) => ({
          ...prevState,
          user: userDataFromToken,
        }));
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const navigate = useNavigate();

  ////////////////// register //////////////////

  const register = async (data) => {
    try {
      await axios.post("http://localhost:4000/auth/register", data);
      alert("Register is successfull");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Registration failed: ${error.response.data.error}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Registration failed: No response from server.");
      } else {
        console.error("Error message:", error.message);
        alert(`Registration failed: ${error.message}`);
      }
    }
  };

  ////////////////// login //////////////////
  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/auth/login", data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken });
      console.log("State after login:", state);
      alert("Login is successfull");
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      setState({ ...state, error: "Login failed" });
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert("Login failed: An unknown error occurred");
      }
    }
  };

  ////////////////// logout //////////////////
  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
  };

  ////////////////// check-auth //////////////////
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
