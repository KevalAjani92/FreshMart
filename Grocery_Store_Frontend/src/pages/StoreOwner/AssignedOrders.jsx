import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Truck,
  Search,
  Filter,
  Phone,
  MapPin,
  User,
  Eye,
  RotateCcw,
  UserX,
  Calendar,
  Package,
  DollarSign,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Card from '../../components/layout/StoreOwner/Card';
import Badge from '../../components/layout/StoreOwner/Badge';
import Button from '../../components/layout/StoreOwner/Button';
import Modal from '../../components/layout/StoreOwner/Modal';
import KPICard from '../../components/layout/StoreOwner/KPICard';

const assignedOrders = [
  {
    id: 'ORD-000L22CMIS',
    orderNumber: '#12345',
    customer: {
      name: 'Alice Johnson',
      phone: '+1 234-567-8901',
      address: '123 Main St, City, State 12345'
    },
    assignedStaff: {
      id: 1,
      name: 'John Driver',
      phone: '+1 234-567-8900',
      zone: 'North Zone',
      avatar: null
    },
    status: 'out-for-delivery',
    total: 45.99,
    orderDate: '2024-01-15 10:30 AM',
    assignedDate: '2024-01-15 11:00 AM'
  },
  {
    id: 'ORD-000L22CMIT',
    orderNumber: '#12346',
    customer: {
      name: 'Bob Smith',
      phone: '+1 234-567-8902',
      address: '456 Oak Ave, City, State 12346'
    },
    assignedStaff: {
      id: 2,
      name: 'Sarah Express',
      phone: '+1 234-567-8901',
      zone: 'South Zone',
      avatar: null
    },
    status: 'out-for-delivery',
    total: 67.50,
    orderDate: '2024-01-15 10:25 AM',
    assignedDate: '2024-01-15 11:15 AM'
  },
  {
    id: 'ORD-000L22CMIU',
    orderNumber: '#12347',
    customer: {
      name: 'Carol Davis',
      phone: '+1 234-567-8903',
      address: '789 Pine St, City, State 12347'
    },
    assignedStaff: {
      id: 1,
      name: 'John Driver',
      phone: '+1 234-567-8900',
      zone: 'North Zone',
      avatar: null
    },
    status: 'delivered',
    total: 23.75,
    orderDate: '2024-01-15 10:20 AM',
    assignedDate: '2024-01-15 10:50 AM'
  },
  {
    id: 'ORD-000L22CMIV',
    orderNumber: '#12348',
    customer: {
      name: 'David Wilson',
      phone: '+1 234-567-8904',
      address: '321 Elm Dr, City, State 12348'
    },
    assignedStaff: {
      id: 3,
      name: 'Mike Quick',
      phone: '+1 234-567-8902',
      zone: 'East Zone',
      avatar: null
    },
    status: 'delivered',
    total: 89.25,
    orderDate: '2024-01-15 10:15 AM',
    assignedDate: '2024-01-15 10:45 AM'
  }
];

const deliveryStaff = [
  { id: 1, name: 'John Driver', phone: '+1 234-567-8900', zone: 'North Zone', activeDeliveries: 2, status: 'available' },
  { id: 2, name: 'Sarah Express', phone: '+1 234-567-8901', zone: 'South Zone', activeDeliveries: 1, status: 'available' },
  { id: 3, name: 'Mike Quick', phone: '+1 234-567-8902', zone: 'East Zone', activeDeliveries: 0, status: 'available' },
  { id: 4, name: 'Lisa Swift', phone: '+1 234-567-8903', zone: 'West Zone', activeDeliveries: 3, status: 'busy' },
];

