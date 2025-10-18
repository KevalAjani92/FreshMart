import React, { useEffect, useState } from "react";
import { Star, ShoppingCart, Heart, Zap, Award, Sparkles } from "lucide-react";
import ProductCard from "../../common/ProductCard";
import axios from "axios";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:7188/api/Product/featured-products')
        setProducts(response.data);
        // console.log("Featured Products:", response.data);
        
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    }
    fetchProducts();
  },[])

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Creative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-6">
            <Award className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-800">
              Customer Favorites
            </span>
          </div>

          <h2 className="text-5xl font-black text-gray-800 mb-6">
            Featured
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {" "}
              Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Handpicked favorites from our customers - premium quality products
            at unbeatable prices, delivered fresh to your doorstep with love ❤️
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
          {products.map((product, index) => (
            <ProductCard key={product.productId} product={product} index={index} />
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-16">
          <button className="group relative bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-gray-900 hover:to-black transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden">
            <span className="relative z-10 flex items-center space-x-2">
              <span>View All Products</span>
              <ShoppingCart className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
