import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import { getProducts } from '../api';
import '../App.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  console.log('products:', products);

  if (loading) return <div className="centered">Loading...</div>;
  if (error) return <div className="centered" style={{ color: 'red' }}>{error}</div>;
  if (!Array.isArray(products)) {
    return <div className="centered" style={{ color: 'red' }}>Products data is not an array. Check your backend API.</div>;
  }

  return (
    <div>
      <h2 style={{ marginLeft: 32, marginTop: 32 }}>Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image || '/oranges-bg.jpg'} alt={product.name} />
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{product.name}</div>
            <div>Price: ₹{Number(product.price).toFixed(2)}</div>
            <div>Stock: {product.stock}</div>
            <button onClick={() => addToCart(product)}>ADD TO CART</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product; 