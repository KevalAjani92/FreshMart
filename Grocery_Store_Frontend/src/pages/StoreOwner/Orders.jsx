import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ShoppingCart,
  User,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  UserPlus,
  Check,
  X,
  Clock,
  Truck,
  CreditCard,
  Banknote,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Package,
} from "lucide-react";
import Card from "../../components/layout/StoreOwner/Card";
import KPICard from "../../components/layout/StoreOwner/KPICard";
import Badge from "../../components/layout/StoreOwner/Badge";
import Button from "../../components/layout/StoreOwner/Button";
import AssignStaffModal from "../../components/layout/StoreOwner/AssignStaffModal";
import axios from "axios";
import toast from "react-hot-toast";

// const orders = [
//   {
//     id: "ORD-000L22CMIS",
//     orderNumber: "#12345",
//     customer: {
//       name: "Alice Johnson",
//       phone: "+1 234-567-8901",
//       address: "123 Main St, City, State 12345",
//     },
//     status: "pending",
//     paymentMethod: "cod",
//     paymentStatus: "pending",
//     total: 45.99,
//     orderDate: "2024-01-15 10:30 AM",
//     assignedStaff: null,
//     itemCount: 3,
//   },
//   {
//     id: "ORD-000L22CMIT",
//     orderNumber: "#12346",
//     customer: {
//       name: "Bob Smith",
//       phone: "+1 234-567-8902",
//       address: "456 Oak Ave, City, State 12346",
//     },
//     status: "processing",
//     paymentMethod: "online",
//     paymentStatus: "paid",
//     total: 67.5,
//     orderDate: "2024-01-15 10:25 AM",
//     assignedStaff: {
//       id: 1,
//       name: "John Driver",
//       phone: "+1 234-567-8900",
//       zone: "North Zone",
//       avatar: null,
//     },
//     itemCount: 5,
//   },
//   {
//     id: "ORD-000L22CMIU",
//     orderNumber: "#12347",
//     customer: {
//       name: "Carol Davis",
//       phone: "+1 234-567-8903",
//       address: "789 Pine St, City, State 12347",
//     },
//     status: "shipped",
//     paymentMethod: "online",
//     paymentStatus: "paid",
//     total: 23.75,
//     orderDate: "2024-01-15 10:20 AM",
//     assignedStaff: {
//       id: 2,
//       name: "Sarah Express",
//       phone: "+1 234-567-8901",
//       zone: "South Zone",
//       avatar: null,
//     },
//     itemCount: 2,
//   },
//   {
//     id: "ORD-000L22CMIV",
//     orderNumber: "#12348",
//     customer: {
//       name: "David Wilson",
//       phone: "+1 234-567-8904",
//       address: "321 Elm Dr, City, State 12348",
//     },
//     status: "delivered",
//     paymentMethod: "cod",
//     paymentStatus: "paid",
//     total: 89.25,
//     orderDate: "2024-01-15 10:15 AM",
//     assignedStaff: {
//       id: 3,
//       name: "Mike Quick",
//       phone: "+1 234-567-8902",
//       zone: "East Zone",
//       avatar: null,
//     },
//     itemCount: 7,
//   },
//   {
//     id: "ORD-000L22CMIW",
//     orderNumber: "#12349",
//     customer: {
//       name: "Eva Martinez",
//       phone: "+1 234-567-8905",
//       address: "654 Maple Rd, City, State 12349",
//     },
//     status: "cancelled",
//     paymentMethod: "online",
//     paymentStatus: "refunded",
//     total: 156.8,
//     orderDate: "2024-01-15 10:10 AM",
//     assignedStaff: null,
//     itemCount: 9,
//   },
// ];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // const [dateFilter, setDateFilter] = useState("all");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [modalStaff, setModalStaff] = useState(null);
  const [isStaffLoading, setIsStaffLoading] = useState(true);

  const fetchModalStaff = async () => {
    try {
      setIsStaffLoading(true);
      const response = await axios.get(
        "https://localhost:7188/api/DeliveryStaff/assignment-Modal"
      );
      setModalStaff(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching delivery staff:", error);
    } finally {
      setIsStaffLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7188/api/Order/owner/GetAll`,
        {
          params: {
            search: searchTerm,
            status: statusFilter,
            payment: paymentFilter,
            page: currentPage,
            pageSize: ordersPerPage,
          },
        }
      );
      setOrders(response.data.data);
      setTotalRecords(response.data.totalRecords);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchModalStaff();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, statusFilter, paymentFilter, currentPage]);

  const totalPages = Math.ceil(totalRecords / ordersPerPage);
  const paginatedOrders = orders;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const processingOrders = orders.filter(
    (o) => o.status === "confirmed" || o.status === "packed"
  ).length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const handleAcceptOrder = async (orderId) => {
    console.log("Accepting order:", orderId);
    // Implement accept order logic here
    try {
      await axios.put(
        `https://localhost:7188/api/Order/accept-order/${orderId}`
      );
      fetchOrders(); // Refresh orders after accepting
      toast.success("Order Accepted Successfully!");
    } catch (error) {
      console.error("Error accepting order:", error);
      toast.error("Can't Accept Order , Try Again!");
    }
  };

  const handleRejectOrder = async (orderId) => {
    console.log("Rejecting order:", orderId);
    try {
      await axios.put(
        `https://localhost:7188/api/Order/cancel-order/${orderId}`,
        {
          Reason: null,
        }
      );
      fetchOrders(); // Refresh orders after accepting
      toast.success("Order Cancelled Successfully!");
    } catch (error) {
      console.error("Error Cancelling order:", error);
      toast.error("Can't Cancel Order , Try Again!");
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    console.log("Updating order status:", orderId, newStatus);
    try {
      await axios.put(
        `https://localhost:7188/api/Order/update-status/${orderId}`,
        { Status: newStatus }
      );
      fetchOrders();
      toast.success(`Order ${newStatus} Successfully!`);
    } catch (error) {
      console.error(`Error Updating Status ${newStatus}:`, error);
      toast.error(`Can't Update Status to ${newStatus} , Try Again!`);
    }
  };

  const handleAssignStaff = (order) => {
    setSelectedOrder(order);
    setShowAssignModal(true);
  };

  const onStaffAssigned = async (staffId) => {
    console.log("Staff assigned:", staffId, "to order:", selectedOrder?.id);
    try {
      await axios.post(
        "https://localhost:7188/api/OrderAssignment/assign-order",
        {
          OrderId: selectedOrder?.id,
          StaffId: staffId,
        }
      );
      fetchOrders();
      toast.success("Order Successfully Assigned");
      setShowAssignModal(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error In Order Assignment:" + error.message);
      toast.error("Failed to assign order , Try Again!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
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
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            Order Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Manage and track all customer orders efficiently
          </motion.p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Orders"
          value={totalOrders}
          change="+12% from last week"
          changeType="positive"
          icon={ShoppingCart}
          color="bg-fresh-green"
        />
        <KPICard
          title="Pending Orders"
          value={pendingOrders}
          change="Need attention"
          changeType={pendingOrders > 0 ? "negative" : "positive"}
          icon={Clock}
          color="bg-grocery-orange"
        />
        <KPICard
          title="Processing"
          value={processingOrders}
          change="In progress"
          changeType="neutral"
          icon={Package}
          color="bg-grocery-yellow"
        />
        <KPICard
          title="Total Revenue"
          value={`₹${totalRevenue.toFixed(2)}`}
          change="+8% from last week"
          changeType="positive"
          icon={DollarSign}
          color="bg-purple-500"
        />
      </div>

      {/* Filters */}
      <Card className="p-6 grocery-pattern">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Processing</option>
            <option value="packed">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="all">All Payment Methods</option>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
          {/* <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
          <Button variant="secondary" className="justify-center">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button> */}
        </div>
      </Card>

      {/* Orders Grid */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-fresh-green flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Orders ({orders.length})
          </h3>
          <div className="flex space-x-2">
            <Badge variant="warning">Pending: {pendingOrders}</Badge>
            <Badge variant="processing">Processing: {processingOrders}</Badge>
            <Badge variant="success">
              Delivered: {orders.filter((o) => o.status === "delivered").length}
            </Badge>
          </div>
        </div>

        {paginatedOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-r from-white to-fresh-green/5 rounded-2xl border-2 p-6 hover:shadow-fresh transition-all duration-300 ${
                  order.status === "pending"
                    ? "border-grocery-yellow/30 bg-yellow-50/20"
                    : order.status === "cancelled"
                    ? "border-red-300/50 bg-red-50/20"
                    : "border-gray-200 hover:border-fresh-green/30"
                }`}
              >
                <div className="space-y-4">
                  {/* Order Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-fresh-green">
                        {order.orderNumber}
                      </h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {order.orderDate}
                      </p>
                    </div>
                    <Badge variant={order.status}>{order.status}</Badge>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {order.customer.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          window.open(`tel:${order.customer.phone}`)
                        }
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span className="text-sm text-gray-600 flex-1">
                        {order.customer.address}
                      </span>
                    </div>
                  </div>

                  {/* Payment & Amount */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-gray-200">
                    <div className="flex items-center space-x-2">
                      {order.paymentMethod === "cod" ? (
                        <Banknote className="h-5 w-5 text-grocery-orange" />
                      ) : (
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.paymentMethod === "cod"
                            ? "Cash on Delivery"
                            : "Online Payment"}
                        </p>
                        <Badge
                          variant={
                            order.paymentStatus === "paid"
                              ? "success"
                              : "warning"
                          }
                          className="text-xs"
                        >
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-fresh-green">
                        ₹{order.total}
                      </p>
                      <p className="text-xs text-gray-600">
                        {order.itemCount} items
                      </p>
                    </div>
                  </div>

                  {/* Assigned Staff */}
                  {order.assignedStaff ? (
                    <div className="p-3 bg-fresh-green/10 rounded-2xl border border-fresh-green/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-xl flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {order.assignedStaff.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {order.assignedStaff.phone} •{" "}
                            {order.assignedStaff.zone}
                          </p>
                        </div>
                        <Link
                          to={`/owner/delivery-staff/${order.assignedStaff.id}`}
                        >
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        No staff assigned
                      </p>
                      {/* ✅ Show Assign button only if NOT pending/confirmed */}
                      {!(
                        order.status.toLowerCase() === "pending" ||
                        order.status.toLowerCase() === "confirmed" ||
                        order.status.toLowerCase() === "cancelled" ||
                        order.status.toLowerCase() === "delivered"
                      ) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAssignStaff(order)}
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Assign Staff
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200">
                    {order.status === "pending" && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleAcceptOrder(order.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRejectOrder(order.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {order.status === "confirmed" && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleUpdateStatus(order.id, "Packed")}
                      >
                        <Truck className="h-4 w-4 mr-1" />
                        Mark as Packed
                      </Button>
                    )}
                    {order.status === "packed" && (
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleUpdateStatus(order.id, "shipped")}
                      >
                        <Truck className="h-4 w-4 mr-1" />
                        Mark as Shipped
                      </Button>
                    )}

                    {!order.assignedStaff &&
                      order.status !== "pending" &&
                      order.status !== "confirmed" &&
                      order.status !== "cancelled" &&
                      order.status !== "delivered" && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleAssignStaff(order)}
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Assign Staff
                        </Button>
                      )}

                    <Link
                      to={`/owner/orders/${order.orderNumber.replace("#", "")}`}
                    >
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="p-6 bg-gradient-to-br from-fresh-green/10 to-grocery-orange/10 rounded-3xl mb-4">
                <ShoppingCart className="h-16 w-16 text-fresh-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-500 mb-6">
                No orders match your current filters
              </p>
            </motion.div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing page {currentPage} of {totalPages} (Total {totalRecords}{" "}
              orders)
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Assign Staff Modal */}
      <AssignStaffModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        order={selectedOrder}
        onStaffAssigned={onStaffAssigned}
        deliveryStaff={modalStaff}
        isLoading={isStaffLoading}
      />
    </motion.div>
  );
};

export default Orders;
