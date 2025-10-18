import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`bg-white rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;