import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ role }) => {
  const { user } = useContext(AuthContext);

  return user && role.includes(user.role) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
