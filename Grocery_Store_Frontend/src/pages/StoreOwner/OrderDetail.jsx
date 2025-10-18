import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  UserX,
  RotateCcw,
} from "lucide-react";
import Card from "../../components/layout/StoreOwner/Card";
import Badge from "../../components/layout/StoreOwner/Badge";
import Button from "../../components/layout/StoreOwner/Button";
import Modal from "../../components/layout/StoreOwner/Modal";

// Mock order data
const orderDetails = {
  12345: {
    id: "ORD-000L22CMIS",
    customer: {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 234-567-8901",
      address: "123 Main St, City, State 12345",
    },
    status: "processing",
    paymentMethod: "card",
    paymentStatus: "paid",
    orderDate: "2024-01-15 10:30 AM",
    expectedDelivery: "2024-01-16 2:00 PM",
    specialInstructions:
      "Please ring the doorbell twice. Leave at front door if no answer.",
    total: 45.99,
    subtotal: 42.99,
    tax: 3.0,
    deliveryFee: 0.0,
    discount: 0.0,
    assignedStaff: null,
    items: [
      {
        id: 1,
        name: "Organic Bananas",
        quantity: 2,
        price: 4.99,
        subtotal: 9.98,
        image:
          "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=100",
      },
      {
        id: 2,
        name: "Fresh Milk",
        quantity: 1,
        price: 6.5,
        subtotal: 6.5,
        image:
          "https://images.pexels.com/photos/416678/pexels-photo-416678.jpeg?auto=compress&cs=tinysrgb&w=100",
      },
      {
        id: 3,
        name: "Whole Wheat Bread",
        quantity: 1,
        price: 3.99,
        subtotal: 3.99,
        image:
          "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=100",
      },
    ],
    timeline: [
      { status: "Order Placed", date: "2024-01-15 10:30 AM", completed: true },
      { status: "Confirmed", date: "2024-01-15 10:45 AM", completed: true },
      { status: "Packed", date: "2024-01-15 11:30 AM", completed: true },
      { status: "Out for Delivery", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false },
    ],
  },
};

const deliveryStaff = [
  {
    id: 1,
    name: "John Driver",
    phone: "+1 234-567-8900",
    zone: "North Zone",
    activeDeliveries: 2,
    status: "available",
  },
  {
    id: 2,
    name: "Sarah Express",
    phone: "+1 234-567-8901",
    zone: "South Zone",
    activeDeliveries: 1,
    status: "available",
  },
  {
    id: 3,
    name: "Mike Quick",
    phone: "+1 234-567-8902",
    zone: "East Zone",
    activeDeliveries: 0,
    status: "available",
  },
  {
    id: 4,
    name: "Lisa Swift",
    phone: "+1 234-567-8903",
    zone: "West Zone",
    activeDeliveries: 3,
    status: "busy",
  },
];
const statusFlow = {
  pending: { next: "processing", label: "Confirm Order", icon: CheckCircle },
  processing: { next: "packed", label: "Mark as Packed", icon: Package },
  packed: { next: "shipped", label: "Mark as Shipped", icon: Truck },
  shipped: { next: "delivered", label: "Mark as Delivered", icon: CheckCircle },
  delivered: null, // final state
  cancelled: null, // final state
};

