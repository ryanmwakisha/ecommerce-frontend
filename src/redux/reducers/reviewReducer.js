const initialState = {
    reviews: [],
    loading: false,
    error: null,
  };
  
  const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_REVIEW_REQUEST':
      case 'FETCH_REVIEWS_REQUEST':
        return { ...state, loading: true };
      case 'ADD_REVIEW_SUCCESS':
        return { ...state, loading: false, reviews: [...state.reviews, action.payload] };
      case 'FETCH_REVIEWS_SUCCESS':
        return { ...state, loading: false, reviews: action.payload };
      case 'ADD_REVIEW_FAILURE':
      case 'FETCH_REVIEWS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default reviewReducer;
  