import React from "react";
import { motion } from "framer-motion";

const Badge = ({ children, variant, className = "" }) => {
  const variants = {
    pending:
      "bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 border border-accent-300",
    confirmed:
      "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300",
    packed:
      "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border border-indigo-300",
    shipped:
      "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300",
    delivered:
      "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-300",
    cancelled:
      "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300",
    success:
      "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-300",
    warning:
      "bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 border border-accent-300",
    error:
      "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300",
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-3 py-1 rounded-2xl text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
