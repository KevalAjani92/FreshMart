import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Users,
  Star,
  ShoppingCart,
  Eye,
  MoreVertical,
  Crown,
  Ban,
  Mail,
  Phone,
  User,
  User2,
} from "lucide-react";
import Card from "../../components/layout/StoreOwner/Card";
import KPICard from "../../components/layout/StoreOwner/KPICard";
import Badge from "../../components/layout/StoreOwner/Badge";
import Button from "../../components/layout/StoreOwner/Button";
import Modal from "../../components/layout/StoreOwner/Modal";

const customers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 234-567-8901",
    joinDate: "2023-06-15",
    totalOrders: 24,
    totalSpent: 1240.5,
    avgOrderValue: 51.69,
    status: "active",
    tier: "vip",
    lastOrder: "2024-01-15",
    favoriteCategory: "Organic Foods",
    address: "123 Main St, City, State 12345",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+1 234-567-8902",
    joinDate: "2023-08-22",
    totalOrders: 18,
    totalSpent: 890.25,
    avgOrderValue: 49.46,
    status: "active",
    tier: "regular",
    lastOrder: "2024-01-14",
    favoriteCategory: "Fresh Produce",
    address: "456 Oak Ave, City, State 12346",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    phone: "+1 234-567-8903",
    joinDate: "2023-03-10",
    totalOrders: 45,
    totalSpent: 2340.8,
    avgOrderValue: 52.02,
    status: "active",
    tier: "vip",
    lastOrder: "2024-01-15",
    favoriteCategory: "Dairy Products",
    address: "789 Pine St, City, State 12347",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1 234-567-8904",
    joinDate: "2023-12-01",
    totalOrders: 3,
    totalSpent: 156.75,
    avgOrderValue: 52.25,
    status: "inactive",
    tier: "new",
    lastOrder: "2024-01-05",
    favoriteCategory: "Beverages",
    address: "321 Elm Dr, City, State 12348",
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@example.com",
    phone: "+1 234-567-8905",
    joinDate: "2023-07-18",
    totalOrders: 32,
    totalSpent: 1680.4,
    avgOrderValue: 52.51,
    status: "blocked",
    tier: "regular",
    lastOrder: "2024-01-10",
    favoriteCategory: "Bakery",
    address: "654 Maple Rd, City, State 12349",
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    const matchesTier = tierFilter === "all" || customer.tier === tierFilter;
    return matchesSearch && matchesStatus && matchesTier;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const vipCustomers = customers.filter((c) => c.tier === "vip").length;
  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );

  const updateCustomerTier = (customerId, newTier) => {
    console.log(`Updating customer ${customerId} tier to ${newTier}`);
  };

  const updateCustomerStatus = (customerId, newStatus) => {
    console.log(`Updating customer ${customerId} status to ${newStatus}`);
  };

  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
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
              <User2 className="h-8 w-8 text-white" />
            </div>
            Customer Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Manage customer relationships and insights
          </motion.p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Send Newsletter
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Customers"
          value={totalCustomers}
          change="+12 this month"
          changeType="positive"
          icon={Users}
          color="bg-blue-500"
        />
        <KPICard
          title="Active Customers"
          value={activeCustomers}
          change="85% retention rate"
          changeType="positive"
          icon={Users}
          color="bg-green-500"
        />
        <KPICard
          title="VIP Customers"
          value={vipCustomers}
          change="+3 this month"
          changeType="positive"
          icon={Crown}
          color="bg-purple-500"
        />
        <KPICard
          title="Customer LTV"
          value={`$${(totalRevenue / totalCustomers).toFixed(0)}`}
          change="+8% average"
          changeType="positive"
          icon={Star}
          color="bg-orange-500"
        />
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="all">All Tiers</option>
            <option value="vip">VIP</option>
            <option value="regular">Regular</option>
            <option value="new">New</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            <option>Sort by Spent</option>
            <option>Highest Spender</option>
            <option>Most Orders</option>
            <option>Recently Joined</option>
          </select>
        </div>
      </Card>

      {/* Customers List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Customers ({filteredCustomers.length})
          </h3>
          <div className="flex space-x-2">
            <Badge variant="success">
              Active: {customers.filter((c) => c.status === "active").length}
            </Badge>
            <Badge variant="warning">
              Inactive:{" "}
              {customers.filter((c) => c.status === "inactive").length}
            </Badge>
            <Badge variant="error">
              Blocked: {customers.filter((c) => c.status === "blocked").length}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">
                          {customer.name}
                        </p>
                        {customer.tier === "vip" && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      ${customer.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {customer.totalOrders} orders
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      ${customer.avgOrderValue.toFixed(2)} avg
                    </p>
                    <p className="text-sm text-gray-600">
                      Last: {customer.lastOrder}
                    </p>
                  </div>

                  <div>
                    <Badge
                      variant={
                        customer.status === "active"
                          ? "success"
                          : customer.status === "inactive"
                          ? "warning"
                          : "error"
                      }
                    >
                      {customer.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">
                      {customer.tier} tier
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => viewCustomerDetails(customer)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {customer.tier !== "vip" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateCustomerTier(customer.id, "vip")}
                    >
                      <Crown className="h-4 w-4 text-yellow-500" />
                    </Button>
                  )}
                  {customer.status !== "blocked" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateCustomerStatus(customer.id, "blocked")
                      }
                    >
                      <Ban className="h-4 w-4 text-red-600" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  <strong>Favorite Category:</strong>{" "}
                  {customer.favoriteCategory}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Member Since:</strong> {customer.joinDate}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-gray-500 mt-2">
              No customers found matching your criteria.
            </p>
          </div>
        )}
      </Card>

      {/* Customer Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Customer Details"
        size="lg"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="h-16 w-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedCustomer.name}
                  </h3>
                  {selectedCustomer.tier === "vip" && (
                    <Crown className="h-5 w-5 text-yellow-500" />
                  )}
                  <Badge
                    variant={
                      selectedCustomer.status === "active"
                        ? "success"
                        : selectedCustomer.status === "inactive"
                        ? "warning"
                        : "error"
                    }
                  >
                    {selectedCustomer.status}
                  </Badge>
                </div>
                <p className="text-gray-600">
                  {selectedCustomer.tier} Customer
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{selectedCustomer.phone}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedCustomer.address}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Order Statistics
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Orders:</span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.totalOrders}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Spent:</span>
                    <span className="text-sm font-medium">
                      ${selectedCustomer.totalSpent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Avg Order Value:
                    </span>
                    <span className="text-sm font-medium">
                      ${selectedCustomer.avgOrderValue.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Order:</span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.lastOrder}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                Preferences
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Favorite Category:</strong>{" "}
                  {selectedCustomer.favoriteCategory}
                </p>
                <p className="text-sm mt-1">
                  <strong>Member Since:</strong> {selectedCustomer.joinDate}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </Button>
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Customers;
