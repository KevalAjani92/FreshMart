import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Grid3X3,
  Edit,
  Trash2,
  Eye,
  Package,
  Star,
  Apple,
  Carrot,
  Milk,
  Heading as Bread,
  UserCheck as Cheese,
  Shovel as Shoe,
  Trees as Tree,
  Coffee,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  Beef,
  Fish,
  Grape,
  Egg,
  Pizza,
  Cookie,
  IceCream,
  Candy,
  Wine,
  Baby,
  Heart,
  Home,
  Car,
  Book,
  Music,
  Camera,
  Phone,
  Laptop,
  Watch,
  Shirt,
  Gift,
  Sun,
  Moon,
  Cloud,
  Flower,
  Leaf,
  ShoppingCart,
  Layers,
  Wheat,
  Snowflake,
} from "lucide-react";
import Card from "../../components/layout/StoreOwner/Card";
import KPICard from "../../components/layout/StoreOwner/KPICard";
import Badge from "../../components/layout/StoreOwner/Badge";
import Button from "../../components/layout/StoreOwner/Button";
import Modal from "../../components/layout/StoreOwner/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/layout/StoreOwner/CategoryForm";

const iconOptions = [
  { name: "Apple", icon: Apple },
  { name: "Carrot", icon: Carrot },
  { name: "Milk", icon: Milk },
  { name: "Bread", icon: Bread },
  { name: "Coffee", icon: Coffee },
  { name: "Package", icon: Package },
  { name: "Star", icon: Star },
];
// Icon mapping
const iconMap = {
  Package,
  Apple,
  Coffee,
  Beef,
  Milk,
  Bread,
  Fish,
  Carrot,
  Grape,
  Cheese,
  Egg,
  Pizza,
  Cookie,
  IceCream,
  Candy,
  Wine,
  Baby,
  Heart,
  Home,
  Car,
  Book,
  Music,
  Camera,
  Phone,
  Laptop,
  Watch,
  Shirt,
  Shoe,
  Gift,
  Star,
  Sun,
  Moon,
  Cloud,
  Flower,
  Tree,
  Leaf,
  ShoppingCart,
  Layers,
  Wheat,
  Snowflake,
};

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    iconName: "Apple",
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [searchTerm, sortBy, currentPage]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://localhost:7188/api/Category/owner/GetAll",
        {
          params: {
            searchTerm,
            sortBy,
            pageNumber: currentPage,
            pageSize: itemsPerPage,
          },
        }
      );
      setCategories(res.data.items);
      setTotalItems(res.data.totalItems);
      setTotalPages(res.data.totalPages);
      setStats(res.data.stats);
      // console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };
  const paginatedCategories = categories; // already paginated from backend

  const totalCategories = stats.totalCategories || 0;
  const activeCategories = stats.activeCategories || 0;

  const handleAddCategory = async () => {
    console.log(newCategory);
    
    try {
      if (editingCategory) {
        // Update existing
        await axios.put(
          `https://localhost:7188/api/Category/${editingCategory.categoryID}`,
          newCategory
        );
        toast.success("Category updated successfully!");
      } else {
        // Create new
        await axios.post("https://localhost:7188/api/Category", newCategory);
        toast.success("Category added successfully!");
      }

      // Reset form & refresh
      setNewCategory({
        name: "",
        description: "",
        iconName: "Apple",
        isActive: true,
      });
      setEditingCategory(null);
      setShowAddModal(false);

      // Refresh categories
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category!");
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      iconName: category.iconName,
      isActive: category.isActive,
    });
    setShowAddModal(true);
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://localhost:7188/api/Category/${categoryToDelete.categoryID}`);
      toast.success("Category deleted successfully!");
      setShowDeleteModal(false);
      setCategoryToDelete(null);

      // Refresh categories
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category!");
    }
  };

  const getIconComponent = (iconName) => {
    const iconOption = iconOptions.find((option) => option.name === iconName);
    return iconOption ? iconOption.icon : Apple;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-fresh-green flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl">
              <Grid3X3 className="h-8 w-8 text-white" />
            </div>
            Categories Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Organize your grocery store products efficiently
          </motion.p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Categories"
          value={stats.totalCategories || 0}
          change="+2 this month"
          changeType="positive"
          icon={Grid3X3}
          color="bg-fresh-green"
        />
        <KPICard
          title="Active Categories"
          value={stats.activeCategories || 0}
          change="Currently selling"
          changeType="positive"
          icon={Package}
          color="bg-grocery-orange"
        />
        <KPICard
          title="Most Popular"
          value={stats.mostPopularCategory?.name || "N/A"}
          change={`${stats.mostPopularCategory?.productCount || 0} products`}
          changeType="positive"
          icon={Star}
          color="bg-grocery-yellow"
        />
        <KPICard
          title="Empty Categories"
          value={stats.emptyCategories || 0}
          change="Need products"
          changeType={stats.emptyCategories > 0 ? "negative" : "positive"}
          icon={AlertTriangle}
          color="bg-red-500"
        />
      </div>

      {/* Search & Filters */}
      <Card className="p-6 grocery-pattern">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="name">Sort by Name</option>
            <option value="products-high">Most Products</option>
            <option value="products-low">Least Products</option>
          </select>
          <div className="flex space-x-2 justify-start md:justify-end">
            <Badge variant="success">Active: {activeCategories}</Badge>
            <Badge variant="error">
              Inactive: {totalCategories - activeCategories}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Categories Grid */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-fresh-green flex items-center gap-2">
            <Grid3X3 className="h-6 w-6" />
            Categories ({categories.length})
          </h3>
        </div>

        {paginatedCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedCategories.map((category, index) => {
              const IconComponent = getIconComponent(category.iconName);

              return (
                <motion.div
                  key={category.categoryID}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl border-2 p-6 hover:shadow-fresh transition-all duration-300 ${
                    category.isActive
                      ? "border-gray-200 hover:border-fresh-green/30"
                      : "border-gray-300 opacity-75"
                  }`}
                >
                  <div className="text-center space-y-4">
                    <div
                      className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center ${
                        category.isActive
                          ? "bg-gradient-to-br from-fresh-green to-emerald-600"
                          : "bg-gray-400"
                      }`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">
                        {category.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {category.description}
                      </p>

                      <div className="flex justify-center space-x-4 text-sm">
                        <div className="text-center">
                          <p className="font-semibold text-fresh-green">
                            {category.productCount}
                          </p>
                          <p className="text-gray-600">Products</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-grocery-orange">
                            {category.subCategoryCount}
                          </p>
                          <p className="text-gray-600">Subcategories</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Badge variant={category.isActive ? "success" : "error"}>
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Link
                        to={`/owner/categories/${category.id}`}
                        className="flex-1"
                      >
                        <Button variant="ghost" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="p-6 bg-gradient-to-br from-fresh-green/10 to-grocery-orange/10 rounded-3xl mb-4">
                <Grid3X3 className="h-16 w-16 text-fresh-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Categories Found
              </h3>
              <p className="text-gray-500 mb-6">
                Start organizing your products with categories
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Category
              </Button>
            </motion.div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing page {currentPage} of {totalPages} (Total {totalItems}{" "}
              categories)
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Add/Edit Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingCategory(null);
          setNewCategory({
            name: "",
            description: "",
            iconName: "Apple",
            isActive: true,
          });
        }}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowIconSelector(!showIconSelector)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    {React.createElement(
                      getIconComponent(newCategory.iconName),
                      { className: "h-5 w-5 text-fresh-green" }
                    )}
                    <span>{newCategory.iconName}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {showIconSelector && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg z-10 p-2">
                    <div className="grid grid-cols-4 gap-2">
                      {iconOptions.map((option) => (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => {
                            setNewCategory({
                              ...newCategory,
                              iconName: option.name,
                            });
                            setShowIconSelector(false);
                          }}
                          className={`p-3 rounded-xl hover:bg-fresh-green/10 transition-colors ${
                            newCategory.iconName === option.name
                              ? "bg-fresh-green/20 border border-fresh-green"
                              : ""
                          }`}
                        >
                          <option.icon className="h-6 w-6 text-fresh-green mx-auto" />
                          <p className="text-xs mt-1">{option.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
              placeholder="Enter category description"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newCategory.isActive}
                disabled={!editingCategory} // Disable if adding new
                onChange={(e) =>
                  setNewCategory({ ...newCategory, isActive: e.target.checked })
                }
                className="text-fresh-green focus:ring-fresh-green rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Active Category
              </span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => {
                setShowAddModal(false);
                setEditingCategory(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </div>
        </div>
      </Modal>
      {/* <CategoryForm
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
        onSave={handleAddCategory}
      /> */}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Category"
        size="md"
      >
        {categoryToDelete && (
          <div className="space-y-4">
            {categoryToDelete.productCount > 0 ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">
                      Cannot Delete Category
                    </h4>
                    <p className="text-red-700 mt-1">
                      This category contains {categoryToDelete.productCount}{" "}
                      products. Please move or delete all products before
                      deleting this category.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">
                  Are you sure you want to delete the category "
                  {categoryToDelete.name}"? This action cannot be undone.
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              {categoryToDelete.productCount === 0 && (
                <Button variant="danger" onClick={confirmDelete}>
                  Delete Category
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Categories;
