import React, { useState, useContext, createContext } from "react";
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

  const navigate = useNavigate();

  ////////////////// register //////////////////

  const register = async (data) => {
    await axios.post("http://localhost:4000/auth/register", data);
    alert("Register is successfull");
    navigate("/login");
  };

  ////////////////// login //////////////////
  const login = async (data) => {
    // Added data parameter
    try {
      const result = await axios.post("http://localhost:4000/auth/login", data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken });
      alert("Login is successfull");
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      setState({ ...state, error: "Login failed" });
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
