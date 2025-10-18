import React, { useState } from "react";
import { Heart, ShoppingCart, Sparkles, Star, Zap } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import useCartStore from "../../store/cartStore";
import { useAuthStore } from "../../store/useAuthStore";

const ProductCard = ({ product, index }) => {
  const [isPotrait, setIsPortrait] = useState(false);
  const {fetchCartItemCount} = useCartStore((state) => state);
  const user = useAuthStore((state) => state.user);  
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setIsPortrait(naturalHeight >= naturalWidth);
  };
  const handleAddToCart = async (productId) => {
    try {
      const dto = {
        customerID:user.roleId,
        productID: productId,
        quantity: 1
      }
      await axios.post("https://localhost:7188/api/Cart/AddToCart", dto);
      fetchCartItemCount(user.roleId); // Update cart item count for customerID 1
      toast.success("Product added to cart successfully!");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add product to cart.";
      toast.error(message);
      console.error("Error adding product to cart:", error);
    }
  }
  return (
    <div
      className="group relative bg-white rounded-4xl shadow-lg hover:shadow-2xl transform hover:scale-100 transition-all duration-300 ease-in-out overflow-hidden border border-gray-100"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Popular Badge */}
      {product.isPopular && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 animate-pulse">
          <Sparkles className="h-3 w-3" />
          <span>POPULAR</span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-gray-200 to-gray-100 z-0" />
        <img
          src={product.imageUrl}
          alt={product.name}
          onLoad={handleImageLoad}
          className={`w-full h-56 group-hover:scale-110 transition-transform duration-700
            ${
              isPotrait ? "object-contain" : "object-cover"
            } mix-blend-multiply`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badge */}
        {/* <div className={`absolute top-4 right-4 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
          {product.badge}
        </div> */}

        {/* Wishlist Button */}
        <button className=" absolute top-5 right-7 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-300">
          <Heart className="cursor-pointer h-4 w-4 text-gray-600 hover:text-red-500" />
        </button>

        {/* Quick View */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="cursor-pointer bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-white transition-colors shadow-lg">
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 bg-white/40 backdrop-blur-md shadow-inner">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description || "No Description Available"}</p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(4.5)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2 font-medium">
            {4.5} ({78} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-green-600">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through font-medium">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Save ₹{(product.originalPrice - product.price).toFixed(2)}
            </div>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={()=>{handleAddToCart(product.productId)}}
          className="cursor-pointer group/btn relative w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl overflow-hidden"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
            <Zap className="h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>

      {/* Decorative Circle */}
      <div className="absolute bottom-4 right-4 w-16 h-16 bg-green-100/50 rounded-full blur-xl group-hover:bg-green-200/50 transition-colors duration-500"></div>
    </div>
  );
};

export default ProductCard;
