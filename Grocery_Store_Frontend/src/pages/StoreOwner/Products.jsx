import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Apple,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  Star,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import Card from "../../components/layout/StoreOwner/Card";
import KPICard from "../../components/layout/StoreOwner/KPICard";
import Badge from "../../components/layout/StoreOwner/Badge";
import Button from "../../components/layout/StoreOwner/Button";
import Modal from "../../components/layout/StoreOwner/Modal";
import axios from "axios";
import toast from "react-hot-toast";

const resetProductState = {
  productId: null,
  name: "",
  brand: "",
  description: "",
  isFeatured: false,
  categoryId: "",
  subCategoryId: "",
  price: "",
  currentStock: "",
  lowStockValue: "",
  isActive: true,
  storeOwnerId: 1, // or take from logged-in user
  image: null,
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(8);

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [stats, setStats] = useState({});
  const [newProduct, setNewProduct] = useState({ ...resetProductState });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://localhost:7188/api/Product/owner-all-product",
        {
          params: {
            search: searchTerm || null,
            categoryId: categoryFilter !== "all" ? categoryFilter : null,
            status: statusFilter !== "all" ? statusFilter : null,
            // minPrice: priceRange.min || null,
            // maxPrice: priceRange.max || null,
            sortBy,
            pageNumber: currentPage,
            pageSize: itemsPerPage,
          },
        }
      );

      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.totalRecords);
      setStats(res.data.stats);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:7188/api/Category");
      setCategories(response.data);
      // console.log('Categories fetched:', response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7188/api/SubCategory"
      );
      setSubCategories(response.data);
      // console.log('Subcategories fetched:', response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [
    searchTerm,
    categoryFilter,
    statusFilter,
    priceRange,
    sortBy,
    currentPage,
  ]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedProducts = products;

  const totalProducts = stats.totalProducts;

  const handleSaveProduct = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("Name", newProduct.name);
    formData.append("Brand", newProduct.brand);
    formData.append("Description", newProduct.description);
    formData.append("IsFeatured", newProduct.isFeatured);
    formData.append("CategoryId", newProduct.categoryId);
    formData.append("SubCategoryId", newProduct.subCategoryId);
    formData.append("Price", newProduct.price);
    formData.append("CurrentStock", newProduct.currentStock);
    formData.append("LowStockValue", newProduct.lowStockValue);
    formData.append("IsActive", newProduct.isActive);
    formData.append("StoreOwnerId", newProduct.storeOwnerId);
    if (newProduct.image) {
      formData.append("Image", newProduct.image);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (editingProduct) {
      // Update product
      axios
        .put(
          `https://localhost:7188/api/Product/${editingProduct.productId}`,
          formData,
          config
        )
        .then(() => {
          fetchProducts();
          toast.success("Product updated successfully");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          toast.error("Failed to update product");
        });
      // console.log("Product updated:", productData);
    } else {
      // Create new product
      axios
        .post("https://localhost:7188/api/Product", formData, config)
        .then(() => {
          fetchProducts();
          toast.success("Product created successfully");
        })
        .catch((error) => {
          console.error("Error creating product:", error);
          toast.error("Failed to create product");
        });
    }
    // Reset form & modal
    setShowAddModal(false);
    setNewProduct({ ...resetProductState });
    setImagePreview(null);
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);

    setNewProduct({
      productId: product.productId, // ✅ required for update
      name: product.name || "",
      brand: product.brand || "",
      description: product.description || "",
      isFeatured: product.isFeatured,
      categoryId: product.categoryId?.toString() || "",
      subCategoryId: product.subCategoryId?.toString() || "",
      price: product.price?.toString() || "",
      currentStock: product.currentStock?.toString() || "",
      lowStockValue: product.lowStockValue?.toString() || "",
      isActive: product.isActive,
      storeOwnerId: product.storeOwnerId || 1, // fallback
      image: null, // ✅ reset file input
    });

    // ✅ Set preview for existing image
    setImagePreview(product.imageUrl ? `${product.imageUrl}` : null);
    setShowAddModal(true);
  };
  const [productToDelete, setProductToDelete] = useState(null);
  const deleteProduct = async (product) => {
    // console.log(product);
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`https://localhost:7188/api/Product/${productId}`)
      .then(() => {
        fetchProducts(); // Refresh product list after deletion
        toast.success("Product deleted successfully");
        setShowDeleteModal(false);
        setCategoryToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const [isPotrait, setIsPortrait] = useState(false);
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setIsPortrait(naturalHeight >= naturalWidth);
  };

  const availableSubCategories = newProduct.categoryId
    ? subCategories.filter(
        (sub) => sub.categoryID === parseInt(newProduct.categoryId)
      )
    : [];
  const handleInputChange = (field, value) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleInputChange("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!newProduct.name.trim()) newErrors.name = "Product name is required";
    if (!newProduct.categoryId) newErrors.categoryId = "Category is required";
    if (!newProduct.price || parseFloat(newProduct.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!newProduct.currentStock || parseInt(newProduct.currentStock) < 0)
      newErrors.currentStock = "Valid stock quantity is required";
    if (!newProduct.lowStockValue || parseInt(newProduct.lowStockValue) < 0)
      newErrors.lowStockValue = "Valid low stock value is required";
    if (!newProduct.image && !imagePreview)
      newErrors.imageFile = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
              <Apple className="h-8 w-8 text-white" />
            </div>
            Products Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Manage your fresh grocery inventory with ease
          </motion.p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Products"
          value={totalProducts}
          change="+12 this month"
          changeType="positive"
          icon={Package}
          color="bg-fresh-green"
        />
        <KPICard
          title="Active Products"
          value={stats.activeProducts}
          change="Ready to sell"
          changeType="positive"
          icon={Apple}
          color="bg-grocery-orange"
        />
        <KPICard
          title="Low Stock"
          value={stats.lowStockProducts}
          change="Need attention"
          changeType="negative"
          icon={AlertTriangle}
          color="bg-grocery-yellow"
        />
        <KPICard
          title="Out of Stock"
          value={stats.outOfStockProducts}
          change="Urgent restock"
          changeType="negative"
          icon={Package}
          color="bg-red-500"
        />
      </div>

      {/* Search & Quick Filters */}
      <Card className="p-6 grocery-pattern">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="stock">Stock Level</option>
          </select>
        </div>
      </Card>

      {/* Products Grid */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-fresh-green flex items-center gap-2">
            <Package className="h-6 w-6" />
            Products ({products.length})
          </h3>
          <div className="flex space-x-2">
            <Badge variant="success">
              Available:{" "}
              {products.filter((p) => p.status === "available").length}
            </Badge>
            <Badge variant="warning">Low Stock: {stats.lowStockProducts}</Badge>
            <Badge variant="error">
              Out of Stock: {stats.outOfStockProducts}
            </Badge>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin h-10 w-10 border-4 border-fresh-green border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-gray-500">Loading products...</p>
          </div>
        ) : paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product, index) => (
              <motion.div
                key={product.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl border-2 p-4 hover:shadow-fresh transition-all duration-300 ${
                  product.status === "low-stock"
                    ? "border-grocery-yellow/30 bg-yellow-50/30"
                    : product.status === "out-of-stock"
                    ? "border-red-300/50 bg-red-50/30"
                    : "border-gray-200 hover:border-fresh-green/30"
                }`}
              >
                <div className="relative mb-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    onLoad={handleImageLoad}
                    className={`w-full h-40 object-contain rounded-2xl
                      ${
                        isPotrait ? "object-contain" : "object-cover"
                      } mix-blend-multiply
                      `}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-100 transition-opacity duration-300"></div>
                  {product.isFeatured && (
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant="warning"
                        className="flex items-center gap-1"
                      >
                        <Star className="h-3 w-3" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        product.status === "available"
                          ? "success"
                          : product.status === "low-stock"
                          ? "warning"
                          : "error"
                      }
                    >
                      {product.status === "available"
                        ? "Available"
                        : product.status === "low-stock"
                        ? "Low Stock"
                        : "Out of Stock"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                    <div className="flex items-center space-x-2 justify-between mt-1">
                      <p className="text-sm text-fresh-green font-medium">
                        {product.categoryName}
                      </p>
                      <p className="text-sm text-grocery-orange font-medium">
                        {product.subCategoryName}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-fresh-green">
                      ₹{product.price}
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        Stock: {product.currentStock}
                      </p>
                      {product.currentStock <= product.lowStockValue &&
                        product.currentStock > 0 && (
                          <p className="text-xs text-grocery-yellow font-medium">
                            Low Stock!
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/owner/products/${product.productId}`}
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
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteProduct({name: product.name, id: product.productId})}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="p-6 bg-gradient-to-br from-fresh-green/10 to-grocery-orange/10 rounded-3xl mb-4">
                <Apple className="h-16 w-16 text-fresh-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-500 mb-6">
                Start building your fresh grocery inventory
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </motion.div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}(Total {totalItems} products)
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

      {/* Advanced Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Advanced Filters"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Status
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="text-fresh-green focus:ring-fresh-green rounded"
                  />
                  <span className="text-sm">Available</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="text-fresh-green focus:ring-fresh-green rounded"
                  />
                  <span className="text-sm">Low Stock</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="text-fresh-green focus:ring-fresh-green rounded"
                  />
                  <span className="text-sm">Out of Stock</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowFilters(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
          </div>
        </div>
      </Modal>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingProduct(null);
          setNewProduct({ ...resetProductState }); // reset all fields
          setImagePreview(null); // clear preview
          setErrors({}); // clear errors if any
        }}
        title={editingProduct ? "Edit Product" : "Add New Product"}
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-fresh-green 
                  ${
                    errors.name
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-transparent"
                  }
                  `}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                value={newProduct.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                placeholder="Enter brand name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newProduct.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={newProduct.categoryId}
                onChange={(e) => {
                  handleInputChange("categoryId", e.target.value);
                  handleInputChange("subCategoryId", ""); // Reset subcategory
                }}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-fresh-green ${
                  errors.categoryId
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 focus:border-transparent"
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.categoryID} value={category.categoryID}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.categoryId}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </label>
              <select
                value={newProduct.subCategoryId}
                onChange={(e) =>
                  handleInputChange("subCategoryId", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                disabled={!newProduct.categoryId}
              >
                <option value="">Select Subcategory</option>
                {availableSubCategories.map((sub) => (
                  <option key={sub.subCategoryID} value={sub.subCategoryID}>
                    {sub.subCategoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="text"
                value={newProduct.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-fresh-green ${
                  errors.price
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 focus:border-transparent"
                }`}
                placeholder="0.00"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                }}
              />
              {errors.price && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.price}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Stock *
              </label>
              <input
                type="text"
                value={newProduct.currentStock}
                onChange={(e) =>
                  handleInputChange("currentStock", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-fresh-green ${
                  errors.currentStock
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 focus:border-transparent"
                }`}
                placeholder="0"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                }}
              />
              {errors.currentStock && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.currentStock}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Low Stock Alert
              </label>
              <input
                type="text"
                value={newProduct.lowStockValue}
                onChange={(e) =>
                  handleInputChange("lowStockValue", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-fresh-green ${
                  errors.lowStockValue
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 focus:border-transparent"
                }`}
                placeholder="10"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                }}
              />
              {errors.lowStockValue && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.lowStockValue}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              <span>Image & Settings</span>
            </h3>
            {/* <input
              type="url"
              value={newProduct.imageUrl}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageUrl: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            /> */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm sm:text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              {errors.image && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.image}
                </p>
              )}
            </div>

            {imagePreview && (
              <div className="mt-2">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Preview:
                </p>
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow"
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newProduct.isFeatured}
                onChange={(e) =>
                  handleInputChange("isFeatured", e.target.checked)
                }
                className="text-fresh-green focus:ring-fresh-green rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Featured Product
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newProduct.isActive}
                onChange={(e) =>
                  handleInputChange("isActive", e.target.checked)
                }
                className="text-fresh-green focus:ring-fresh-green rounded"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => {
                setShowAddModal(false);
                setEditingProduct(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Product"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">
              Are you sure you want to delete the product "
              {productToDelete?.name || ""}"? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteProduct(productToDelete.id)}
            >
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Products;
