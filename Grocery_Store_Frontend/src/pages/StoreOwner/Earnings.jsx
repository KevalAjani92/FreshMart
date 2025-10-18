import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Download,
  Calendar,
  CreditCard,
  Banknote,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../../components/layout/StoreOwner/Card";
import KPICard from "../../components/layout/StoreOwner/KPICard";
import Badge from "../../components/layout/StoreOwner/Badge";
import Button from "../../components/layout/StoreOwner/Button";

const earningsData = [
  { name: "Mon", revenue: 2400, orders: 24, cod: 1200, online: 1200 },
  { name: "Tue", revenue: 1398, orders: 13, cod: 699, online: 699 },
  { name: "Wed", revenue: 9800, orders: 98, cod: 4900, online: 4900 },
  { name: "Thu", revenue: 3908, orders: 39, cod: 1954, online: 1954 },
  { name: "Fri", revenue: 4800, orders: 48, cod: 2400, online: 2400 },
  { name: "Sat", revenue: 3800, orders: 38, cod: 1900, online: 1900 },
  { name: "Sun", revenue: 4300, orders: 43, cod: 2150, online: 2150 },
];

const monthlyData = [
  { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "Feb", revenue: 52000, expenses: 35000, profit: 17000 },
  { month: "Mar", revenue: 48000, expenses: 33000, profit: 15000 },
  { month: "Apr", revenue: 61000, expenses: 38000, profit: 23000 },
  { month: "May", revenue: 55000, expenses: 36000, profit: 19000 },
  { month: "Jun", revenue: 67000, expenses: 42000, profit: 25000 },
];

const paymentMethodData = [
  { name: "Cash on Delivery", value: 45, color: "#10B981" },
  { name: "Credit Card", value: 35, color: "#3B82F6" },
  { name: "Digital Wallet", value: 20, color: "#8B5CF6" },
];

const recentTransactions = [
  {
    id: "#12345",
    date: "2024-01-15",
    amount: 45.99,
    method: "cod",
    status: "completed",
  },
  {
    id: "#12346",
    date: "2024-01-15",
    amount: 67.5,
    method: "card",
    status: "completed",
  },
  {
    id: "#12347",
    date: "2024-01-15",
    amount: 23.75,
    method: "wallet",
    status: "pending",
  },
  {
    id: "#12348",
    date: "2024-01-14",
    amount: 89.25,
    method: "cod",
    status: "completed",
  },
  {
    id: "#12349",
    date: "2024-01-14",
    amount: 156.8,
    method: "card",
    status: "completed",
  },
];

const Earnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const totalRevenue = earningsData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = earningsData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  const exportData = (format) => {
    console.log(`Exporting earnings data as ${format}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-fresh-green flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            Earnings & Payments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Track revenue and payment analytics
          </motion.p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportData("excel")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+12% from last week"
          changeType="positive"
          icon={DollarSign}
          color="bg-green-500"
        />
        <KPICard
          title="Net Profit"
          value="$8,240"
          change="+8% from last week"
          changeType="positive"
          icon={TrendingUp}
          color="bg-blue-500"
        />
        <KPICard
          title="Avg Order Value"
          value={`$${avgOrderValue.toFixed(2)}`}
          change="+5% from last week"
          changeType="positive"
          icon={ArrowUpRight}
          color="bg-purple-500"
        />
        <KPICard
          title="Total Orders"
          value={totalOrders}
          change="+15% from last week"
          changeType="positive"
          icon={Calendar}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Revenue Trend
            </h3>
            <Badge variant="success">This Week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Methods
            </h3>
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {paymentMethodData.map((method, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: method.color }}
                  />
                  <span className="text-gray-600">{method.name}</span>
                </div>
                <span className="font-medium">{method.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Monthly Performance
          </h3>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Profit</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#10B981" />
            <Bar dataKey="expenses" fill="#EF4444" />
            <Bar dataKey="profit" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Transactions & Payment Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    {transaction.method === "cod" ? (
                      <Banknote className="h-5 w-5 text-emerald-600" />
                    ) : transaction.method === "card" ? (
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    ) : (
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.id}
                    </p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${transaction.amount}
                  </p>
                  <Badge
                    variant={
                      transaction.status === "completed" ? "success" : "warning"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Payment Analysis */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cash on Delivery</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">$15,240</span>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Online Payments</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">$18,760</span>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Refunds</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">$420</span>
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="ghost">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Earnings;
