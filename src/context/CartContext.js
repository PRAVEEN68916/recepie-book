import React, { createContext, useContext, useState } from 'react';



const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find(ci => ci.id === item.id);
    if (existing) {
      setCart(cart.map(ci => ci.id === item.id ? { ...ci, qty: ci.qty + 1 } : ci));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeItem = (id) => setCart(cart.filter(i => i.id !== id));

  const increaseQty = (id) => setCart(cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  const decreaseQty = (id) => setCart(cart.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, increaseQty, decreaseQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
