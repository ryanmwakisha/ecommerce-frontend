const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
    case 'ADD_PRODUCT_REQUEST':
    case 'UPDATE_PRODUCT_REQUEST':
    case 'DELETE_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'ADD_PRODUCT_SUCCESS':
    case 'UPDATE_PRODUCT_SUCCESS':
    case 'DELETE_PRODUCT_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_PRODUCTS_FAILURE':
    case 'ADD_PRODUCT_FAILURE':
    case 'UPDATE_PRODUCT_FAILURE':
    case 'DELETE_PRODUCT_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
