import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const FlyToCartLayer = () => {
  const { flights } = useCart();

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <AnimatePresence>
        {flights.map((f) => {
          const cartEl = document.querySelector('[data-testid="open-cart-btn"]');
          const cartRect = cartEl
            ? cartEl.getBoundingClientRect()
            : { left: window.innerWidth - 48, top: 24, width: 20, height: 20 };

          return (
            <motion.img
              key={f.flightId}
              src={f.image}
              alt=""
              initial={{
                position: 'fixed',
                left: f.fromRect.left,
                top: f.fromRect.top,
                width: f.fromRect.width,
                height: f.fromRect.height,
                opacity: 1,
              }}
              animate={{
                left: cartRect.left + cartRect.width / 2 - 8,
                top: cartRect.top + cartRect.height / 2 - 8,
                width: 16,
                height: 16,
                opacity: 0.25,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ position: 'fixed', objectFit: 'cover', borderRadius: 6 }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default FlyToCartLayer;
