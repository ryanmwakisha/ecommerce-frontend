import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import profileReducer from './profileReducer';
import reviewReducer from './reviewReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  orders: orderReducer,
  profile: profileReducer,
  reviews: reviewReducer,
  cart: cartReducer,
});

export default rootReducer;
