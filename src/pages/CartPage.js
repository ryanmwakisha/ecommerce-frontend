import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/actions/cartActions';
import api from '../api';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = async () => {
    try {
      const response = await api.post('/orders', {
        products: cartItems.map(item => ({ product: item._id, quantity: 1 })),
        totalAmount: cartItems.reduce((total, item) => total + item.price, 0),
        shippingAddress: '123 Main St',
        paymentInfo: 'Paid with Stripe',
      });
      dispatch(clearCart());
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item._id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button onClick={() => handleRemove(item._id)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage;
