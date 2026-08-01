import React, { createContext, useState, useContext, useCallback } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

// Create Context
const CartContext = createContext();

// CartProvider to wrap the application with cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const axiosPublic = useAxiosPublic();

  // Function to update cart state from an array of items
  const updateCart = useCallback((newCart) => {
    const items = Array.isArray(newCart) ? newCart : [];
    setCart(items);
    setCartCount(items.length);
    const totalPrice = items.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );
    setCartTotal(totalPrice.toFixed(2));
  }, []);

  // Fetch cart from API and sync to context — call this after any add/remove/update
  const fetchAndSyncCart = useCallback(
    async (email) => {
      if (!email) return;
      try {
        const token = localStorage.getItem("accessToken");
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await fetch(
          `${apiUrl}/cart/${email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        updateCart(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to sync cart:", err);
      }
    },
    [updateCart]
  );

  return (
    <CartContext.Provider
      value={{ cart, cartCount, cartTotal, updateCart, fetchAndSyncCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};
