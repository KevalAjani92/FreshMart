import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Star, ShoppingCart, Apple } from "lucide-react";
import { deliveryAPI } from "../../services/deliveryAPI";
import LoadingSpinner from "../../components/layout/delivery/LoadingSpinner";
import { useAuthStore } from "../../store/useAuthStore";

const DeliveryHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await deliveryAPI.getAssignedOrders(user.roleId);
        const deliveredOrders = data.filter(
          (order) => order.status === "delivered"
        );
        setOrders(deliveredOrders);
        setFilteredOrders(deliveredOrders);
      } catch (error) {
        console.error("Failed to load delivery history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((order) =>
        order.deliveredAt?.startsWith(dateFilter)
      );
    }

    setFilteredOrders(filtered);
  }, [searchTerm, dateFilter, orders]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-700 flex items-center space-x-2">
          {/* <ShoppingCart className="h-8 w-8" /> */}
          <span>📋 Delivery History</span>
        </h1>
        <p className="text-green-600 mt-1 text-lg">
          View your completed fresh grocery deliveries and customer feedback
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
            />
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.orderNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 hover:shadow-xl hover:transform hover:scale-102 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="font-bold text-xl text-green-700">
                    #{order.orderNumber}
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-2xl text-sm font-semibold border border-green-300">
                    ✅ Delivered
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-green-800 mb-1 text-lg">
                      👤 {order.customerName}
                    </p>
                    <p className="text-green-600 text-sm mb-2 font-medium">
                      📍 {order.address}
                    </p>
                    <p className="text-sm text-green-500 font-medium">
                      ✅ Delivered:{" "}
                      {order.deliveredAt
                        ? new Date(order.deliveredAt).toLocaleString("en-IN")
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-bold text-green-700">
                      💰 ₹{order.finalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      🛍️ {order.items.length} items
                    </p>
                    {order.customerRating && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-green-700">
                          ⭐ {order.customerRating}/5
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {order.customerReview && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200">
                    <p className="text-sm text-green-700 italic font-medium">
                      💬 "{order.customerReview}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl mx-auto mb-6">
            <Apple className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-green-700 mb-2">
            🛒 No deliveries found
          </h3>
          <p className="text-green-600">
            No completed fresh grocery deliveries match your search criteria.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DeliveryHistory;
