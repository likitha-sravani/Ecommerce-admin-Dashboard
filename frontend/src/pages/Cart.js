import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext';
import { checkout } from '../api';
import '../App.css';

function Cart() {
  const { cart, setCart, user } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRemove = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleQtyChange = (id, qty) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, Number(qty)) } : item
    ));
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await checkout(cart, user?.token);
      setCart([]);
      setSuccess('Order placed successfully!');
    } catch (err) {
      setError('Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div>
      <h2 style={{ marginLeft: 32, marginTop: 32 }}>Shopping Cart</h2>
      <div className="cart-grid">
        {cart.map(item => (
          <div className="cart-card" key={item.id}>
            <img src={item.image || '/oranges-bg.jpg'} alt={item.name} />
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.name}</div>
            <div>Price: ₹{Number(item.price).toFixed(2)}</div>
            <div>Subtotal: ₹{(Number(item.price) * item.quantity).toFixed(2)}</div>
            <div>
              Qty <input type="number" min="1" value={item.quantity} onChange={e => handleQtyChange(item.id, e.target.value)} />
            </div>
            <button className="remove-btn" onClick={() => handleRemove(item.id)} title="Remove">🗑️</button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: 64 }}>
        <div className="cart-total">Total: ₹{total.toFixed(2)}</div>
        <button className="checkout-btn" onClick={handleCheckout} disabled={loading || cart.length === 0}>
          {loading ? 'Processing...' : 'CHECKOUT'}
        </button>
      </div>
      {error && <div style={{ color: 'red', textAlign: 'right', marginRight: 64 }}>{error}</div>}
      {success && <div style={{ color: 'green', textAlign: 'right', marginRight: 64 }}>{success}</div>}
    </div>
  );
}

export default Cart; 
