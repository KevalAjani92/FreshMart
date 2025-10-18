import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Eye,
  Download,
  RotateCcw,
  Filter,
  Search,
  Calendar,
  Star,
  Sparkles,
  Zap,
  Package2,
  Box,
  BadgeCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusCNT,setStatusCNT] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7188/api/order/customer/${user.roleId}`,
        {
          params: {
            status: filterStatus,
            search: searchTerm,
          },
        }
      );
      setOrders(response.data.orders);
      setStatusCNT(response.data.statusCounts);
      console.log("Orders fetched:", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders. Please try again later.");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [filterStatus, searchTerm]);

  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          label: "Pending",
          description: "Order is waiting for store confirmation",
        };
      case "confirmed":
        return {
          icon: BadgeCheck,
          color: "text-purple-600",
          bgColor: "bg-purple-100",
          label: "Confirmed",
          description: "Order confirmed by the store",
        };
      case "packed":
        return {
          icon: Box,
          color: "text-indigo-600",
          bgColor: "bg-indigo-100",
          label: "Packed",
          description: "Order is packed and ready for shipping",
        };
      case "shipped":
        return {
          icon: Truck,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          label: "Shipped",
          description: "On the way to you",
        };
      case "delivered":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-100",
          label: "Delivered",
          description: "Successfully delivered",
        };
      case "cancelled":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-100",
          label: "Cancelled",
          description: "Order was cancelled",
        };
      default:
        return {
          icon: Package,
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          label: "Unknown",
          description: "Status unknown",
        };
    }
  };

  const statusCounts = {
    all: Object.values(statusCNT).reduce((sum, count) => sum + count, 0),
    pending: statusCNT['pending'] || 0,
    confirmed: statusCNT['confirmed'] || 0,
    packed: statusCNT['packed'] || 0,
    shipped: statusCNT['shipped'] || 0,
    delivered: statusCNT['delivered'] || 0,
    cancelled: statusCNT['cancelled'] || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-green-200/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4">
              <Package className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">
                Order History
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Orders
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Track and manage all your orders
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Filters and Search */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8 border border-white/50">
          <div className="flex flex-col items-center justify-between gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-xl w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search orders or items..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "All Orders", icon: Package },
                { key: "pending", label: "Pending", icon: Clock },
                { key: "confirmed", label: "confirmed", icon: BadgeCheck },
                { key: "packed", label: "Packed", icon: Box },
                { key: "shipped", label: "Shipped", icon: Truck },
                { key: "delivered", label: "Delivered", icon: CheckCircle },
                { key: "cancelled", label: "Cancelled", icon: XCircle },
              ].map((filter) => {
                const IconComponent = filter.icon;
                const isActive = filterStatus === filter.key;
                return (
                  <button
                    key={filter.key}
                    onClick={() => setFilterStatus(filter.key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{filter.label}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        isActive ? "bg-white/20" : "bg-gray-200"
                      }`}
                    >
                      {statusCounts[filter.key]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 max-w-md mx-auto">
              <div className="text-gray-400 mb-6">
                <Package className="h-20 w-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-black text-gray-600 mb-4">
                No orders found
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't placed any orders yet. Start shopping to see your orders here!"}
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Start Shopping</span>
                <Sparkles className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={order.orderID}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                      {/* Order Info */}
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="relative">
                          <img
                            src={order.image}
                            alt="Order"
                            className="w-16 h-16 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">
                              {order.items}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-black text-gray-800">
                              #{order.orderNumber}
                            </h3>
                            <div
                              className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig.bgColor}`}
                            >
                              <StatusIcon
                                className={`h-4 w-4 ${statusConfig.color}`}
                              />
                              <span
                                className={`text-sm font-bold ${statusConfig.color}`}
                              >
                                {statusConfig.label}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Ordered:{" "}
                                {new Date(order.orderDate).toLocaleDateString("en-IN")}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Package className="h-4 w-4" />
                              <span>{order.items} items</span>
                            </div>
                          </div>

                          <div className="text-sm text-gray-600">
                            <span className="font-semibold">Items: </span>
                            {order.topItems.join(", ")}
                            {order.items > order.topItems.length && (
                              <span className="text-blue-600 font-semibold">
                                {" "}
                                +{order.items - order.topItems.length} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Order Total */}
                      <div className="text-center lg:text-right">
                        <div className="text-2xl font-black text-green-600 mb-2">
                          ₹{order.amountPaid}
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {statusConfig.description}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                          <Link
                            to={`/customer/order/${order.orderID}`}
                            className="group/btn relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg overflow-hidden flex items-center space-x-2"
                          >
                            <span className="relative z-10 flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>View</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                          </Link>

                          <button
                            onClick={() =>
                              navigate(`/invoice/download/${order.orderID}`)
                            }
                            className="group/btn relative bg-gray-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg overflow-hidden flex items-center space-x-2"
                          >
                            <span className="relative z-10 flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>Invoice</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                          </button>

                          {order.status === "delivered" && (
                            <button className="group/btn relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg overflow-hidden flex items-center space-x-2">
                              <span className="relative z-10 flex items-center space-x-1">
                                <RotateCcw className="h-4 w-4" />
                                <span>Reorder</span>
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Progress Bar */}
                    {order.status !== "cancelled" && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Order Progress</span>
                          <span>
                            {order.status.toLowerCase() === "delivered"
                              ? "Completed"
                              : `Est. delivery: ${new Date(
                                  order.estimatedDelivery
                                ).toLocaleDateString()}`}
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              order.status.toLowerCase() === "pending"
                                ? "bg-gradient-to-r from-yellow-400 to-orange-400 w-1/4"
                                : order.status.toLowerCase() === "confirmed"
                                ? "bg-gradient-to-r from-purple-400 to-pink-400 w-2/5"
                                : order.status.toLowerCase() === "packed"
                                ? "bg-gradient-to-r from-indigo-400 to-blue-400 w-3/5"
                                : order.status.toLowerCase() === "shipped"
                                ? "bg-gradient-to-r from-blue-400 to-cyan-400 w-4/5"
                                : "bg-gradient-to-r from-green-400 to-emerald-400 w-full"
                            }`}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              label: "Total Orders",
              value: statusCounts.all,
              icon: Package,
              color: "text-blue-600",
            },
            {
              label: "Delivered",
              value: statusCounts.delivered,
              icon: CheckCircle,
              color: "text-green-600",
            },
            {
              label: "In Progress",
              value: statusCounts.pending + statusCounts.shipped,
              icon: Clock,
              color: "text-yellow-600",
            },
            {
              label: "Total Spent",
              value: `₹${orders
                .reduce((sum, order) => sum + order.amountPaid, 0)
                .toFixed(2)}`,
              icon: Zap,
              color: "text-purple-600",
            },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 text-center"
              >
                <IconComponent
                  className={`h-8 w-8 ${stat.color} mx-auto mb-3`}
                />
                <div className="text-2xl font-black text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default MyOrders;
