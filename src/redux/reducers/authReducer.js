const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null
};

// Helper function to remove the token from localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Reducer function
function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'REGISTER_REQUEST':
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
        loading: false,
        error: null
      };

    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
      removeToken(); // Remove token on failure
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: {
          message: payload.message || 'An error occurred during authentication',
          details: payload.details || null
        }
      };

    case 'LOGOUT':
      removeToken(); // Remove token on logout
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null
      };

    default:
      return state;
  }
}
