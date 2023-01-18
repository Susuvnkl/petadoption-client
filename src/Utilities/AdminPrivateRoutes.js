import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminPrivateRoutes() {
  const { admin } = useContext(AuthContext);

  return admin ? <Outlet /> : <Navigate to="/" />;
}
