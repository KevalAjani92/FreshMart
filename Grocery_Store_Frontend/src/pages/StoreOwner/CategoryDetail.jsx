import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Grid3X3, Apple, Carrot, Milk, Heading as Bread, Coffee, Package, Star, Plus, Edit, Trash2, Eye, AlertTriangle, TrendingUp } from 'lucide-react';
import Card from '../../components/layout/StoreOwner/Card';
import Badge from '../../components/layout/StoreOwner/Badge';
import Button from '../../components/layout/StoreOwner/Button';
import KPICard from '../../components/layout/StoreOwner/KPICard';
import Modal from '../../components/layout/StoreOwner/Modal';

const iconComponents = {
  Apple,
  Carrot,
  Milk,
  Bread,
  Coffee,
  Package,
  Star
};

// Mock category data
const categoryDetails = {
  '1': {
    id: 1,
    name: 'Fresh Fruits',
    description: 'Fresh and organic fruits from local farms, carefully selected for quality and taste',
    iconName: 'Apple',
    isActive: true,
    productCount: 24,
    subcategoryCount: 4,
    totalRevenue: 12450,
    avgPrice: 5.99,
    subcategories: [
      { id: 1, name: 'Citrus Fruits', productCount: 8, description: 'Oranges, lemons, limes and more' },
      { id: 2, name: 'Berries', productCount: 6, description: 'Strawberries, blueberries, raspberries' },
      { id: 3, name: 'Tropical Fruits', productCount: 5, description: 'Bananas, pineapples, mangoes' },
      { id: 4, name: 'Tree Fruits', productCount: 5, description: 'Apples, pears, peaches' }
    ]
  }
};

const allCategories = [
  { id: 1, name: 'Fresh Fruits' },
  { id: 2, name: 'Vegetables' },
  { id: 3, name: 'Dairy Products' },
  { id: 4, name: 'Bakery' },
  { id: 5, name: 'Beverages' }
];

const CategoryDetail = () => {
  const { id } = useParams();
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  
  const [newSubcategory, setNewSubcategory] = useState({
    name: '',
    description: '',
    categoryId: id || ''
  });

  const category = categoryDetails[id];

  if (!category) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Grid3X3 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Category not found</p>
          <Link to="/owner/categories">
            <Button className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconComponents[category.iconName] || Apple;

  const handleAddSubcategory = () => {
    console.log('Adding subcategory:', newSubcategory);
    setNewSubcategory({
      name: '',
      description: '',
      categoryId: id || ''
    });
    setShowAddSubcategoryModal(false);
  };

  const handleEditSubcategory = (subcategory) => {
    setEditingSubcategory(subcategory);
    setNewSubcategory({
      name: subcategory.name,
      description: subcategory.description,
      categoryId: id || ''
    });
    setShowAddSubcategoryModal(true);
  };

  const handleDeleteSubcategory = (subcategory) => {
    setSubcategoryToDelete(subcategory);
    setShowDeleteModal(true);
  };

  const confirmDeleteSubcategory = () => {
    console.log('Deleting subcategory:', subcategoryToDelete.id);
    setShowDeleteModal(false);
    setSubcategoryToDelete(null);
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
            to="/owner/categories"
            className="p-3 hover:bg-fresh-green/10 rounded-2xl transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-fresh-green" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl">
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-fresh-green"
              >
                {category.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 mt-1"
              >
                Category Management & Analytics
              </motion.p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary">
            <Edit className="h-4 w-4 mr-2" />
            Edit Category
          </Button>
          <Button onClick={() => setShowAddSubcategoryModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Subcategory
          </Button>
        </div>
      </div>

      {/* Category Overview */}
      <Card className="p-8 grocery-pattern">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Category Information</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-gray-200">
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant={category.isActive ? 'success' : 'error'} className="mt-1">
                  {category.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gray-200">
                <p className="text-sm text-gray-600">Icon</p>
                <div className="flex items-center space-x-2 mt-1">
                  <IconComponent className="h-5 w-5 text-fresh-green" />
                  <span className="font-medium text-gray-900">{category.iconName}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <KPICard
              title="Total Products"
              value={category.productCount}
              change="In this category"
              changeType="positive"
              icon={Package}
              color="bg-fresh-green"
            />
            <KPICard
              title="Subcategories"
              value={category.subcategoryCount}
              change="Active subcategories"
              changeType="positive"
              icon={Grid3X3}
              color="bg-grocery-orange"
            />
          </div>
        </div>
      </Card>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Category Revenue"
          value={`$${category.totalRevenue.toLocaleString()}`}
          change="+15% this month"
          changeType="positive"
          icon={TrendingUp}
          color="bg-fresh-green"
        />
        <KPICard
          title="Average Price"
          value={`$${category.avgPrice}`}
          change="Per product"
          changeType="neutral"
          icon={Star}
          color="bg-grocery-orange"
        />
        <KPICard
          title="Market Share"
          value="32%"
          change="Of total sales"
          changeType="positive"
          icon={TrendingUp}
          color="bg-grocery-yellow"
        />
      </div>

      {/* Subcategories Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-fresh-green flex items-center gap-2">
            <Grid3X3 className="h-6 w-6" />
            Subcategories ({category.subcategories.length})
          </h3>
          <Button onClick={() => setShowAddSubcategoryModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Subcategory
          </Button>
        </div>

        {category.subcategories.length > 0 ? (
          <div className="space-y-4">
            {category.subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-fresh-green/5 border border-gray-200 rounded-2xl hover:shadow-fresh transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{subcategory.name}</h4>
                      <p className="text-gray-600">{subcategory.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-fresh-green font-medium">
                          {subcategory.productCount} products
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditSubcategory(subcategory)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteSubcategory(subcategory)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="p-6 bg-gradient-to-br from-fresh-green/10 to-grocery-orange/10 rounded-3xl mb-4">
                <Grid3X3 className="h-12 w-12 text-fresh-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Subcategories</h3>
              <p className="text-gray-500 mb-4">Add subcategories to better organize your products</p>
              <Button onClick={() => setShowAddSubcategoryModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Subcategory
              </Button>
            </motion.div>
          </div>
        )}
      </Card>

      {/* Add/Edit Subcategory Modal */}
      <Modal
        isOpen={showAddSubcategoryModal}
        onClose={() => {
          setShowAddSubcategoryModal(false);
          setEditingSubcategory(null);
        }}
        title={editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Category
            </label>
            <select
              value={newSubcategory.categoryId}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, categoryId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-gray-50"
              disabled
            >
              {allCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory Name *
            </label>
            <input
              type="text"
              value={newSubcategory.name}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
              placeholder="Enter subcategory name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newSubcategory.description}
              onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
              placeholder="Enter subcategory description"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button 
              variant="secondary" 
              onClick={() => {
                setShowAddSubcategoryModal(false);
                setEditingSubcategory(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddSubcategory}>
              {editingSubcategory ? 'Update Subcategory' : 'Add Subcategory'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Subcategory"
        size="md"
      >
        {subcategoryToDelete && (
          <div className="space-y-4">
            {subcategoryToDelete.productCount > 0 ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Cannot Delete Subcategory</h4>
                    <p className="text-red-700 mt-1">
                      This subcategory contains {subcategoryToDelete.productCount} products. 
                      Please move or delete all products before deleting this subcategory.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">
                  Are you sure you want to delete the subcategory "{subcategoryToDelete.name}"? 
                  This action cannot be undone.
                </p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              {subcategoryToDelete.productCount === 0 && (
                <Button variant="danger" onClick={confirmDeleteSubcategory}>
                  Delete Subcategory
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default CategoryDetail;