import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Apple,
  Star,
  Package,
  AlertTriangle,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
  TrendingUp,
  Calendar,
  Tag
} from 'lucide-react';
import Card from '../../components/layout/StoreOwner/Card';
import Badge from '../../components/layout/StoreOwner/Badge';
import Button from '../../components/layout/StoreOwner/Button';
import KPICard from '../../components/layout/StoreOwner/KPICard';

// Mock product data
const productDetails = {
  '1': {
    id: 1,
    name: 'Organic Bananas',
    brand: 'Fresh Farms',
    description: 'Sweet and ripe organic bananas, perfect for smoothies and snacks. Grown without pesticides and harvested at peak ripeness for maximum flavor and nutrition.',
    isFeatured: true,
    categoryName: 'Fresh Fruits',
    subCategoryName: 'Tropical',
    price: 4.99,
    imageUrl: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=600',
    currentStock: 45,
    lowStockValue: 20,
    isActive: true,
    status: 'available',
    salesThisWeek: 89,
    salesThisMonth: 245,
    revenue: 1223.55,
    lastRestocked: '2024-01-10',
    supplier: 'Fresh Farms Co.',
    sku: 'FF-BAN-001'
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);

  const product = productDetails[id];

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Apple className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Product not found</p>
          <Link to="/owner/products">
            <Button className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    console.log('Deleting product:', product.id);
  };

  const handleUpdateStock = () => {
    console.log('Updating stock for product:', product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/owner/products"
            className="p-3 hover:bg-fresh-green/10 rounded-2xl transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-fresh-green" />
          </Link>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-fresh-green"
            >
              {product.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mt-1"
            >
              Product Details & Analytics
            </motion.p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Product Card */}
          <Card className="p-8 grocery-pattern">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-3xl shadow-fresh"
                  />
                  {product.isFeatured && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="warning" className="flex items-center gap-2 px-3 py-2">
                        <Star className="h-4 w-4" />
                        Featured Product
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={
                        product.status === 'available' ? 'success' :
                          product.status === 'low-stock' ? 'warning' : 'error'
                      }
                      className="px-3 py-2"
                    >
                      {product.status === 'available' ? 'Available' :
                        product.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-lg text-fresh-green font-semibold mb-1">{product.brand}</p>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-fresh-green/5 rounded-2xl">
                    <span className="text-gray-700 font-medium">Price</span>
                    <span className="text-3xl font-bold text-fresh-green">${product.price}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-gray-200">
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold text-gray-900">{product.categoryName}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-gray-200">
                      <p className="text-sm text-gray-600">Subcategory</p>
                      <p className="font-semibold text-gray-900">{product.subCategoryName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-gray-200">
                      <p className="text-sm text-gray-600">Current Stock</p>
                      <p className="text-2xl font-bold text-gray-900">{product.currentStock}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-gray-200">
                      <p className="text-sm text-gray-600">Low Stock Alert</p>
                      <p className="text-2xl font-bold text-grocery-yellow">{product.lowStockValue}</p>
                    </div>
                  </div>

                  {product.currentStock <= product.lowStockValue && (
                    <div className="flex items-center space-x-2 p-4 bg-grocery-yellow/10 border border-grocery-yellow/30 rounded-2xl">
                      <AlertTriangle className="h-5 w-5 text-grocery-yellow" />
                      <span className="text-grocery-yellow font-medium">
                        Stock is running low! Consider restocking soon.
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1" onClick={handleUpdateStock}>
                    <Package className="h-4 w-4 mr-2" />
                    Update Stock
                  </Button>
                  <Button variant="secondary" onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Details */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-fresh-green mb-6">Product Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">SKU</span>
                  <span className="font-mono text-gray-900">{product.sku}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Supplier</span>
                  <span className="font-medium text-gray-900">{product.supplier}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Last Restocked</span>
                  <span className="font-medium text-gray-900">{product.lastRestocked}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Status</span>
                  <Badge variant={product.isActive ? 'success' : 'error'}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Featured</span>
                  <Badge variant={product.isFeatured ? 'warning' : 'secondary'}>
                    {product.isFeatured ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Performance Stats */}
          <div className="grid grid-cols-1 gap-4">
            <KPICard
              title="Sales This Week"
              value={product.salesThisWeek}
              change="+12% from last week"
              changeType="positive"
              icon={ShoppingCart}
              color="bg-fresh-green"
            />
            <KPICard
              title="Monthly Sales"
              value={product.salesThisMonth}
              change="+8% from last month"
              changeType="positive"
              icon={TrendingUp}
              color="bg-grocery-orange"
            />
            <KPICard
              title="Revenue"
              value={`$${product.revenue}`}
              change="This month"
              changeType="positive"
              icon={TrendingUp}
              color="bg-grocery-yellow"
            />
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-fresh-green mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="ghost">
                <Package className="h-4 w-4 mr-2" />
                Restock Product
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Tag className="h-4 w-4 mr-2" />
                Add to Promotion
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Star className="h-4 w-4 mr-2" />
                Toggle Featured
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Eye className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </Card>

          {/* Stock Alert */}
          {product.currentStock <= product.lowStockValue && (
            <Card className="p-6 border-l-4 border-l-grocery-yellow bg-grocery-yellow/5">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-grocery-yellow mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-grocery-yellow">Stock Alert</h3>
                  <p className="text-gray-700 mt-1">
                    This product is running low. Current stock: {product.currentStock}
                  </p>
                  <Button className="mt-3" size="sm">
                    <Package className="h-4 w-4 mr-2" />
                    Restock Now
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;