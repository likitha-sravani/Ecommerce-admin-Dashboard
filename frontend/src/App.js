import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import { CartProvider } from './CartContext';
import Login from './pages/Login';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import './App.css';


function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </CartProvider>
  );
}

export default App; 