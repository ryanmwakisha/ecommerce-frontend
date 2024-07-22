import api from '../../api';

export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PROFILE_REQUEST' });
  try {
    const response = await api.get('/profile');
    dispatch({ type: 'FETCH_PROFILE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PROFILE_FAILURE', payload: error.response.data });
  }
};

export const updateProfile = (profile) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PROFILE_REQUEST' });
  try {
    const response = await api.put('/profile', profile);
    dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_PROFILE_FAILURE', payload: error.response.data });
  }
};
