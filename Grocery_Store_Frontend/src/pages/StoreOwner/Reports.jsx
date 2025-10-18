import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Calendar, 
  FileText, 
  TrendingUp, 
  PieChart,
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  Package
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Card from '../../components/layout/StoreOwner/Card';
import KPICard from '../../components/layout/StoreOwner/KPICard';
import Button from '../../components/layout/StoreOwner/Button';

const salesTrendData = [
  { month: 'Jan', sales: 45000, orders: 420, customers: 180 },
  { month: 'Feb', sales: 52000, orders: 510, customers: 220 },
  { month: 'Mar', sales: 48000, orders: 480, customers: 200 },
  { month: 'Apr', sales: 61000, orders: 580, customers: 250 },
  { month: 'May', sales: 55000, orders: 520, customers: 230 },
  { month: 'Jun', sales: 67000, orders: 620, customers: 280 },
];

const categoryData = [
  { name: 'Fresh Produce', value: 35, sales: 23450, color: '#10B981' },
  { name: 'Dairy Products', value: 25, sales: 16780, color: '#3B82F6' },
  { name: 'Bakery Items', value: 20, sales: 13420, color: '#8B5CF6' },
  { name: 'Beverages', value: 12, sales: 8050, color: '#F59E0B' },
  { name: 'Snacks', value: 8, sales: 5360, color: '#EF4444' },
];

const topProducts = [
  { name: 'Organic Bananas', sold: 245, revenue: 1225 },
  { name: 'Fresh Milk', sold: 189, revenue: 1229 },
  { name: 'Whole Wheat Bread', sold: 156, revenue: 623 },
  { name: 'Free-Range Eggs', sold: 134, revenue: 1205 },
  { name: 'Organic Apples', sold: 122, revenue: 975 },
];

const customerAnalytics = [
  { segment: 'New Customers', count: 45, percentage: 23 },
  { segment: 'Returning Customers', count: 134, percentage: 68 },
  { segment: 'VIP Customers', count: 18, percentage: 9 },
];

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('sales');

  const downloadReport = (format, reportType) => {
    console.log(`Downloading ${reportType} report as ${format}`);
  };

  const generateCustomReport = () => {
    console.log('Generating custom report');
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
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive business insights and analytics</p>
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
            <option value="custom">Custom Range</option>
          </select>
          <Button variant="secondary" size="sm" onClick={generateCustomReport}>
            <FileText className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Quick Report Downloads */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Downloads</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="ghost" 
            className="flex items-center justify-start space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => downloadReport('pdf', 'sales')}
          >
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <div className="text-left">
              <p className="font-medium">Sales Report</p>
              <p className="text-sm text-gray-600">Revenue & trends</p>
            </div>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center justify-start space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => downloadReport('excel', 'inventory')}
          >
            <Package className="h-5 w-5 text-blue-600" />
            <div className="text-left">
              <p className="font-medium">Inventory Report</p>
              <p className="text-sm text-gray-600">Stock levels & alerts</p>
            </div>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center justify-start space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => downloadReport('pdf', 'customer')}
          >
            <Users className="h-5 w-5 text-purple-600" />
            <div className="text-left">
              <p className="font-medium">Customer Report</p>
              <p className="text-sm text-gray-600">Analytics & behavior</p>
            </div>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center justify-start space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => downloadReport('csv', 'orders')}
          >
            <ShoppingCart className="h-5 w-5 text-orange-600" />
            <div className="text-left">
              <p className="font-medium">Orders Report</p>
              <p className="text-sm text-gray-600">Order history & status</p>
            </div>
          </Button>
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$328,000"
          change="+15% from last period"
          changeType="positive"
          icon={DollarSign}
          color="bg-green-500"
        />
        <KPICard
          title="Total Orders"
          value="3,130"
          change="+12% from last period"
          changeType="positive"
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <KPICard
          title="New Customers"
          value="197"
          change="+8% from last period"
          changeType="positive"
          icon={Users}
          color="bg-purple-500"
        />
        <KPICard
          title="Avg Order Value"
          value="$52.40"
          change="+3% from last period"
          changeType="positive"
          icon={TrendingUp}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales Trend Analysis</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => downloadReport('pdf', 'sales-trend')}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Performance */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => downloadReport('excel', 'categories')}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-600">{category.name}</span>
                </div>
                <span className="font-medium">${category.sales.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => downloadReport('csv', 'top-products')}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sold} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${product.revenue}</p>
                  <p className="text-sm text-gray-600">revenue</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Customer Analytics */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Customer Segments</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => downloadReport('pdf', 'customer-analytics')}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {customerAnalytics.map((segment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{segment.segment}</span>
                  <span className="text-sm text-gray-900">{segment.count} customers</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${segment.percentage}%` }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="bg-emerald-600 h-2 rounded-full"
                  />
                </div>
                <span className="text-xs text-gray-600">{segment.percentage}% of total</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Report Schedule */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Reports</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Weekly Sales Summary</p>
                  <p className="text-sm text-gray-600">Every Monday at 9:00 AM</p>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Monthly Inventory</p>
                  <p className="text-sm text-gray-600">1st of every month</p>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Customer Analytics</p>
                  <p className="text-sm text-gray-600">Quarterly report</p>
                </div>
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
            
            <Button className="w-full mt-4">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Report
            </Button>
          </div>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Format</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="format" value="pdf" defaultChecked className="text-emerald-600 focus:ring-emerald-500" />
                <span className="text-sm">PDF Report</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="format" value="excel" className="text-emerald-600 focus:ring-emerald-500" />
                <span className="text-sm">Excel Spreadsheet</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="format" value="csv" className="text-emerald-600 focus:ring-emerald-500" />
                <span className="text-sm">CSV Data</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Date Range</h4>
            <div className="space-y-2">
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Start Date"
              />
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="End Date"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Include</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-emerald-600 focus:ring-emerald-500 rounded" />
                <span className="text-sm">Sales Data</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="text-emerald-600 focus:ring-emerald-500 rounded" />
                <span className="text-sm">Customer Data</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="text-emerald-600 focus:ring-emerald-500 rounded" />
                <span className="text-sm">Inventory Data</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button onClick={() => downloadReport('custom', 'comprehensive')}>
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default Reports;