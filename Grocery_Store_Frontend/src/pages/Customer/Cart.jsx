import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Truck,
  Clock,
  Tag,
  Heart,
  Star,
  Sparkles,
  Zap,
  Gift,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useCartStore from "../../store/cartStore";
import { useAuthStore } from "../../store/useAuthStore";

const Cart = () => {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: 'Organic Bananas',
  //     price: 2.99,
  //     originalPrice: 3.49,
  //     quantity: 3,
  //     image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     badge: 'Organic',
  //     inStock: true
  //   },
  //   {
  //     id: 2,
  //     name: 'Fresh Strawberries',
  //     price: 4.99,
  //     quantity: 2,
  //     image: 'https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     badge: 'Fresh',
  //     inStock: true
  //   },
  //   {
  //     id: 3,
  //     name: 'Premium Milk',
  //     price: 3.99,
  //     quantity: 1,
  //     image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400',
  //     badge: 'Local',
  //     inStock: true
  //   }
  // ]);

  const [cartItems, setCartItems] = useState([]);
  const {fetchCartItemCount} = useCartStore((state) => state);
  const user = useAuthStore((state) => state.user);  
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7188/api/Cart/GetCartItemsByUser?customerID="+user.roleId
      );
      setCartItems(response.data.items);
      // console.log("Cart items fetched:", response.data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    try {
      await axios.put(
        `https://localhost:7188/api/Cart/UpdateCartItemQuantity`,
        {
          cartItemID: id,
          quantity: newQuantity,
        }
      );
      await fetchCartItems();
      toast.success("Quantity updated successfully!");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update quantity.";
      toast.error(message);
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(
        `https://localhost:7188/api/Cart/DeleteCartItem/${id}`
      );
      await fetchCartItems();
      fetchCartItemCount(user.roleId); // Update cart item count for customerID 1
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "FRESH20") {
      setAppliedPromo({ code: "FRESH20", discount: 0.2, type: "percentage" });
    } else if (promoCode.toUpperCase() === "SAVE10") {
      setAppliedPromo({ code: "SAVE10", discount: 10, type: "fixed" });
    }
    setPromoCode("");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  const promoDiscount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? subtotal * appliedPromo.discount
      : appliedPromo.discount
    : 0;

  // const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const deliveryFee = 20; // Fixed delivery fee for simplicity
  const total = subtotal - promoDiscount + deliveryFee;

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Organic":
        return "bg-green-100 text-green-800";
      case "Fresh":
        return "bg-blue-100 text-blue-800";
      case "Local":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-4">
              <ShoppingCart className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">
                Shopping Cart
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Your Cart
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
              ready for checkout
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {cartItems.length === 0 ? (
          // Empty Cart
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 max-w-md mx-auto">
              <div className="text-gray-400 mb-6">
                <ShoppingCart className="h-20 w-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-black text-gray-600 mb-4">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Looks like you haven't added any items to your cart yet. Start
                shopping to fill it up!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Start Shopping</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50">
                <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2 text-green-600" />
                  Cart Items
                </h2>

                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.cartItemsID}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center space-x-4 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl mb-4 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200"
                    >
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor(item.badge)}`}>
                          {item.badge}
                        </div> */}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xl font-black text-green-600">
                            ₹{item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{item.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 text-yellow-400 fill-current"
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            4.8
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.cartItemsID, item.quantity - 1)
                          }
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="text-lg font-bold text-gray-800 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.cartItemsID, item.quantity + 1)
                          }
                          className="p-2 bg-green-100 hover:bg-green-200 rounded-full transition-colors"
                        >
                          <Plus className="h-4 w-4 text-green-600" />
                        </button>
                      </div>

                      {/* Item Total & Actions */}
                      <div className="text-right">
                        <div className="text-xl font-black text-gray-800 mb-2">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition-colors group/btn">
                            <Heart className="h-4 w-4 text-red-500 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => removeItem(item.cartItemsID)}
                            className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition-colors group/btn"
                          >
                            <Trash2 className="h-4 w-4 text-red-500 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Promo Code */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-purple-600" />
                  Promo Code
                </h3>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">
                        Promo code "{appliedPromo.code}" applied!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50 sticky top-4">
                <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                  <Zap className="h-6 w-6 mr-2 text-blue-600" />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span className="font-semibold">-${savings.toFixed(2)}</span>
                    </div>
                  )} */}

                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span className="font-semibold">
                        -₹{promoDiscount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span
                      className={`font-semibold ${
                        deliveryFee === 0 ? "text-green-600" : ""
                      }`}
                    >
                      {deliveryFee === 0
                        ? "FREE"
                        : `₹${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-black">
                      <span>Total</span>
                      <span className="text-green-600">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-800">
                      Delivery Info
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-blue-700">
                    <Clock className="h-4 w-4" />
                    <span>Estimated delivery: Tomorrow, 2-4 PM</span>
                  </div>
                  {/* {subtotal < 50 && (
                    <div className="mt-2 text-xs text-blue-600">
                      Add ₹{(50 - subtotal).toFixed(2)} more for free delivery!
                    </div>
                  )} */}
                </div>

                {/* Checkout Button */}
                <Link
                  to="/customer/checkout"
                  className="group relative w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden flex items-center justify-center space-x-2"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>

                {/* Continue Shopping */}
                <Link
                  to="/customer/products"
                  className="block text-center text-gray-600 hover:text-green-600 font-semibold mt-4 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
