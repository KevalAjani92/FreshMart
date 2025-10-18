import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const AnimatedInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  icon: Icon,
  placeholder,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className="relative">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={clsx(
              'peer w-full px-4 py-4 pl-12 pr-12 text-gray-900 placeholder-transparent border-2 rounded-2xl transition-all duration-300 focus:outline-none',
              error 
                ? 'border-red-400 focus:border-red-500 bg-red-50' 
                : 'border-gray-200 focus:border-emerald-500 bg-white hover:border-gray-300',
              'shadow-sm focus:shadow-lg focus:shadow-emerald-500/20'
            )}
            placeholder={placeholder}
            {...props}
          />
          
          {/* Floating Label */}
          <label
            className={clsx(
              'absolute left-12 transition-all duration-300 pointer-events-none',
              (isFocused || value) 
                ? '-top-2 text-xs bg-white px-2 text-emerald-600 font-medium' 
                : 'top-4 text-gray-500'
            )}
          >
            {label}
          </label>
          
          {/* Left Icon */}
          <div className="absolute left-4 top-4 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
          
          {/* Password Toggle */}
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        
        {/* Animated Border */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? '100%' : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600 flex items-center"
        >
          <span className="mr-1">⚠️</span>
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedInput;