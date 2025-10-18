import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  Star,
  TrendingUp,
  Package,
  DollarSign,
  Eye,
  MessageSquare
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Card from '../../components/layout/StoreOwner/Card';
import Badge from '../../components/layout/StoreOwner/Badge';
import Button from '../../components/layout/StoreOwner/Button';
import KPICard from '../../components/layout/StoreOwner/KPICard';
import Modal from '../../components/layout/StoreOwner/Modal';

// Mock customer data
const customerDetails = {
  '1': {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 234-567-8901',
    address: '123 Main St, City, State 12345',
    joinDate: '2023-06-15',
    status: 'active',
    tier: 'vip',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    totalOrders: 24,
    totalSpent: 1240.50,
    avgOrderValue: 51.69,
    favoriteCategory: 'Organic Foods',
    lastOrder: '2024-01-15',
    monthlySpending: [
      { month: 'Jul', amount: 120 },
      { month: 'Aug', amount: 180 },
      { month: 'Sep', amount: 150 },
      { month: 'Oct', amount: 220 },
      { month: 'Nov', amount: 190 },
      { month: 'Dec', amount: 280 },
    ],
    categoryPreferences: [
      { name: 'Organic Foods', value: 35, color: '#22c55e' },
      { name: 'Fresh Produce', value: 25, color: '#f97316' },
      { name: 'Dairy Products', value: 20, color: '#eab308' },
      { name: 'Bakery Items', value: 20, color: '#8b5cf6' },
    ],
    orderHistory: [
      { id: 'ORD-000L22CMIS', date: '2024-01-15', status: 'delivered', amount: 45.99, paymentMethod: 'card' },
      { id: 'ORD-000L22CMIT', date: '2024-01-12', status: 'delivered', amount: 67.50, paymentMethod: 'cod' },
      { id: 'ORD-000L22CMIU', date: '2024-01-08', status: 'delivered', amount: 23.75, paymentMethod: 'wallet' },
      { id: 'ORD-000L22CMIV', date: '2024-01-05', status: 'cancelled', amount: 89.25, paymentMethod: 'card' },
      { id: 'ORD-000L22CMIW', date: '2024-01-02', status: 'delivered', amount: 156.80, paymentMethod: 'cod' },
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: 'Excellent service! Fresh products delivered on time.',
        date: '2024-01-15',
        orderRef: 'ORD-000L22CMIS',
        response: null
      },
      {
        id: 2,
        rating: 4,
        comment: 'Good quality products, but delivery was slightly delayed.',
        date: '2024-01-12',
        orderRef: 'ORD-000L22CMIT',
        response: 'Thank you for your feedback! We\'re working on improving our delivery times.'
      },
      {
        id: 3,
        rating: 5,
        comment: 'Love the organic selection! Will definitely order again.',
        date: '2024-01-08',
        orderRef: 'ORD-000L22CMIU',
        response: null
      }
    ]
  }
};

const CustomerDetail = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [responseText, setResponseText] = useState('');
  
  const customer = customerDetails[id];

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Customer not found</p>
          <Link to="/owner/customers">
            <Button className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Customers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(customer.orderHistory.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = customer.orderHistory.slice(startIndex, startIndex + ordersPerPage);

  const handleCall = () => {
    window.open(`tel:${customer.phone}`);
  };

  const handleEmail = () => {
    window.open(`mailto:${customer.email}`);
  };

  const handleViewOrders = () => {
    console.log('Viewing all orders for customer:', customer.id);
  };

  const handleRespondToReview = (review) => {
    setSelectedReview(review);
    setResponseText('');
    setShowResponseModal(true);
  };

  const submitResponse = () => {
    console.log('Submitting response to review:', selectedReview.id, responseText);
    setShowResponseModal(false);
    setSelectedReview(null);
    setResponseText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/owner/customers"
            className="p-3 hover:bg-fresh-green/10 rounded-2xl transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-fresh-green" />
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              {customer.profileImage ? (
                <img
                  src={customer.profileImage}
                  alt={customer.name}
                  className="w-16 h-16 rounded-2xl object-cover shadow-fresh border-2 border-white"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              )}
              {customer.tier === 'vip' && (
                <div className="absolute -top-1 -right-1 p-1 bg-grocery-yellow rounded-full">
                  <Star className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-fresh-green"
              >
                {customer.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Customer since {customer.joinDate}
              </motion.p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={handleCall}>
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="secondary" onClick={handleEmail}>
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button onClick={handleViewOrders}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            View Orders
          </Button>
        </div>
      </div>

      {/* Customer Profile & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Profile Card */}
        <Card className="p-6 grocery-pattern">
          <h3 className="text-xl font-semibold text-fresh-green mb-6">Customer Profile</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium text-gray-900">{customer.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{customer.phone}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium text-gray-900">{customer.address}</p>
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                  Open in Maps
                </Button>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge variant={customer.status === 'active' ? 'success' : 'error'}>
                  {customer.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">Tier</span>
                <Badge variant={customer.tier === 'vip' ? 'warning' : 'secondary'}>
                  {customer.tier.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Insights Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <KPICard
            title="Total Orders"
            value={customer.totalOrders}
            change="Lifetime orders"
            changeType="positive"
            icon={ShoppingCart}
            color="bg-fresh-green"
          />
          <KPICard
            title="Total Spent"
            value={`$${customer.totalSpent.toLocaleString()}`}
            change="Lifetime value"
            changeType="positive"
            icon={DollarSign}
            color="bg-grocery-orange"
          />
          <KPICard
            title="Avg Order Value"
            value={`$${customer.avgOrderValue.toFixed(2)}`}
            change="Per order"
            changeType="positive"
            icon={TrendingUp}
            color="bg-grocery-yellow"
          />
          <KPICard
            title="Favorite Category"
            value={customer.favoriteCategory}
            change="Most purchased"
            changeType="positive"
            icon={Package}
            color="bg-purple-500"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-fresh-green mb-4">Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customer.monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Preferences */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-fresh-green mb-4">Category Preferences</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customer.categoryPreferences}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {customer.categoryPreferences.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {customer.categoryPreferences.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-600">{category.name}</span>
                </div>
                <span className="font-medium">{category.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Order History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-fresh-green">Order History</h3>
          <Badge variant="success">{customer.orderHistory.length} Total Orders</Badge>
        </div>
        
        <div className="space-y-4">
          {paginatedOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-fresh-green/5 rounded-2xl border border-gray-200 hover:shadow-fresh transition-all duration-300"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="font-semibold text-fresh-green">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div>
                  <Badge variant={order.status}>{order.status}</Badge>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">${order.amount}</p>
                  <p className="text-sm text-gray-600 capitalize">{order.paymentMethod}</p>
                </div>
                <div className="flex justify-end">
                  <Link to={`/owner/orders/${order.id.split('-')[1]}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </Card>

      {/* Reviews & Feedback */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-fresh-green mb-6">Reviews & Feedback</h3>
        
        <div className="space-y-6">
          {customer.reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-gradient-to-r from-white to-fresh-green/5 rounded-2xl border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-grocery-yellow fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Order: {review.orderRef}</span>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
                {!review.response && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRespondToReview(review)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Respond
                  </Button>
                )}
              </div>
              
              <p className="text-gray-700 mb-4">{review.comment}</p>
              
              {review.response && (
                <div className="mt-4 p-4 bg-fresh-green/10 rounded-2xl border-l-4 border-fresh-green">
                  <p className="text-sm font-medium text-fresh-green mb-1">Store Response:</p>
                  <p className="text-gray-700">{review.response}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {customer.reviews.length === 0 && (
          <div className="text-center py-12">
            <Star className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No reviews yet</p>
            <p className="text-gray-400 text-sm">Customer hasn't left any feedback</p>
          </div>
        )}
      </Card>

      {/* Response Modal */}
      <Modal
        isOpen={showResponseModal}
        onClose={() => setShowResponseModal(false)}
        title="Respond to Review"
        size="lg"
      >
        {selectedReview && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < selectedReview.rating ? 'text-grocery-yellow fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{selectedReview.date}</span>
              </div>
              <p className="text-gray-700">{selectedReview.comment}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Response
              </label>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                placeholder="Write your response to this review..."
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button variant="secondary" onClick={() => setShowResponseModal(false)}>
                Cancel
              </Button>
              <Button onClick={submitResponse}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Response
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default CustomerDetail;