import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import orderReducer from './reducers/orderReducer';
import profileReducer from './reducers/profileReducer';
import reviewReducer from './reducers/reviewReducer';
import cartReducer from './reducers/cartReducer';
import rootReducer from './reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    orders: orderReducer,
    profile: profileReducer,
    reviews: reviewReducer,
    cart: cartReducer,
    reducer: rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
