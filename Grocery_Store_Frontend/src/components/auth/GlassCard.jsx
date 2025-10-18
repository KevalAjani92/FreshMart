import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`
        backdrop-blur-xl bg-white/80 border border-white/20 
        rounded-3xl shadow-2xl shadow-emerald-500/10
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;