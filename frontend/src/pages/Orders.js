import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import { getOrders } from '../api';
import '../App.css';

function Orders() {
  const { user } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    getOrders(user.token)
      .then(data => {
        setOrders(data.results || data);
      })
      .catch(() => setError('Failed to load orders'))
      .finally(() => setLoading(false));
  }, [user]);

  const statusClass = (status) => {
    switch (status) {
      case 'processing': return 'status-badge status-processing';
      case 'cancelled': return 'status-badge status-cancelled';
      case 'completed': return 'status-badge status-completed';
      case 'pending': return 'status-badge status-pending';
      default: return 'status-badge';
    }
  };

  if (!user) return <div className="centered">Please login to view your orders.</div>;
  if (loading) return <div className="centered">Loading...</div>;
  if (error) return <div className="centered" style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2 style={{ marginLeft: 32, marginTop: 32 }}>Your Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Created</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer_name || 'Guest'}</td>
              <td><span className={statusClass(order.status)}>{order.status}</span></td>
              <td>{order.created_at}</td>
              <td>
                {order.items && order.items.length > 0 ? (
                  <div>
                    {order.items.map(item => (
                      <div key={item.product}>
                        <b>{item.product_name}</b> × {item.quantity} @ ₹{Number(item.price).toFixed(2)}
                      </div>
                    ))}
                  </div>
                ) : 'No items'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders; 