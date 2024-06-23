import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePageAdmin from "./HomePageAdmin.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import MenuManagement from "./MenuManagement.jsx";

export default function Admin() {
  return (
    <Routes>
      <Route path="/" element={<HomePageAdmin />} />
      <Route path="/menumanagement" element={<MenuManagement />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
