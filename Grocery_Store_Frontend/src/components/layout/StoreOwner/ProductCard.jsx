import React from 'react';
import { Edit, Package, AlertCircle, Eye, Star } from 'lucide-react';

const ProductCard = ({ product, onEdit, onView }) => {
  const isLowStock = product.lowStockValue > product.currentStock;  
  
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-40 sm:h-48 object-fill group-hover:scale-110 transition-transform duration-300"
        />
        {isLowStock && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs flex items-center space-x-1 shadow-lg">
            <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>Low Stock</span>
          </div>
        )}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-lg">
            {product.categoryName}
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <h3 className="font-bold text-gray-800 text-base sm:text-lg line-clamp-2 flex-1">{product.name}</h3>
          {product.isFeatured && (
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current ml-2 flex-shrink-0" />
          )}
        </div>
        
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${product.price}</span>
          <div className={`flex items-center space-x-1 text-sm px-3 py-1 rounded-full ${
            isLowStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            <Package className="w-4 h-4" />
            <span className="font-medium">{product.currentStock}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={() => onView(product)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;