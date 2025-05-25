import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // check token in localStorage

  if (!token) {
    // Agar token nahi mila, to login page pe redirect
    return <Navigate to="/dashboard" replace />;
  }
 

  // Token mila, toh children (protected page) render karo
  return children;
};

export default PrivateRoute;
