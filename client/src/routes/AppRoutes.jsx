import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { Login } from "../pages/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import { Dashboard } from "../pages/Dashboard";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
