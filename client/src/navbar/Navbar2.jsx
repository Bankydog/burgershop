import React from "react";
import { useAuth } from "../context/Authentication";
import AuthNavbar2 from "./AuthNavbar2.jsx";
import UnAuthNavbar2 from "./UnAuthNavbar2.jsx";

export default function Navbar2() {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <AuthNavbar2 /> : <UnAuthNavbar2 />}</>;
}
