import React from 'react';
import { Navigate } from 'react-router-dom';

function RoleProtectedRoute({ element, allowedRoles }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Asume que el rol se guarda en localStorage al iniciar sesión

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirige si el rol no está permitido
  }

  return element;
}

export default RoleProtectedRoute;
