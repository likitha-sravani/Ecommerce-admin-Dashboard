import React, { createContext, useState } from 'react';

export const CartContext = createContext();

function getInitialUser() {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUserState] = useState(getInitialUser());

  const setUser = (u) => {
    setUserState(u);
    if (u) {
      localStorage.setItem('user', JSON.stringify(u));
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, user, setUser }}>
      {children}
    </CartContext.Provider>
  );
} 