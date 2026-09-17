import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [flights, setFlights] = useState([]);
  const [bump, setBump] = useState(0);

  const addItem = useCallback((product, fromRect) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsOpen(true);
    setBump((b) => b + 1);
    if (fromRect) {
      const flightId = `${Date.now()}-${Math.random()}`;
      setFlights((f) => [...f, { flightId, image: product.image, fromRect }]);
      setTimeout(() => {
        setFlights((f) => f.filter((x) => x.flightId !== flightId));
      }, 750);
    }
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty + delta) } : p))
        .filter((p) => p.qty > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, subtotal } = useMemo(() => {
    const count = items.reduce((s, p) => s + p.qty, 0);
    const subtotal = items.reduce((s, p) => s + p.qty * p.price, 0);
    return { count, subtotal };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clear, isOpen, setIsOpen, count, subtotal, flights, bump }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
