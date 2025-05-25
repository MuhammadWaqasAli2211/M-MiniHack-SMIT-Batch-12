import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const storedRole = localStorage.getItem(`${role}_role`);
  const token = localStorage.getItem(`${role}_token`);

  if (!storedRole || storedRole !== role || !token) {
    return <Navigate to={`/${role}login`} />;
  }

  return children;
};

export default ProtectedRoute;