const AssignedOrders = () => {
  const [staffFilter, setStaffFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showUnassignModal, setShowUnassignModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);

  const filteredOrders = assignedOrders.filter(order => {
    const matchesStaff = staffFilter === 'all' || order.assignedStaff.id.toString() === staffFilter;
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    // Add date filtering logic here
    return matchesStaff && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const totalAssigned = assignedOrders.length;
  const outForDelivery = assignedOrders.filter(o => o.status === 'out-for-delivery').length;
  const delivered = assignedOrders.filter(o => o.status === 'delivered').length;
  const activeStaff = deliveryStaff.filter(s => s.status === 'available').length;

  const handleReassign = (order) => {
    setSelectedOrder(order);
    setShowReassignModal(true);
  };

  const handleUnassign = (order) => {
    setSelectedOrder(order);
    setShowUnassignModal(true);
  };

  const reassignStaff = (staffId) => {
    const staff = deliveryStaff.find(s => s.id === staffId);
    console.log(`Reassigning order ${selectedOrder?.id} to staff ${staff?.name}`);
    setShowReassignModal(false);
    setSelectedOrder(null);
  };

  const confirmUnassign = () => {
    console.log(`Unassigning staff from order ${selectedOrder?.id}`);
    setShowUnassignModal(false);
    setSelectedOrder(null);
  };

  const callCustomer = (phone) => {
    window.open(`tel:${phone}`);
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
              <Truck className="h-8 w-8 text-white" />
            </div>
            Assigned Orders
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            All orders currently assigned to delivery staff
          </motion.p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Assigned"
          value={totalAssigned}
          change="Active assignments"
          changeType="positive"
          icon={Package}
          color="bg-fresh-green"
        />
        <KPICard
          title="Out for Delivery"
          value={outForDelivery}
          change="In progress"
          changeType="neutral"
          icon={Truck}
          color="bg-grocery-orange"
        />
        <KPICard
          title="Delivered Today"
          value={delivered}
          change="Completed"
          changeType="positive"
          icon={Package}
          color="bg-grocery-yellow"
        />
        <KPICard
          title="Active Staff"
          value={activeStaff}
          change="Available now"
          changeType="positive"
          icon={User}
          color="bg-purple-500"
        />
      </div>

      {/* Filters */}
      <Card className="p-6 grocery-pattern">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={staffFilter}
            onChange={(e) => setStaffFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="all">All Delivery Staff</option>
            {deliveryStaff.map(staff => (
              <option key={staff.id} value={staff.id}>{staff.name}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="all">All Status</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="custom">Custom Range</option>
          </select>
          <Button variant="secondary" className="justify-center">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Assigned Orders Grid */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-fresh-green">
            Assigned Orders ({filteredOrders.length})
          </h3>
          <div className="flex space-x-2">
            <Badge variant="warning">Out for Delivery: {outForDelivery}</Badge>
            <Badge variant="success">Delivered: {delivered}</Badge>
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
                className="bg-gradient-to-r from-white to-fresh-green/5 rounded-2xl border-2 border-gray-200 p-6 hover:shadow-fresh hover:border-fresh-green/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Order Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-fresh-green">{order.orderNumber}</h4>
                      <p className="text-sm text-gray-600">{order.orderDate}</p>
                    </div>
                    <Badge variant={order.status}>{order.status}</Badge>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{order.customer.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => callCustomer(order.customer.phone)}
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <span className="text-sm text-gray-600 flex-1">{order.customer.address}</span>
                    </div>
                  </div>

                  {/* Assigned Staff */}
                  <div className="p-3 bg-fresh-green/10 rounded-2xl border border-fresh-green/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-xl flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{order.assignedStaff.name}</p>
                        <p className="text-xs text-gray-600">{order.assignedStaff.phone} • {order.assignedStaff.zone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Amount */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-fresh-green">${order.total}</span>
                    <span className="text-sm text-gray-600">Total Amount</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200">
                    <Link to={`/owner/orders/${order.orderNumber.replace('#', '')}`} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReassign(order)}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUnassign(order)}
                    >
                      <UserX className="h-4 w-4 text-red-600" />
                    </Button>
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
                <Truck className="h-16 w-16 text-fresh-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assigned Orders</h3>
              <p className="text-gray-500 mb-6">No orders are currently assigned to delivery staff</p>
              <Link to="/owner/orders">
                <Button>
                  <Package className="h-4 w-4 mr-2" />
                  View All Orders
                </Button>
              </Link>
            </motion.div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + ordersPerPage, filteredOrders.length)} of {filteredOrders.length} orders
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Reassign Staff Modal */}
      <Modal
        isOpen={showReassignModal}
        onClose={() => setShowReassignModal(false)}
        title="Reassign Delivery Staff"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="p-4 bg-fresh-green/10 rounded-2xl">
              <h4 className="font-semibold text-fresh-green mb-2">Order Details</h4>
              <p className="text-sm text-gray-700">
                {selectedOrder.id} • {selectedOrder.customer.name} • ${selectedOrder.total}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Currently assigned to: {selectedOrder.assignedStaff.name}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Available Delivery Staff</h4>
              <div className="space-y-3">
                {deliveryStaff.filter(s => s.id !== selectedOrder.assignedStaff.id).map((staff) => (
                  <div
                    key={staff.id}
                    className={`p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${
                      staff.status === 'available'
                        ? 'border-fresh-green/30 bg-fresh-green/5 hover:bg-fresh-green/10'
                        : 'border-gray-200 bg-gray-50 opacity-50'
                    }`}
                    onClick={() => staff.status === 'available' && reassignStaff(staff.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{staff.name}</p>
                          <p className="text-sm text-gray-600">{staff.phone}</p>
                          <p className="text-sm text-fresh-green">{staff.zone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={staff.status === 'available' ? 'success' : 'warning'}
                        >
                          {staff.status}
                        </Badge>
                        <p className="text-xs text-gray-600 mt-1">
                          {staff.activeDeliveries} active deliveries
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button variant="secondary" onClick={() => setShowReassignModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Unassign Confirmation Modal */}
      <Modal
        isOpen={showUnassignModal}
        onClose={() => setShowUnassignModal(false)}
        title="Unassign Delivery Staff"
        size="md"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to unassign <strong>{selectedOrder.assignedStaff.name}</strong> from order <strong>{selectedOrder.orderNumber}</strong>?
              The order will need to be reassigned to another staff member.
            </p>
            
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-sm text-red-700">
                <strong>Note:</strong> This action will remove the current assignment and the order will appear in the unassigned orders list.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="secondary" onClick={() => setShowUnassignModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmUnassign}>
                <UserX className="h-4 w-4 mr-2" />
                Unassign Staff
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default AssignedOrders;