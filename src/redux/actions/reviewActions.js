import api from '../../api';

export const addReview = (review) => async (dispatch) => {
  dispatch({ type: 'ADD_REVIEW_REQUEST' });
  try {
    const response = await api.post('/reviews', review);
    dispatch({ type: 'ADD_REVIEW_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADD_REVIEW_FAILURE', payload: error.response.data });
  }
};

export const fetchReviews = (productId) => async (dispatch) => {
  dispatch({ type: 'FETCH_REVIEWS_REQUEST' });
  try {
    const response = await api.get(`/reviews/${productId}`);
    dispatch({ type: 'FETCH_REVIEWS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_REVIEWS_FAILURE', payload: error.response.data });
  }
};
