import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: 'user'
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Destructure isAuthenticated, user, loading, and error from Redux state
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  // Redirect if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to home or another page if already authenticated
    }
  }, [isAuthenticated, navigate]);

  // Redirect based on user role
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'trader') {
        navigate('/trader-dashboard'); // Redirect to trader dashboard
      } else {
        navigate('/'); // Redirect to home for other roles
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitting registration form", formData);
      try {
        await dispatch(register(formData)); // Wait for the dispatch to complete
        console.log("Registration successful, checking user state...");
      
        navigate('/'); // Redirect after successful registration
      } catch (error) {
        console.error("Registration error caught in component:", error);
      }
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
          {formErrors.username && <span className="error">{formErrors.username}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
          {formErrors.password && <span className="error">{formErrors.password}</span>}
          <PasswordStrengthMeter password={formData.password} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />
          {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="trader">Trader</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className="error-message">{typeof error === 'string' ? error : 'An error occurred during registration'}</p>}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default RegisterPage;
