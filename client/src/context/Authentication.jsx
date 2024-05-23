import React, { useContext, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();

  ////////////////// register //////////////////

  const register = async (data) => {
    await axios.post("http://localhost:4000/auth/register", data);
    alert("Register is successfull");
    navigate("/");
  };
  return (
    <AuthContext.Provider value={{ register }}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
