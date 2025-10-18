import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const ProductListCard = ({ product }) => {
  const handleAddToCart = async (productId) => {
    try {
      const dto = {
        customerID: 1,
        productID: productId,
        quantity: 1,
      };
      await axios.post("https://localhost:7188/api/Cart/AddToCart", dto);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to add product to cart.";
      toast.error(message);
      console.error("Error adding product to cart:", error);
    }
  };
  return (
    <div className="flex w-full items-start space-x-6 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-28 h-28 object-cover rounded-xl shadow-md"
      />

      {/* Product Details */}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          {/* Name, Description, Rating */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center mb-2">
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
                {4.5} ({78})
              </span>
            </div>
          </div>

          {/* Price & Button */}
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl font-black text-green-600">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <button onClick={()=>{handleAddToCart(product.productId)}} className="cursor-pointer group/btn relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
