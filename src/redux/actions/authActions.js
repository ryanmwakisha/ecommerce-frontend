import api from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

// Register User
export const register = (formData) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
    const res = await api.post('/auth/register', formData); // Ensure this matches your backend route

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    });

    setAuthToken(res.data.token);
  } catch (err) {
    console.error('Registration error:', err);
    const errorMsg = err.response?.data?.msg || err.message || 'An error occurred during registration';
    console.error('Error message:', errorMsg);
    dispatch({
      type: 'REGISTER_FAIL',
      payload: errorMsg
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  const body = { email, password };

  try {
    const res = await api.post('/auth/login', body); // Ensure this matches your backend route

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });

    setAuthToken(res.data.token);
  } catch (err) {
    console.error('Login error:', err);
    const errorMsg = err.response?.data?.msg || 'An error occurred during login';
    console.error('Error message:', errorMsg);
    dispatch({
      type: 'LOGIN_FAIL',
      payload: errorMsg
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  setAuthToken(null); // Remove token from local storage or headers
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // Set token in headers if it exists
  }

  try {
    const res = await api.get('/auth'); // Ensure this matches your backend route

    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    console.error('Load user error:', err);
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
};
