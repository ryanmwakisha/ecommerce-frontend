// components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
