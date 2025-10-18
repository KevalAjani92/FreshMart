import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  MapPin,
  Phone,
  Sparkles,
  Bell,
  User,
  Package,
  Heart,
  Settings,
  Crown,
  Star,
  LogOut,
} from "lucide-react";
import Sidebar from "./Sidebar";
import axios from "axios";
import useCartStore from "../../../store/cartStore";
import { useAuthStore } from "../../../store/useAuthStore";

const CustomerHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItemCount, fetchCartItemCount } = useCartStore();
  const user = useAuthStore((state) => state.user);

  const profileMenuItems = [
    {
      icon: User,
      label: "My Profile",
      path: "/customer/profile",
      color: "text-blue-600",
      bgColor: "hover:bg-blue-50",
    },
    // {
    //   icon: Package,
    //   label: "My Orders",
    //   path: "/my-orders",
    //   color: "text-green-600",
    //   bgColor: "hover:bg-green-50",
    //   badge: "3",
    // },
    {
      icon: Heart,
      label: "Wishlist",
      path: "/wishlist",
      color: "text-red-600",
      bgColor: "hover:bg-red-50",
      badge: "7",
    },
    // {
    //   icon: Settings,
    //   label: "Settings",
    //   path: "/settings",
    //   color: "text-gray-600",
    //   bgColor: "hover:bg-gray-50",
    // },
  ];

  useEffect(() => {
    // Example: Fetch cart item count from API or state management
    // const fetchCartItemCount = async () => {
    //   try {
    //     const response = await axios.get("https://localhost:7188/api/Cart/GetCartItemsByUser?customerID=1");
    //     setCartItemCount(response.data.items.length);
    //     // console.log("Cart Item Count:", response.data.items.length);
    //   } catch (error) {
    //     console.error("Error fetching cart item count:", error);
    //   }
    // };

    fetchCartItemCount(user.roleId);
  }, [fetchCartItemCount]);

  const handleLogout = () => {
    // Clear user data from local storage or state management
    useAuthStore.getState().logout();
    // Redirect to login page
    navigate("/auth/login");
  };

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      {/* 🔹 Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 🔹 Overlay for Profile */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
      <header className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 opacity-90"></div>
        <div className="absolute inset-0 bg-pattern-dots animate-pulse"></div>

        {/* Top notification bar */}
        <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="container mx-auto flex justify-between items-center text-sm relative z-10">
            <div className="flex items-center space-x-4 animate-bounce">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">
                🎉 Grand Opening Sale - 25% OFF Everything!
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Bell className="h-4 w-4 animate-pulse" />
              <span>Free delivery on orders over $30</span>
            </div>
          </div>
        </div>

        {/* Main header */}
        <nav className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Logo with creative design */}
            <Link to="/customer" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-white to-green-100 rounded-full p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">!</span>
                  </div>
                </div>
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                  FreshMart
                </h1>
                <p className="text-sm text-green-100 font-medium">
                  Premium Groceries
                </p>
              </div>
            </Link>

            {/* Action buttons with creative design */}
            <div className="flex items-center space-x-3">
              {/* Sidebar Toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
              >
                <Menu className="h-5 w-5" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>

              <div className="hidden md:flex items-center space-x-3">
                {/* Profile Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                  >
                    <div className="relative">
                      <User className="h-5 w-5" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                        <Crown className="h-2 w-2 text-white" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 z-50 overflow-hidden animate-slide-down">
                      {/* User Info Header */}
                      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white relative overflow-hidden">
                        <div className="absolute top-2 right-2 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                        <div className="relative z-10">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-white" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                <Crown className="h-3 w-3 text-white" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">John Doe</h3>
                              <p className="text-green-100 text-sm">
                                Premium Member
                              </p>
                              <div className="flex items-center space-x-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="h-3 w-3 text-yellow-300 fill-current"
                                  />
                                ))}
                                <span className="text-xs text-green-100 ml-1">
                                  VIP Customer
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-4 space-y-2">
                        {profileMenuItems.map((item, index) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={index}
                              to={item.path}
                              onClick={() => setIsProfileOpen(false)}
                              className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${item.bgColor} hover:scale-105`}
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors ${item.color}`}
                                >
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <span className="font-semibold text-gray-800 group-hover:text-gray-900">
                                  {item.label}
                                </span>
                              </div>
                              {item.badge && (
                                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                                  {item.badge}
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Premium Features */}
                      <div className="p-4 border-t border-gray-200">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Sparkles className="h-4 w-4 text-purple-600" />
                            <span className="font-bold text-purple-800 text-sm">
                              Premium Benefits
                            </span>
                          </div>
                          <p className="text-purple-700 text-xs mb-3">
                            Free delivery, exclusive deals, and priority
                            support!
                          </p>
                          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                            Upgrade to Premium
                          </button>
                        </div>
                      </div>

                      {/* Logout */}
                      <div className="p-4 border-t border-gray-200">
                        <button
                          onClick={handleLogout}
                          className="group w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-all duration-300 hover:scale-105"
                        >
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-red-100 transition-colors">
                            <LogOut className="h-4 w-4 text-red-600" />
                          </div>
                          <span className="font-semibold text-red-600">
                            Sign Out
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Cart with animation */}
                  <button
                    onClick={() => {
                      navigate("/customer/cart");
                    }}
                    className="relative mx-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                      {cartItemCount}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default CustomerHeader;
