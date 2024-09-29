import React from "react";
import NoneUser from "./pages/NoneUser.jsx";
import { useAuth } from "./context/Authentication.jsx";
import Admin from "./adminPages/Admin.jsx";
import User from "./pages/User.jsx";
import "./App.css";

function App() {
  const { isAuthenticated, isAdmin } = useAuth();

  return isAuthenticated ? isAdmin ? <Admin /> : <User /> : <NoneUser />;
}

export default App;