const OrderDetail = () => {
  const { id } = useParams();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showUnassignModal, setShowUnassignModal] = useState(false);

  const order = orderDetails[id];
  console.log(id);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Order not found</p>
          <Link to="/owner/orders">
            <Button className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const updateOrderStatus = (newStatus) => {
    console.log(`Updating order ${order.id} to ${newStatus}`);
  };

  const assignStaffToOrder = (staffId) => {
    const staff = deliveryStaff.find((s) => s.id === staffId);
    console.log(`Assigning staff ${staff?.name} to order ${order.id}`);
    setShowAssignModal(false);
  };

  const unassignStaff = () => {
    console.log(`Unassigning staff from order ${order.id}`);
    setShowUnassignModal(false);
  };

  const openInMaps = () => {
    const address = encodeURIComponent(order.customer.address);
    window.open(`https://maps.google.com/?q=${address}`, "_blank");
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
            to="/owner/orders"
            className="p-3 hover:bg-fresh-green/10 rounded-2xl transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-fresh-green" />
          </Link>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-fresh-green"
            >
              {order.id}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600"
            >
              Placed on {order.orderDate}
            </motion.p>
          </div>
        </div>

        {/* Status Update Controls */}
        {/* <div className="flex space-x-2">
          {order.status === "pending" && (
            <Button onClick={() => updateOrderStatus("processing")}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Order
            </Button>
          )}
          {order.status === "processing" && (
            <Button onClick={() => updateOrderStatus("shipped")}>
              <Truck className="h-4 w-4 mr-2" />
              Mark as Shipped
            </Button>
          )}
          {order.status === "shipped" && (
            <Button onClick={() => updateOrderStatus("delivered")}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Delivered
            </Button>
          )}
          <Button
            variant="danger"
            onClick={() => updateOrderStatus("cancelled")}
          >
            Cancel Order
          </Button>
        </div> */}
        <div className="flex space-x-2">
          {/* Next status button */}
          {statusFlow[order.status] && statusFlow[order.status].next && (
            <Button
              onClick={() => updateOrderStatus(statusFlow[order.status].next)}
            >
              {React.createElement(statusFlow[order.status].icon, {
                className: "h-4 w-4 mr-2",
              })}
              {statusFlow[order.status].label}
            </Button>
          )}

          {/* Cancel Order button (always available unless delivered/cancelled) */}
          {order.status !== "delivered" && order.status !== "cancelled" && (
            <Button
              variant="danger"
              onClick={() => updateOrderStatus("cancelled")}
            >
              Cancel Order
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Information */}
          <Card className="p-6 grocery-pattern">
            <h3 className="text-xl font-semibold text-fresh-green mb-6">
              Order Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Order Date & Time</p>
                    <p className="font-semibold text-gray-900">
                      {order.orderDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Payment Info</p>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900 capitalize">
                        {order.paymentMethod}
                      </p>
                      <Badge variant="success">{order.paymentStatus}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Order Status</p>
                    <Badge
                      variant={order.status}
                      className="text-base px-3 py-1"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Customer Details */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-fresh-green mb-6">
              Customer Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Customer Name</p>
                    <p className="font-semibold text-gray-900">
                      {order.customer.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900">
                        {order.customer.phone}
                      </p>
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
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Delivery Address</p>
                    <p className="font-semibold text-gray-900 mb-2">
                      {order.customer.address}
                    </p>
                    <Button variant="ghost" size="sm" onClick={openInMaps}>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open in Maps
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {order.specialInstructions && (
              <div className="mt-6 p-4 bg-grocery-yellow/10 rounded-2xl border border-grocery-yellow/30">
                <p className="text-sm font-medium text-grocery-yellow mb-1">
                  Special Instructions:
                </p>
                <p className="text-gray-700">{order.specialInstructions}</p>
              </div>
            )}
          </Card>

          {/* Ordered Items */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-fresh-green mb-6">
              Ordered Items
            </h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-fresh-green/5 rounded-2xl border border-gray-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-2xl"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-fresh-green font-medium">
                      ${item.price} each
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${item.subtotal.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-fresh-green">
                      -${order.discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-medium">
                    ${order.deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Grand Total:</span>
                  <span className="text-fresh-green">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Delivery Staff Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-fresh-green mb-4">
              🚚 Delivery Assignment
            </h3>

            {order.assignedStaff ? (
              <div className="space-y-4">
                <div className="p-4 bg-fresh-green/10 rounded-2xl border border-fresh-green/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {order.assignedStaff.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.assignedStaff.phone}
                      </p>
                      <p className="text-sm text-fresh-green">
                        {order.assignedStaff.zone}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {order.assignedStaff.activeDeliveries} active deliveries
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowAssignModal(true)}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reassign
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setShowUnassignModal(true)}
                  >
                    <UserX className="h-4 w-4 mr-1" />
                    Unassign
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Truck className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500 mb-4">No delivery staff assigned</p>
                <Button onClick={() => setShowAssignModal(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Assign Delivery Staff
                </Button>
              </div>
            )}
          </Card>

          {/* Order Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-fresh-green mb-4">
              Order Timeline
            </h3>
            <div className="space-y-4">
              {order.timeline.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-fresh-green" : "bg-gray-300"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <Clock className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        step.completed ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.status}
                    </p>
                    <p className="text-sm text-gray-600">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-fresh-green mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="ghost">
                <Phone className="h-4 w-4 mr-2" />
                Call Customer
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Package className="h-4 w-4 mr-2" />
                Print Invoice
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Assign Staff Modal */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title="Assign Delivery Staff"
        size="lg"
      >
        <div className="space-y-6">
          <div className="p-4 bg-fresh-green/10 rounded-2xl">
            <h4 className="font-semibold text-fresh-green mb-2">
              Order Details
            </h4>
            <p className="text-sm text-gray-700">
              {order.id} • {order.customer.name} • ${order.total}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">
              Available Delivery Staff
            </h4>
            <div className="space-y-3">
              {deliveryStaff.map((staff) => (
                <div
                  key={staff.id}
                  className={`p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${
                    staff.status === "available"
                      ? "border-fresh-green/30 bg-fresh-green/5 hover:bg-fresh-green/10"
                      : "border-gray-200 bg-gray-50 opacity-50"
                  }`}
                  onClick={() =>
                    staff.status === "available" && assignStaffToOrder(staff.id)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {staff.name}
                        </p>
                        <p className="text-sm text-gray-600">{staff.phone}</p>
                        <p className="text-sm text-fresh-green">{staff.zone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          staff.status === "available" ? "success" : "warning"
                        }
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
            <Button
              variant="secondary"
              onClick={() => setShowAssignModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Unassign Confirmation Modal */}
      <Modal
        isOpen={showUnassignModal}
        onClose={() => setShowUnassignModal(false)}
        title="Unassign Delivery Staff"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to unassign the delivery staff from this
            order? The order will need to be reassigned to another staff member.
          </p>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowUnassignModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={unassignStaff}>
              <UserX className="h-4 w-4 mr-2" />
              Unassign Staff
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default OrderDetail;
