import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import TraderDashboard from './pages/TraderDashboard';
import HomePage from './pages/HomePage';
import './App.css';  // Ensure this path matches your CSS file location

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin-dashboard" 
            element={<ProtectedRoute element={AdminDashboard} allowedRoles={['admin']} />} 
          />
          <Route 
            path="/trader-dashboard" 
            element={<ProtectedRoute element={TraderDashboard} allowedRoles={['trader']} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
