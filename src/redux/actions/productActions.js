import api from '../../api';

export const fetchProducts = (params = {}) => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const response = await api.get('/products', { params });
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

export const addProduct = (productData) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_REQUEST' });
  try {
    const response = await api.post('/products', productData);
    dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: response.data });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch({ type: 'ADD_PRODUCT_FAILURE', payload: error.message });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });
  try {
    const response = await api.put(`/products/${id}`, productData);
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: response.data });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch({ type: 'UPDATE_PRODUCT_FAILURE', payload: error.message });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_REQUEST' });
  try {
    await api.delete(`/products/${id}`);
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: id });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch({ type: 'DELETE_PRODUCT_FAILURE', payload: error.message });
  }
};
