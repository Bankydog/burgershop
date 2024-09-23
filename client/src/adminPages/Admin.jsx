import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePageAdmin from "./HomePageAdmin.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import MenuManagement from "./MenuManagement.jsx";
import CookingPage from "./CookingPage.jsx";
import RiderPage from "./RiderPage.jsx";
import StatisticsPage from "./StatisticsPage.jsx";

export default function Admin() {
  return (
    <Routes>
      <Route path="/" element={<HomePageAdmin />} />
      <Route path="/menumanagement" element={<MenuManagement />} />
      <Route path="/cooking" element={<CookingPage />} />
      <Route path="/rider" element={<RiderPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
