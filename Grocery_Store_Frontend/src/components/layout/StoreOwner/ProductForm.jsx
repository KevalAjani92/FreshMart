import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Star, Package, DollarSign, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const ProductForm = ({ isOpen, onClose, product = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: null,
    isFeatured: false,
    categoryId: '',
    price: '',
    // imageUrl: '',
    currentStock: '',
    lowStockValue: '',
    isActive: true,
    storeOwnerId: '1', // Default store owner ID
    subCategoryId: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [categories,setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);


  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://localhost:7188/api/Category')
      setCategories(response.data);
      // console.log('Categories fetched:', response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('https://localhost:7188/api/SubCategory')
      setSubCategories(response.data);
      // console.log('Subcategories fetched:', response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  }
  useEffect(()=>{
    fetchCategories();
    fetchSubCategories();
  },[]);

  const storeOwners = [
    { id: 1, name: 'John Smith - Main Store' },
    { id: 2, name: 'Sarah Johnson - Branch Store' }
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        brand: product.brand || '',
        description: product.description || null,
        isFeatured: product.isFeatured || false,
        categoryId: product.categoryId?.toString() || '',
        price: product.price?.toString() || '',
        // imageUrl: product.imageUrl || '',
        currentStock: product.currentStock?.toString() || '',
        lowStockValue: product.lowStockValue?.toString() || '',
        isActive: product.isActive !== undefined ? product.isActive : true,
        storeOwnerId: product.storeOwnerId?.toString() || '1',
        subCategoryId: product.subCategoryId?.toString() || '',
        image:null
      });
      setImagePreview(product.imageUrl || null);
    } else {
      // Reset form for new product
      setFormData({
        name: '',
        brand: '',
        description: '',
        isFeatured: false,
        categoryId: '',
        price: '',
        // imageUrl: '',
        currentStock: '',
        lowStockValue: '',
        isActive: true,
        storeOwnerId: '1',
        subCategoryId: '',
        image: null
      });
      setImagePreview(null);
    }
    setErrors({});
  }, [product, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleInputChange('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.currentStock || parseInt(formData.currentStock) < 0) newErrors.currentStock = 'Valid stock quantity is required';
    if (!formData.lowStockValue || parseInt(formData.lowStockValue) < 0) newErrors.lowStockValue = 'Valid low stock value is required';
    if (!formData.imageFile && !imagePreview) newErrors.imageFile = 'Product image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const productData = {
      ...formData,
      categoryId: parseInt(formData.categoryId),
      price: parseFloat(formData.price),
      currentStock: parseInt(formData.currentStock),
      lowStockValue: parseInt(formData.lowStockValue),
      storeOwnerId: parseInt(formData.storeOwnerId),
      subCategoryId: formData.subCategoryId ? parseInt(formData.subCategoryId) : null
    };
    
    onSave(productData);
    onClose();
  };

  const availableSubCategories = formData.categoryId
  ? subCategories.filter(sub => sub.categoryID === parseInt(formData.categoryId))
  : [];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-xl sm:rounded-2xl">
                <Package className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
                <p className="text-green-100 text-sm sm:text-base">Fill in the product details below</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-xl sm:rounded-2xl transition-all duration-200"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-100px)] sm:max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span>Basic Information</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 text-sm sm:text-base ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter brand name"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={2}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </div>

            {/* Category & Pricing */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span>Category & Pricing</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => {
                      handleInputChange('categoryId', e.target.value);
                      handleInputChange('subCategoryId', ''); // Reset subcategory
                    }}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 text-sm sm:text-base ${
                      errors.categoryId ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.categoryID} value={category.categoryID}>{category.name}</option>
                    ))}
                  </select>
                  {errors.categoryId && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.categoryId}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                  <select
                    value={formData.subCategoryId}
                    onChange={(e) => handleInputChange('subCategoryId', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    disabled={!formData.categoryId}
                  >
                    <option value="">Select Subcategory</option>
                    {availableSubCategories.map(subCategory => (
                      <option key={subCategory.subCategoryID} value={subCategory.subCategoryID}>{subCategory.subCategoryName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Store Owner *</label>
                  <select
                    value={formData.storeOwnerId}
                    onChange={(e) => handleInputChange('storeOwnerId', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  >
                    {storeOwners.map(owner => (
                      <option key={owner.id} value={owner.id}>{owner.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Price *</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 text-sm sm:text-base ${
                      errors.price ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'
                    }`}
                    placeholder="0.00"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                    }}
                  />
                  {errors.price && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Current Stock *</label>
                  <input
                    type="text"
                    min="0"
                    value={formData.currentStock}
                    onChange={(e) => handleInputChange('currentStock', e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 text-sm sm:text-base ${
                      errors.currentStock ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'
                    }`}
                    placeholder="0"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                    }}
                  />
                  {errors.currentStock && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.currentStock}</p>}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Low Stock Alert *</label>
                  <input
                    type="text"
                    min="0"
                    value={formData.lowStockValue}
                    onChange={(e) => handleInputChange('lowStockValue', e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 text-sm sm:text-base ${
                      errors.lowStockValue ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-transparent'
                    }`}
                    placeholder="0"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                    }}
                  />
                  {errors.lowStockValue && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lowStockValue}</p>}
                </div>
              </div>
            </div>

            {/* Image & Settings */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-orange-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                <span>Image & Settings</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Image URL *</label>
                  <input
                    type="file"
                    accept='image/*'
                    onChange={handleImageChange}
                    className="block w-full text-sm sm:text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  {errors.image && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.image}</p>}
                </div>

                {imagePreview && (
                  <div className="mt-2">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow"
                    />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <div className="flex items-center space-x-2">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Featured Product</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Active Product</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 sm:px-8 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl sm:rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Save className="w-4 h-4" />
                <span>{product ? 'Update Product' : 'Create Product'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;