import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoutes() {
  const { loggedUser } = useContext(AuthContext);

  return (
    <>
      {loggedUser ? <Outlet /> : <Navigate to="/" />};{/* {loggedUser === undefined && <Loader />} */}
    </>
  );
}
