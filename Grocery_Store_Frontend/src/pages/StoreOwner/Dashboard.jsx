import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  Leaf,
  Apple
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Card from '../../components/layout/StoreOwner/Card';
import KPICard from '../../components/layout/StoreOwner/KPICard';
import Badge from '../../components/layout/StoreOwner/Badge';
import Button from '../../components/layout/StoreOwner/Button';

const salesData = [
  { name: 'Mon', sales: 2400, orders: 24 },
  { name: 'Tue', sales: 1398, orders: 13 },
  { name: 'Wed', sales: 9800, orders: 98 },
  { name: 'Thu', sales: 3908, orders: 39 },
  { name: 'Fri', sales: 4800, orders: 48 },
  { name: 'Sat', sales: 3800, orders: 38 },
  { name: 'Sun', sales: 4300, orders: 43 },
];

const topProducts = [
  { name: 'Organic Bananas', sales: 145, color: '#10B981' },
  { name: 'Fresh Milk', sales: 132, color: '#3B82F6' },
  { name: 'Whole Wheat Bread', sales: 98, color: '#8B5CF6' },
  { name: 'Free-Range Eggs', sales: 86, color: '#F59E0B' },
];

const recentOrders = [
  { id: '#12345', customer: 'Alice Johnson', total: '$45.99', status: 'pending', time: '2 min ago' },
  { id: '#12346', customer: 'Bob Smith', total: '$67.50', status: 'processing', time: '5 min ago' },
  { id: '#12347', customer: 'Carol Davis', total: '$23.75', status: 'shipped', time: '10 min ago' },
  { id: '#12348', customer: 'David Wilson', total: '$89.25', status: 'delivered', time: '15 min ago' },
];

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-primary-600 flex items-center gap-2"
          >
            <Leaf className="h-8 w-8 text-primary-500" />
            Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Welcome back! Here's what's happening in your fresh grocery store today.
          </motion.p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="ghost" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button variant="primary" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$12,426"
          change="+12% from last week"
          changeType="positive"
          icon={DollarSign}
          color="bg-green-500"
        />
        <KPICard
          title="Orders Today"
          value="143"
          change="+8% from yesterday"
          changeType="positive"
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <KPICard
          title="Pending Orders"
          value="23"
          change="+3 from last hour"
          changeType="neutral"
          icon={Package}
          color="bg-orange-500"
        />
        <KPICard
          title="Active Customers"
          value="1,249"
          change="+5% this month"
          changeType="positive"
          icon={Users}
          color="bg-purple-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-600 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sales Trend
            </h3>
            <Badge variant="success">This Week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: '#16a34a' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-600 flex items-center gap-2">
              <Apple className="h-5 w-5" />
              Top Selling Products
            </h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProducts}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="sales"
              >
                {topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {topProducts.map((product, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between text-sm p-2 rounded-xl hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full shadow-sm" 
                    style={{ backgroundColor: product.color }}
                  />
                  <span className="text-gray-600">{product.name}</span>
                </div>
                <span className="font-medium">{product.sales} sold</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-600 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </h3>
            <Button variant="ghost" size="sm">View All Orders</Button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-2xl hover:from-primary-50 hover:to-primary-100/50 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-primary-600">{order.id}</span>
                    <Badge variant={order.status}>{order.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary-600">{order.total}</p>
                  <p className="text-sm text-gray-500">{order.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-primary-600 mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button className="w-full justify-start hover:bg-primary-50" variant="ghost">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Manage Orders
              </Button>
              <Button className="w-full justify-start hover:bg-primary-50" variant="ghost">
                <Package className="h-4 w-4 mr-2" />
                Update Inventory
              </Button>
              <Button className="w-full justify-start hover:bg-primary-50" variant="ghost">
                <Users className="h-4 w-4 mr-2" />
                Add Staff Member
              </Button>
            </div>
          </Card>

          {/* Alerts */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-primary-600 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alerts
            </h3>
            <div className="space-y-3">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border border-red-200"
              >
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Low Stock Alert</p>
                  <p className="text-sm text-red-600">5 items need restocking</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-3 p-4 bg-gradient-to-r from-accent-50 to-accent-100 rounded-2xl border border-accent-200"
              >
                <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Pending Approvals</p>
                  <p className="text-sm text-yellow-600">3 orders awaiting approval</p>
                </div>
              </motion.div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;