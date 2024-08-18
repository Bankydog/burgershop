import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import ErrorPage from "./ErrorPage.jsx";
import CartPage from "./CartPage.jsx";
import StatusPage from "./StatusPage.jsx";

function User() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/status" element={<StatusPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default User;
