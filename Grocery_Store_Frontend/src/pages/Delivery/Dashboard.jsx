import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Truck, CheckCircle, Wallet, TrendingUp, Clock, Apple, Leaf } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/layout/delivery/StatCard';
import LoadingSpinner from '../../components/layout/delivery/LoadingSpinner';
import { useApp } from '../../context/AppContext';
import { deliveryAPI } from '../../services/deliveryAPI';

const Dashboard = () => {
  const { stats, profile } = useApp();
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await deliveryAPI.getEarningsData();
        setEarningsData(data.slice(-7)); // Last 7 days
      } catch (error) {
        console.error('Failed to load earnings data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || !stats) {
    return <LoadingSpinner />;
  }

  const recentEarnings = earningsData.slice(-3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Apple className="h-32 w-32 transform rotate-12" />
        </div>
        <div className="absolute bottom-0 left-0 opacity-10">
          <Leaf className="h-24 w-24 transform -rotate-12" />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <h1 className="text-3xl font-bold mb-2">
            🌱 Welcome back, {profile?.name?.split(' ')[0]}!
          </h1>
          <p className="text-green-100 text-lg">
            🛒 You have {stats.pendingOrders} fresh grocery orders waiting for delivery today
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={ShoppingCart}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Out for Delivery"
          value={stats.outForDelivery}
          icon={Truck}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Completed Today"
          value={stats.completedToday}
          icon={CheckCircle}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Earnings Today"
          value={stats.earningsToday}
          icon={Wallet}
          color="bg-gradient-to-br from-green-600 to-green-700"
          prefix="$"
          trend={{ value: 5.2, isPositive: true }}
        />
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-green-100 p-6"
        >
          <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>📈 Weekly Earnings</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                stroke="#16a34a"
              />
              <YAxis stroke="#16a34a" />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value) => [`$${value}`, 'Earnings']}
                contentStyle={{ 
                  backgroundColor: '#f0fdf4', 
                  border: '1px solid #22c55e',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#22c55e"
                strokeWidth={4}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#16a34a' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">🚀 Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/delivery/orders"
                className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-semibold transform hover:scale-105 shadow-lg"
              >
                🛒 View Assigned Orders
              </Link>
              <Link
                to="/delivery/earnings"
                className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all font-semibold transform hover:scale-105 shadow-lg"
              >
                💰 Check Earnings
              </Link>
            </div>
          </div>

          {/* Recent Earnings */}
          <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">💵 Recent Earnings</h3>
            <div className="space-y-3">
              {recentEarnings.map((earning, index) => (
                <div key={earning.date} className="flex items-center justify-between p-3 bg-green-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      {new Date(earning.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-green-600">🛍️ {earning.orders} orders</p>
                  </div>
                  <span className="text-green-700 font-bold text-lg">${earning.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-3xl shadow-lg border border-green-100 p-8"
      >
        <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center space-x-2">
          <TrendingUp className="h-6 w-6" />
          <span>🏆 Performance Overview</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl mx-auto mb-4 shadow-lg">
              <TrendingUp className="h-10 w-10 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.totalDeliveries}</p>
            <p className="text-sm text-green-600 font-medium">🚚 Total Deliveries</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl mx-auto mb-4 shadow-lg">
              <span className="text-3xl">⭐</span>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.averageRating}</p>
            <p className="text-sm text-yellow-600 font-medium">⭐ Average Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl mx-auto mb-4 shadow-lg">
              <Clock className="h-10 w-10 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">18 min</p>
            <p className="text-sm text-orange-600 font-medium">⏱️ Avg Delivery Time</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;