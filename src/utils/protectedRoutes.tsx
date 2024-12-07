import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {  useAuthContext } from "../contexts/AuthContext";

function ProtectedRoute() {
  // Use the custom hook for safe context access
  const { authenticated , userType } = useAuthContext();

  return authenticated ? <Outlet /> :  <Navigate to="/login" />;
}

export default ProtectedRoute;
