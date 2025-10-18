import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Percent,
  Calendar,
  Tag,
  Edit,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
  PercentIcon,
} from "lucide-react";
import Card from "../../components/layout/StoreOwner/Card";
import KPICard from "../../components/layout/StoreOwner/KPICard";
import Badge from "../../components/layout/StoreOwner/Badge";
import Button from "../../components/layout/StoreOwner/Button";
import Modal from "../../components/layout/StoreOwner/Modal";

const discounts = [
  {
    id: 1,
    name: "Weekend Special",
    code: "WEEKEND20",
    type: "percentage",
    value: 20,
    minOrder: 50,
    maxDiscount: 100,
    startDate: "2024-01-20",
    endDate: "2024-01-21",
    status: "active",
    usedCount: 45,
    maxUses: 100,
    category: "All Products",
    description: "20% off on weekend orders above $50",
  },
  {
    id: 2,
    name: "New Customer",
    code: "WELCOME15",
    type: "percentage",
    value: 15,
    minOrder: 25,
    maxDiscount: 50,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    usedCount: 128,
    maxUses: 500,
    category: "All Products",
    description: "15% off for new customers",
  },
  {
    id: 3,
    name: "Free Delivery",
    code: "FREEDEL",
    type: "free_shipping",
    value: 0,
    minOrder: 75,
    maxDiscount: 15,
    startDate: "2024-01-15",
    endDate: "2024-01-31",
    status: "active",
    usedCount: 32,
    maxUses: 200,
    category: "All Products",
    description: "Free delivery on orders above $75",
  },
  {
    id: 4,
    name: "Bulk Order",
    code: "BULK50",
    type: "fixed",
    value: 50,
    minOrder: 200,
    maxDiscount: 50,
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    status: "expired",
    usedCount: 8,
    maxUses: 50,
    category: "All Products",
    description: "$50 off on bulk orders above $200",
  },
];

const Discounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    name: "",
    code: "",
    type: "percentage",
    value: "",
    minOrder: "",
    maxDiscount: "",
    startDate: "",
    endDate: "",
    category: "All Products",
    description: "",
    maxUses: "",
  });

  const filteredDiscounts = discounts.filter((discount) => {
    const matchesSearch =
      discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || discount.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeDiscounts = discounts.filter((d) => d.status === "active").length;
  const totalSavings = discounts.reduce(
    (sum, discount) => sum + discount.usedCount * discount.value,
    0
  );

  const handleCreateDiscount = () => {
    console.log("Creating new discount:", newDiscount);
    setNewDiscount({
      name: "",
      code: "",
      type: "percentage",
      value: "",
      minOrder: "",
      maxDiscount: "",
      startDate: "",
      endDate: "",
      category: "All Products",
      description: "",
      maxUses: "",
    });
    setShowCreateModal(false);
  };

  const toggleDiscountStatus = (id) => {
    console.log("Toggling discount status for:", id);
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
              <PercentIcon className="h-8 w-8 text-white" />
            </div>
            Promotions & Discounts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Create and manage discount codes and promotions
          </motion.p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Discount
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Active Discounts"
          value={activeDiscounts}
          change="+2 this week"
          changeType="positive"
          icon={Tag}
          color="bg-green-500"
        />
        <KPICard
          title="Total Discounts"
          value={discounts.length}
          change="All time"
          changeType="neutral"
          icon={Percent}
          color="bg-blue-500"
        />
        <KPICard
          title="Customer Savings"
          value={`$${totalSavings}`}
          change="This month"
          changeType="positive"
          icon={Tag}
          color="bg-purple-500"
        />
        <KPICard
          title="Usage Rate"
          value="73%"
          change="+8% from last month"
          changeType="positive"
          icon={Calendar}
          color="bg-orange-500"
        />
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search discounts..."
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
            <option value="expired">Expired</option>
            <option value="scheduled">Scheduled</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            <option>All Categories</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Dairy</option>
            <option>Bakery</option>
          </select>
        </div>
      </Card>

      {/* Discounts List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Discounts ({filteredDiscounts.length})
          </h3>
          <div className="flex space-x-2">
            <Badge variant="success">
              Active: {discounts.filter((d) => d.status === "active").length}
            </Badge>
            <Badge variant="error">
              Expired: {discounts.filter((d) => d.status === "expired").length}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          {filteredDiscounts.map((discount, index) => (
            <motion.div
              key={discount.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {discount.name}
                    </h4>
                    <p className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                      {discount.code}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {discount.type === "percentage"
                        ? `${discount.value}% off`
                        : discount.type === "fixed"
                        ? `$${discount.value} off`
                        : "Free Shipping"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Min order: ${discount.minOrder}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {discount.startDate} - {discount.endDate}
                    </p>
                    <p className="text-sm text-gray-600">
                      Used: {discount.usedCount}/{discount.maxUses}
                    </p>
                  </div>

                  <div>
                    <Badge
                      variant={
                        discount.status === "active"
                          ? "success"
                          : discount.status === "expired"
                          ? "error"
                          : "warning"
                      }
                    >
                      {discount.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleDiscountStatus(discount.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {discount.status === "active" ? (
                      <ToggleRight className="h-6 w-6 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>

              {discount.description && (
                <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-100">
                  {discount.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {filteredDiscounts.length === 0 && (
          <div className="text-center py-8">
            <Percent className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-gray-500 mt-2">
              No discounts found matching your criteria.
            </p>
          </div>
        )}
      </Card>

      {/* Create Discount Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Discount"
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Name
              </label>
              <input
                type="text"
                value={newDiscount.name}
                onChange={(e) =>
                  setNewDiscount({ ...newDiscount, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Weekend Special"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Code
              </label>
              <input
                type="text"
                value={newDiscount.code}
                onChange={(e) =>
                  setNewDiscount({
                    ...newDiscount,
                    code: e.target.value.toUpperCase(),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="WEEKEND20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Type
              </label>
              <select
                value={newDiscount.type}
                onChange={(e) =>
                  setNewDiscount({ ...newDiscount, type: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
                <option value="free_shipping">Free Shipping</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {newDiscount.type === "percentage"
                  ? "Percentage (%)"
                  : newDiscount.type === "fixed"
                  ? "Amount ($)"
                  : "Value"}
              </label>
              <input
                type="number"
                value={newDiscount.value}
                onChange={(e) =>
                  setNewDiscount({ ...newDiscount, value: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder={newDiscount.type === "percentage" ? "20" : "50"}
                disabled={newDiscount.type === "free_shipping"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order ($)
              </label>
              <input
                type="number"
                value={newDiscount.minOrder}
                onChange={(e) =>
                  setNewDiscount({ ...newDiscount, minOrder: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={newDiscount.startDate}
                onChange={(e) =>
                  setNewDiscount({ ...newDiscount, startDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={newDiscount.endDate}
                onChange={(e) =>
                  setNewDiscount({ ...newDiscount, endDate: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Uses
              </label>
              <input
                type="number"
                value={newDiscount.maxUses}
                onChange={(e) =>
                  setNewDiscount({ ...newDiscount, maxUses: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newDiscount.description}
              onChange={(e) =>
                setNewDiscount({ ...newDiscount, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Brief description of the discount..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateDiscount}>Create Discount</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Discounts;
