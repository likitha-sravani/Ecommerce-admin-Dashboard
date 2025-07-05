import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './App.css';

function Navbar() {
  const { cart, user, setUser } = useContext(CartContext);
  const navigate = useNavigate();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <Link to="/products" style={{ color: '#fff', textDecoration: 'none' }}>
          My Ecommerce
        </Link>
      </div>
      <div className="navbar-actions">
        {user && (
          <Link to="/orders" style={{ color: '#fff', textDecoration: 'none', marginRight: 16, fontWeight: 'bold' }}>
            Orders
          </Link>
        )}
        <Link to="/cart" className="cart-icon" title="Cart">
          <span role="img" aria-label="cart">🛒</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        {user && (
          <button onClick={handleLogout} style={{ background: '#fff', color: '#1976d2', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 'bold', cursor: 'pointer' }}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar; 