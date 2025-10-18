import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, MapPin, Phone, CreditCard, Filter, Apple } from 'lucide-react';
import { deliveryAPI } from '../../services/deliveryAPI';
import { useAuthStore } from "../../store/useAuthStore";
import LoadingSpinner from '../../components/layout/delivery/LoadingSpinner';

const statusColors = {
  assigned: 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300',
  picked_up: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
  shipped: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
  delivered: 'bg-gradient-to-r from-green-200 to-green-300 text-green-900 border border-green-400'
};

const statusLabels = {
  assigned: '📋 Assigned',
  picked_up: '📦 Picked Up',
  shipped: '🚚 Shipped',
  delivered: '✅ Delivered'
};

const AssignedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await deliveryAPI.getAssignedOrders(user.roleId);
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === activeFilter));
    }
  }, [activeFilter, orders]);

  const filters = [
    { key: 'all', label: 'All Orders', count: orders.length },
    { key: 'assigned', label: 'Pending', count: orders.filter(o => o.status === 'assigned').length },
    { key: 'shipped', label: 'shipped', count: orders.filter(o => o.status === 'shipped').length },
    { key: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
  ];

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-700 flex items-center space-x-2">
            {/* <ShoppingCart className="h-8 w-8" /> */}
            <span>🛒 Assigned Orders</span>
          </h1>
          <p className="text-green-600 mt-1 text-lg">Manage your fresh grocery delivery assignments</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Filter className="h-5 w-5 text-green-500" />
          <span className="text-sm text-green-600 font-medium">Filter by status</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <motion.button
            key={filter.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === filter.key
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-green-700 border border-green-300 hover:bg-green-50 hover:transform hover:scale-102'
            }`}
          >
            {filter.label} ({filter.count})
          </motion.button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 hover:shadow-xl hover:transform hover:scale-102 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="font-bold text-xl text-green-700">#{order.orderNumber}</span>
                  <span className={`px-4 py-2 rounded-2xl text-sm font-semibold ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <ShoppingCart className="h-5 w-5 text-green-500" />
                      <span className="font-semibold text-green-800">👤 {order.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Phone className="h-5 w-5 text-green-500" />
                      <span className="text-green-700">📞 {order.customerPhone}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-green-500 mt-1" />
                      <span className="text-green-700">📍 {order.address}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <CreditCard className="h-5 w-5 text-green-500" />
                      <span className="text-green-700 font-semibold">
                        💳 ₹{order.finalAmount.toFixed(2)} - {order.paymentStatus} ({order.paymentMode})
                      </span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      🛍️ {order.items.length} items • ⏰ Assigned {new Date(order.assignedAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 lg:mt-0 lg:ml-6">
                <Link
                  to={`/delivery/orders/${order.id}`}
                  className="block w-full lg:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-semibold text-center transform hover:scale-105 shadow-lg"
                >
                  👁️ View Details
                </Link>
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
          <h3 className="text-xl font-bold text-green-700 mb-2">🛒 No orders found</h3>
          <p className="text-green-600">No fresh grocery orders match your current filter selection.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AssignedOrders;