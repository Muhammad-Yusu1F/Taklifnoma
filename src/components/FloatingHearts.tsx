import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeartParticle {
  id: number;
  x: number; // percentage from left
  size: number; // in pixels
  delay: number; // animation delay in seconds
  duration: number; // animation duration in seconds
  rotation: number;
  fill: boolean;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Generate initial set of hearts
    const initialHearts: HeartParticle[] = Array.from({ length: 15 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100,
      size: Math.random() * 24 + 12,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 5,
      rotation: Math.random() * 360,
      fill: Math.random() > 0.4,
    }));
    setHearts(initialHearts);

    // Periodically add new hearts to sustain the pattern
    const interval = setInterval(() => {
      setHearts((prev) => {
        const nextId = prev.length > 0 ? Math.max(...prev.map((h) => h.id)) + 1 : 0;
        const newHeart: HeartParticle = {
          id: nextId,
          x: Math.random() * 100,
          size: Math.random() * 24 + 12,
          delay: 0,
          duration: Math.random() * 6 + 6,
          rotation: Math.random() * 360,
          fill: Math.random() > 0.4,
        };
        // Keep active hearts list within reasonable count
        return [...prev.slice(-20), newHeart];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-gradient-to-b from-[#fff8f8] via-[#fff5f6] to-[#ffe8ee] select-none">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, rotate: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.4, 0.4, 0],
              rotate: heart.rotation + 180,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{
              position: 'absolute',
              width: heart.size,
              height: heart.size,
              color: '#9b0044',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={heart.fill ? '#9b0044' : 'none'}
              stroke="#9b0044"
              strokeWidth="1.5"
              className="w-full h-full opacity-35"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
