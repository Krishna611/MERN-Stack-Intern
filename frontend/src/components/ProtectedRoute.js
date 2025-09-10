import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  if (!auth?.token) return <Navigate to="/login" />; // not logged in
  if (role && auth.role !== role) return <Navigate to="/" />; // wrong role

  return children;
};

export default ProtectedRoute;
