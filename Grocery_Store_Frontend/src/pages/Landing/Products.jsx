import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Heart,
  ChevronDown,
  X,
} from "lucide-react";
import PopupFilter from "../../components/common/PopupFilter";
import ProductListCard from "../../components/layout/Landing/ProductListCard";
import axios from "axios";
import ProductCard from "../../components/common/ProductCard";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [showPopupFilter, setShowPopupFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const productRef = useRef(null);

  // Popup filter state
  const [popupFilters, setPopupFilters] = useState({
    categories: [],
    subcategories: [],
    priceRange: { min: 0, max: 0 },
    minRating: 0,
    badges: [],
  });

  const fetchProducts = async (filters, page = 1, pageSize = 4) => {
    const params = new URLSearchParams();

    filters.categories.forEach((c) => params.append("categories", c));
    filters.subcategories.forEach((sc) => params.append("subcategories", sc));

    if (filters.priceRange.min)
      params.append("minPrice", filters.priceRange.min);
    if (filters.priceRange.max)
      params.append("maxPrice", filters.priceRange.max);
    if (filters.minRating) params.append("minRating", filters.minRating);

    params.append("page", page);
    params.append("pageSize", pageSize);

    const response = await axios.get(
      `https://localhost:7188/api/Product?${params.toString()}`
    );
    return response.data;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await fetchProducts(popupFilters, currentPage);
        setAllProducts(result.products);
        setTotalPages(result.totalPages);
        setTotalItems(result.totalItems);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, [popupFilters, currentPage]);

  // Get unique categories
  const categories = [
    ...new Set(allProducts.map((product) => product.categoryName)),
  ];

  const memoizedFilters = useMemo(
    () => popupFilters,
    [
      popupFilters.categories,
      popupFilters.subcategories,
      popupFilters.priceRange,
      popupFilters.minRating,
    ]
  );

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [memoizedFilters]);

  // Clear all filters
  const clearFilters = () => {
    setCurrentPage(1);
    setPopupFilters({
      categories: [],
      subcategories: [],
      priceRange: { min: 0, max: 50 },
      minRating: 0,
      badges: [],
    });
  };

  const handleApplyPopupFilters = (filters) => {
    setPopupFilters(filters);
    setCurrentPage(1);
    // console.log("Applied filters:", filters);
  };
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // skip scroll on first render
    }
    if (productRef.current) {
      productRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-4">
              <ShoppingCart className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">
                Premium Collection
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                All Products
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of fresh, quality products carefully
              selected for your family
            </p>
          </div>
        </div>
      </div>

      <div
        ref={productRef}
        className="container mx-auto px-4 py-8 relative z-10"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowPopupFilter(true)}
                    className="group relative flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden font-semibold"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <Filter className="h-4 w-4" />
                      <span>Advanced Filters</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>

                  <span className="text-gray-600 font-semibold bg-gray-100 px-3 py-2 rounded-full">
                    {totalItems} products found
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 font-semibold"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-3 transition-all duration-300 ${
                        viewMode === "grid"
                          ? "bg-green-600 text-white shadow-lg"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-3 transition-all duration-300 ${
                        viewMode === "list"
                          ? "bg-green-600 text-white shadow-lg"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {allProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 max-w-md mx-auto">
                  <div className="text-gray-400 mb-6">
                    <Search className="h-20 w-20 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-600 mb-4">
                    No products found
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Try adjusting your filters or search terms to discover
                    amazing products
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
                    : "space-y-4"
                }`}
              >
                {allProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`bg-white/90 backdrop-blur-sm rounded-4xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 ${
                      viewMode === "list"
                        ? "flex items-center p-6 hover:scale-102"
                        : "overflow-hidden hover:-translate-y-1 hover:scale-105"
                    }`}
                  >
                    {viewMode === "grid" ? (
                      <>
                        {/* Grid View */}
                        <ProductCard
                          key={product.productId}
                          product={product}
                          index={index}
                        />
                      </>
                    ) : (
                      <>
                        {/* List View */}
                        <ProductListCard product={product} />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-3 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-300 hover:border-gray-300"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          currentPage === page
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                            : "border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-300 hover:border-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Filter Component */}
      <PopupFilter
        isOpen={showPopupFilter}
        onClose={() => setShowPopupFilter(false)}
        filters={popupFilters}
        onApplyFilters={handleApplyPopupFilters}
        categories={categories}
        subcategories={[...new Set(allProducts.map((p) => p.subCategoryName))]}
      />
    </div>
  );
};

export default Products;
