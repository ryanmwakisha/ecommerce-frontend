export const addToCart = (product) => (dispatch) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  
  export const removeFromCart = (productId) => (dispatch) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };
  
  export const clearCart = () => (dispatch) => {
    dispatch({ type: 'CLEAR_CART' });
  };
  