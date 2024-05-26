import React from "react";
import { useAuth } from "../context/Authentication";
import AuthNavbar from "./AuthNavbar.jsx";
import UnAuthNavbar from "./UnAuthNavbar.jsx";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <AuthNavbar /> : <UnAuthNavbar />}</>;
}
