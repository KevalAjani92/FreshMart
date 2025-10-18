import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Download, Coins } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../../components/layout/delivery/StatCard';
import LoadingSpinner from '../../components/layout/delivery/LoadingSpinner';
import { useApp } from '../../context/AppContext';
import { deliveryAPI } from '../../services/deliveryAPI';

const Earnings = () => {
  const { stats } = useApp();
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    const loadEarningsData = async () => {
      try {
        const data = await deliveryAPI.getEarningsData();
        setEarningsData(data);
      } catch (error) {
        console.error('Failed to load earnings data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEarningsData();
  }, []);

  if (loading || !stats) {
    return <LoadingSpinner />;
  }

  const pieData = [
    { name: 'Base Earnings', value: stats.weeklyEarnings * 0.7, color: '#10B981' },
    { name: 'Tips', value: stats.weeklyEarnings * 0.2, color: '#F59E0B' },
    { name: 'Bonuses', value: stats.weeklyEarnings * 0.1, color: '#3B82F6' }
  ];

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
            {/* <Wallet className="h-8 w-8" /> */}
            <span>💰 My Earnings</span>
          </h1>
          <p className="text-green-600 mt-1 text-lg">Track your fresh grocery delivery earnings and performance</p>
        </div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all mt-4 sm:mt-0 transform hover:scale-105 shadow-lg font-semibold">
          <Download className="h-4 w-4" />
          <span>📊 Download Report</span>
        </button>
      </div>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Today's Earnings"
          value={stats.earningsToday}
          icon={Wallet}
          color="bg-gradient-to-br from-green-500 to-green-600"
          prefix="$"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Weekly Earnings"
          value={stats.weeklyEarnings}
          icon={TrendingUp}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          prefix="$"
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          title="Monthly Earnings"
          value={stats.monthlyEarnings}
          icon={Coins}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          prefix="$"
          trend={{ value: 15.7, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg border border-green-100 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-green-700 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>📈 Earnings Trend</span>
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedPeriod('week')}
                className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all ${
                  selectedPeriod === 'week' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all ${
                  selectedPeriod === 'month' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={earningsData}>
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
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.1)'
                }}
              />
              <Bar dataKey="amount" fill="url(#greenGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Earnings Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-lg border border-green-100 p-6"
        >
          <h3 className="text-xl font-bold text-green-700 mb-4">🥧 Earnings Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `$${value.toFixed(2)}`}
                contentStyle={{ 
                  backgroundColor: '#f0fdf4', 
                  border: '1px solid #22c55e',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between p-2 bg-green-50 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full shadow-sm`} style={{ backgroundColor: entry.color }} />
                  <span className="text-sm text-green-700 font-medium">{entry.name}</span>
                </div>
                <span className="text-sm font-bold text-green-800">${entry.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl shadow-lg border border-green-100 p-8"
      >
        <h3 className="text-2xl font-bold text-green-700 mb-6">📊 Weekly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl border border-green-200">
            <p className="text-3xl font-bold text-green-700">{stats.completedToday * 7}</p>
            <p className="text-sm text-green-600 font-semibold">🚚 Total Deliveries</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl border border-yellow-200">
            <p className="text-3xl font-bold text-yellow-600">{stats.averageRating}</p>
            <p className="text-sm text-yellow-600 font-semibold">⭐ Average Rating</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl border border-orange-200">
            <p className="text-3xl font-bold text-orange-600">$25.00</p>
            <p className="text-sm text-orange-600 font-semibold">🎁 Bonus Earned</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl border border-green-200">
            <p className="text-3xl font-bold text-green-600">18 min</p>
            <p className="text-sm text-green-600 font-semibold">⏱️ Avg Delivery Time</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Earnings;