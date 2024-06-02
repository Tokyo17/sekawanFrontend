// src/Pages/NotFound.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = ({ dataLogin }) => {
  if (!dataLogin.name) {
    return <Navigate to="/" replace />;
  }
  return <Navigate to="/home" replace />;
};

export default NotFound;
