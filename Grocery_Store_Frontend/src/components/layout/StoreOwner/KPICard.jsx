import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

const KPICard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color
}) => {
  const changeColors = {
    positive: 'text-primary-600 bg-primary-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  const gradientColors = {
    'bg-green-500': 'from-primary-500 to-primary-600',
    'bg-blue-500': 'from-blue-500 to-blue-600',
    'bg-purple-500': 'from-purple-500 to-purple-600',
    'bg-orange-500': 'from-secondary-500 to-secondary-600',
    'bg-emerald-500': 'from-primary-500 to-primary-600',
    'bg-red-500': 'from-red-500 to-red-600',
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            {value}
          </motion.p>
          {change && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`inline-flex items-center px-2 py-1 rounded-xl text-xs font-medium ${changeColors[changeType]}`}
            >
              {change}
            </motion.div>
          )}
        </div>
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          className={`p-4 rounded-2xl bg-gradient-to-br ${gradientColors[color] || 'from-primary-500 to-primary-600'} shadow-soft`}
        >
          <Icon className="h-6 w-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default KPICard;