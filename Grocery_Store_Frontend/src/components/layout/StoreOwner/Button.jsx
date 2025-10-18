import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-fresh-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-fresh hover:shadow-fresh-lg disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-gradient-to-r from-grocery-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-fresh hover:shadow-fresh-lg disabled:opacity-50 disabled:cursor-not-allowed',
    success: 'bg-gradient-to-r from-fresh-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-fresh hover:shadow-fresh-lg disabled:opacity-50 disabled:cursor-not-allowed',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-fresh hover:shadow-fresh-lg disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'hover:bg-fresh-green/10 text-gray-700 hover:text-fresh-green border border-gray-200 hover:border-fresh-green/30 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  return (
    <motion.div
      as={Component}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
      className={`
        font-medium rounded-2xl transition-all duration-200 flex items-center justify-center
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Button;