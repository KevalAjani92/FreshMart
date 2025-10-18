import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  prefix = '',
  suffix = '',
  trend
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 200);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    let startTime;
    let animationId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 1000, 1);
      
      const currentValue = Math.floor(value * progress);
      setAnimatedValue(currentValue);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 hover:shadow-2xl transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-50 to-transparent rounded-full -mr-10 -mt-10" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-green-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-green-800">
            {prefix}{animatedValue.toLocaleString()}{suffix}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-bold px-2 py-1 rounded-full ${
                  trend.isPositive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                }`}
              >
                {trend.isPositive ? '📈 +' : '📉 '}{trend.value}%
              </span>
              <span className="text-xs text-green-500 ml-2 font-medium">vs last week</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${color} shadow-lg transform hover:scale-110 transition-transform`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;