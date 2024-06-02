// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, dataLogin }) => {
  console.log(dataLogin)
  if (dataLogin.level === "admin" || dataLogin.level === "guest") {
    if (dataLogin.level === "guest" && window.location.pathname === "/home") {
      return <Navigate to="/tickets" replace />;
    }
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
