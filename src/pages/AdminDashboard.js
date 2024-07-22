import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/actions/orderActions';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <h2>Order {order._id}</h2>
            <p>Status: {order.status}</p>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Shipping Address: {order.shippingAddress}</p>
            <div>
              {order.products.map((item) => (
                <div key={item.product._id}>
                  <p>{item.product.name}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
