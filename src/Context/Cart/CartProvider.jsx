import React, { createContext, useState, useContext } from "react";

// Create Context
const CartContext = createContext();

// CartProvider to wrap the application with cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Function to update cart state
  const updateCart = (newCart) => {
    setCart(newCart);
    const totalCount = newCart.length;
    const totalPrice = newCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartCount(totalCount);
    setCartTotal(totalPrice.toFixed(2));
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};
