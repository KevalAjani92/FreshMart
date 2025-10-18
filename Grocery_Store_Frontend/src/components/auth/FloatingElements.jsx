import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  // const fruits = ['🍎', '🥕', '🥬', '🍌', '🍊', '🥒', '🍇', '🥑','🍓','🥛','🥤','🍞','🍉','🍍'];
  const fruits = [
    // Fruits
    '🍎', '🍌', '🍊', '🍇', '🍉', '🍍', '🥭', '🍒', '🍓', '🍑',

    // Vegetables
    '🥕', '🥬', '🥒', '🥦', '🧅', '🧄', '🍆', '🌽', '🍄', '🥔',

    // Dairy & Beverages
    '🥛', '🧈', '🧃', '🥤',

    // Bakery & Staples
    '🍞', '🥖', '🥐', '🍚', '🍜', '🍯', '🧂',

    // General Grocery
    '🛒', '🏪', '📦', '🧺', '💰'
  ];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {fruits.map((fruit, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          {fruit}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;