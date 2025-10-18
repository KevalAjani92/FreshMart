import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  AlertTriangle,
  Package,
  Edit,
  Eye,
  TrendingDown,
  Plus,
  Download,
} from "lucide-react";
import Card from "../../components/layout/StoreOwner/Card";
import KPICard from "../../components/layout/StoreOwner/KPICard";
import Badge from "../../components/layout/StoreOwner/Badge";
import Button from "../../components/layout/StoreOwner/Button";
import Modal from "../../components/layout/StoreOwner/Modal";

const products = [
  {
    id: 1,
    name: "Organic Bananas",
    category: "Fruits",
    stock: 45,
    minStock: 20,
    price: 4.99,
    supplier: "Fresh Farms Co.",
    image:
      "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=100",
    status: "in-stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "Fresh Milk",
    category: "Dairy",
    stock: 12,
    minStock: 15,
    price: 6.5,
    supplier: "Dairy Valley",
    image:
      "https://images.pexels.com/photos/416678/pexels-photo-416678.jpeg?auto=compress&cs=tinysrgb&w=100",
    status: "low-stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: 3,
    name: "Whole Wheat Bread",
    category: "Bakery",
    stock: 0,
    minStock: 10,
    price: 3.99,
    supplier: "Bakery Fresh",
    image:
      "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=100",
    status: "out-of-stock",
    lastUpdated: "2024-01-14",
  },
  {
    id: 4,
    name: "Free-Range Eggs",
    category: "Dairy",
    stock: 28,
    minStock: 12,
    price: 8.99,
    supplier: "Farm Fresh Co.",
    image:
      "https://images.pexels.com/photos/793871/pexels-photo-793871.jpeg?auto=compress&cs=tinysrgb&w=100",
    status: "in-stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: 5,
    name: "Organic Apples",
    category: "Fruits",
    stock: 8,
    minStock: 15,
    price: 7.99,
    supplier: "Orchard Direct",
    image:
      "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=100",
    status: "low-stock",
    lastUpdated: "2024-01-15",
  },
];

const categories = [
  "All Categories",
  "Fruits",
  "Dairy",
  "Bakery",
  "Vegetables",
  "Meat",
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" ||
      product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const lowStockItems = products.filter(
    (p) => p.status === "low-stock" || p.status === "out-of-stock"
  );
  const totalValue = products.reduce(
    (sum, product) => sum + product.stock * product.price,
    0
  );

  const handleUpdateStock = () => {
    console.log(`Updating ${selectedProduct?.name} stock to ${newStock}`);
    setShowUpdateModal(false);
    setSelectedProduct(null);
    setNewStock("");
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setNewStock(product.stock.toString());
    setShowUpdateModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
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
              <Package className="h-8 w-8 text-white" />
            </div>
            Inventory Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Track and manage product stock levels
          </motion.p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Products"
          value={products.length}
          change="+3 this week"
          changeType="positive"
          icon={Package}
          color="bg-blue-500"
        />
        <KPICard
          title="Low Stock Items"
          value={lowStockItems.length}
          change="Need attention"
          changeType="negative"
          icon={AlertTriangle}
          color="bg-red-500"
        />
        <KPICard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          change="+12% this month"
          changeType="positive"
          icon={TrendingDown}
          color="bg-green-500"
        />
        <KPICard
          title="Categories"
          value={categories.length - 1}
          change="Active categories"
          changeType="neutral"
          icon={Filter}
          color="bg-purple-500"
        />
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <Button variant="ghost" className="justify-start">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="p-6 border-l-4 border-l-red-500 bg-red-50">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">
                Stock Alert
              </h3>
              <p className="text-red-700 mt-1">
                {lowStockItems.length} items need immediate attention
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {lowStockItems.slice(0, 3).map((item) => (
                  <Badge key={item.id} variant="error">
                    {item.name} ({item.stock} left)
                  </Badge>
                ))}
                {lowStockItems.length > 3 && (
                  <Badge variant="error">
                    +{lowStockItems.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Products Grid */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Products ({filteredProducts.length})
          </h3>
          <div className="flex space-x-2">
            <Badge variant="success">
              In Stock: {products.filter((p) => p.status === "in-stock").length}
            </Badge>
            <Badge variant="warning">
              Low Stock:{" "}
              {products.filter((p) => p.status === "low-stock").length}
            </Badge>
            <Badge variant="error">
              Out of Stock:{" "}
              {products.filter((p) => p.status === "out-of-stock").length}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-lg border-2 p-4 ${
                product.status === "low-stock"
                  ? "border-yellow-200"
                  : product.status === "out-of-stock"
                  ? "border-red-200"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded-lg"
                />
                <Badge
                  variant={
                    product.status === "in-stock"
                      ? "success"
                      : product.status === "low-stock"
                      ? "warning"
                      : "error"
                  }
                >
                  {product.status.replace("-", " ")}
                </Badge>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-emerald-600">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-600">
                    Stock: {product.stock}
                  </span>
                </div>

                {product.stock <= product.minStock && (
                  <div className="flex items-center space-x-1 text-sm text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Below minimum ({product.minStock})</span>
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  Supplier: {product.supplier}
                </p>
                <p className="text-xs text-gray-500">
                  Updated: {product.lastUpdated}
                </p>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => openUpdateModal(product)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Update
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-gray-500 mt-2">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </Card>

      {/* Update Stock Modal */}
      <Modal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title="Update Stock"
        size="md"
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-16 w-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedProduct.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedProduct.category}
                </p>
                <p className="text-sm text-gray-600">
                  Current Stock: {selectedProduct.stock}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Stock Quantity
              </label>
              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter new stock quantity"
                min="0"
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-yellow-800">
                    Minimum stock level: {selectedProduct.minStock}
                  </p>
                  {parseInt(newStock) < selectedProduct.minStock && (
                    <p className="text-sm text-yellow-800 font-medium mt-1">
                      Warning: This is below the minimum stock level!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateStock}>Update Stock</Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Inventory;
