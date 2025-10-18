import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, RotateCcw, Check } from 'lucide-react';

const PopupFilter = ({ 
  isOpen, 
  onClose, 
  filters, 
  onApplyFilters,
  categories = [],
  subcategories = []
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleCheckboxChange = (filterType, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handlePriceRangeChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: Number(value)
      }
    }));
  };

  const handleRatingChange = (rating) => {
    setLocalFilters(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      categories: [],
      subcategories: [],
      priceRange: { min: 0, max: 50 },
      minRating: 0,
      // badges: []
    };
    setLocalFilters(resetFilters);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // const badges = ['Organic', 'Fresh', 'Sale', 'Local'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100">
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 rounded-full p-2">
                  <Filter className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Filter Products</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Categories
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={localFilters.categories.includes(category)}
                            onChange={() => handleCheckboxChange('categories', category)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border-2 transition-all ${
                            localFilters.categories.includes(category)
                              ? 'bg-green-600 border-green-600'
                              : 'border-gray-300 group-hover:border-green-400'
                          }`}>
                            {localFilters.categories.includes(category) && (
                              <Check className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
                            )}
                          </div>
                        </div>
                        <span className="text-gray-700 group-hover:text-green-600 transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                {subcategories.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Subcategories
                    </h3>
                    <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin">
                      {subcategories.map((subcategory) => (
                        <label key={subcategory} className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={localFilters.subcategories.includes(subcategory)}
                              onChange={() => handleCheckboxChange('subcategories', subcategory)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border-2 transition-all ${
                              localFilters.subcategories.includes(subcategory)
                                ? 'bg-blue-600 border-blue-600'
                                : 'border-gray-300 group-hover:border-blue-400'
                            }`}>
                              {localFilters.subcategories.includes(subcategory) && (
                                <Check className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
                              )}
                            </div>
                          </div>
                          <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                            {subcategory}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Min Price</label>
                        <input
                          type="number"
                          value={localFilters.priceRange.min}
                          onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          min="0"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Max Price</label>
                        <input
                          type="number"
                          value={localFilters.priceRange.max}
                          onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                      ${localFilters.priceRange.min} - ${localFilters.priceRange.max}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Minimum Rating
                  </h3>
                  <div className="space-y-3">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="radio"
                            name="rating"
                            checked={localFilters.minRating === rating}
                            onChange={() => handleRatingChange(rating)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                            localFilters.minRating === rating
                              ? 'bg-yellow-500 border-yellow-500'
                              : 'border-gray-300 group-hover:border-yellow-400'
                          }`}>
                            {localFilters.minRating === rating && (
                              <div className="w-2 h-2 bg-white rounded-full absolute top-1.5 left-1.5"></div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-gray-600 ml-2">{rating}+ Stars</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                {/* <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Product Badges
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {badges.map((badge) => (
                      <label key={badge} className="cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localFilters.badges.includes(badge)}
                          onChange={() => handleCheckboxChange('badges', badge)}
                          className="sr-only"
                        />
                        <div className={`px-4 py-2 rounded-full border-2 transition-all ${
                          localFilters.badges.includes(badge)
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600'
                        }`}>
                          {badge}
                        </div>
                      </label>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset All</span>
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupFilter;