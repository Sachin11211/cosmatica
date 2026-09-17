import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Multi-color floating petals (matches the colorful card aesthetic)
const PETALS = 16;
const COLORS = [
  ['#B76E79', '#7A1022'],
  ['#23A6B0', '#0E7C66'],
  ['#D4AF37', '#B8860B'],
  ['#F472B6', '#B76E79'],
  ['#F7E7CE', '#D4AF37'],
];

const FloatingPetals = () => {
  const items = useMemo(
    () =>
      Array.from({ length: PETALS }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 16 + Math.random() * 14,
        size: 10 + Math.random() * 20,
        rotate: Math.random() * 360,
        drift: -50 + Math.random() * 100,
        colors: COLORS[i % COLORS.length],
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {items.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10%', x: 0, opacity: 0, rotate: p.rotate }}
          animate={{
            y: '110vh',
            x: [0, p.drift, -p.drift, 0],
            opacity: [0, 0.75, 0.75, 0],
            rotate: p.rotate + 360,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size,
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <defs>
              <linearGradient id={`pg-${p.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={p.colors[0]} />
                <stop offset="100%" stopColor={p.colors[1]} />
              </linearGradient>
            </defs>
            <path
              d="M12 2 C16 6 18 10 18 14 C18 18 15 22 12 22 C9 22 6 18 6 14 C6 10 8 6 12 2 Z"
              fill={`url(#pg-${p.id})`}
              opacity="0.85"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPetals;
