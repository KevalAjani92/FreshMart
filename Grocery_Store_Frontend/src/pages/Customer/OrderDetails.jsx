import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Download,
  XCircle,
  Star,
  AlertCircle,
  Calendar,
  CreditCard,
  User,
  Sparkles,
  Zap,
  MessageSquare,
  Send,
  Edit3,
  ThumbsUp,
  Award,
  ClipboardCheck,
  Box,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderFeedback, setOrderFeedback] = useState({
    rating: 0,
    comment: "",
    submitted: false,
    submittedData: null,
  });
  const [deliveryFeedback, setDeliveryFeedback] = useState({
    rating: 0,
    comment: "",
    submitted: false,
    submittedData: null,
  });
  const [editingOrderFeedback, setEditingOrderFeedback] = useState(false);
  const [editingDeliveryFeedback, setEditingDeliveryFeedback] = useState(false);

  // Sample order data
  // const [orderDetails] = useState({
  //   id: id || "ORD123456",
  //   date: "2024-01-15",
  //   status: "delivered",
  //   total: 45.99,
  //   subtotal: 38.97,
  //   deliveryFee: 4.99,
  //   discount: 2.03,
  //   estimatedDelivery: "2024-01-17",
  //   trackingNumber: "TRK789012345",
  //   paymentMethod: "Credit Card ending in ****1234",
  //   items: [
  //     {
  //       id: 1,
  //       name: "Organic Bananas",
  //       price: 2.99,
  //       originalPrice: 3.49,
  //       quantity: 3,
  //       image:
  //         "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400",
  //       badge: "Organic",
  //     },
  //     {
  //       id: 2,
  //       name: "Fresh Strawberries",
  //       price: 4.99,
  //       quantity: 2,
  //       image:
  //         "https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=400",
  //       badge: "Fresh",
  //     },
  //     {
  //       id: 3,
  //       name: "Premium Milk",
  //       price: 3.99,
  //       quantity: 1,
  //       image:
  //         "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400",
  //       badge: "Local",
  //     },
  //   ],
  //   deliveryAddress: {
  //     name: "John Doe",
  //     address: "123 Main Street",
  //     apartment: "Apt 4B",
  //     city: "New York",
  //     state: "NY",
  //     zipCode: "10001",
  //     phone: "+1 (555) 123-4567",
  //   },
  //   timeline: [
  //     {
  //       status: "Order Placed",
  //       date: "2024-01-15 10:30 AM",
  //       completed: true,
  //       icon: Package,
  //       description: "Your order has been received and is being processed",
  //     },
  //     {
  //       status: "Order Confirmed",
  //       date: "2024-01-15 11:15 AM",
  //       completed: true,
  //       icon: CheckCircle,
  //       description: "Payment confirmed and order approved",
  //     },
  //     {
  //       status: "Preparing for Shipment",
  //       date: "2024-01-16 09:00 AM",
  //       completed: true,
  //       icon: Package,
  //       description: "Items are being picked and packed",
  //     },
  //     {
  //       status: "Shipped",
  //       date: "2024-01-16 02:30 PM",
  //       completed: true,
  //       icon: Truck,
  //       description: "Package is on its way to you",
  //     },
  //     {
  //       status: "Out for Delivery",
  //       date: "2024-01-17 08:00 AM",
  //       completed: false,
  //       icon: Truck,
  //       description: "Package is out for delivery",
  //     },
  //     {
  //       status: "Delivered",
  //       date: "Expected: 2024-01-17 2:00 PM",
  //       completed: false,
  //       icon: CheckCircle,
  //       description: "Package will be delivered to your address",
  //     },
  //   ],
  // });

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7188/api/Order/customer/${user.roleId}/order/${id}`
      );
      setOrderDetails(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error to fetch order details:", error);
      toast.error("Failed To Fetch Order Details, Try Again!!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const tempTimeline = [
    {
      status: "order placed",
      label: "Order Placed",
      description: "We have received your order and it is being processed.",
      icon: Package,
    },
    {
      status: "confirmed",
      label: "Order Confirmed",
      description: "Your order has been confirmed by the store.",
      icon: ClipboardCheck,
    },
    {
      status: "packed",
      label: "Packed",
      description: "Your items have been packed and are ready for shipment.",
      icon: Box,
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been handed over to the delivery partner.",
      icon: Truck,
    },
    {
      status: "delivered",
      label: "Delivered",
      description: "Your order has been delivered successfully.",
      icon: CheckCircle,
    },
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          label: "Pending",
        };
      case "confirmed":
        return {
          color: "text-purple-600",
          bgColor: "bg-purple-100",
          label: "Confirmed",
        };
      case "packed":
        return {
          color: "text-indigo-600",
          bgColor: "bg-indigo-100",
          label: "Packed",
        };
      case "shipped":
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          label: "Shipped",
        };
      case "delivered":
        return {
          color: "text-green-600",
          bgColor: "bg-green-100",
          label: "Delivered",
        };
      case "cancelled":
        return {
          color: "text-red-600",
          bgColor: "bg-red-100",
          label: "Cancelled",
        };
      default:
        return {
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          label: "Unknown",
        };
    }
  };

  const statusConfig = getStatusConfig(orderDetails.status);
  const canCancel = ["pending", "confirmed"].includes(orderDetails.status);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Organic":
        return "bg-green-100 text-green-800";
      case "Fresh":
        return "bg-blue-100 text-blue-800";
      case "Local":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">Loading order...</div>
    );
  }

  const handleOrderFeedbackSubmit = (e) => {
    e.preventDefault();
    if (orderFeedback.rating === 0) return;

    const submittedData = {
      rating: orderFeedback.rating,
      comment: orderFeedback.comment,
      submittedAt: new Date().toLocaleDateString(),
      type: "Order",
    };

    setOrderFeedback({
      ...orderFeedback,
      submitted: true,
      submittedData,
    });

    // Reset form
    setOrderFeedback((prev) => ({
      ...prev,
      rating: 0,
      comment: "",
    }));
  };

  const handleDeliveryFeedbackSubmit = (e) => {
    e.preventDefault();
    if (deliveryFeedback.rating === 0) return;

    const submittedData = {
      rating: deliveryFeedback.rating,
      comment: deliveryFeedback.comment,
      submittedAt: new Date().toLocaleDateString(),
      type: "Delivery",
    };

    setDeliveryFeedback({
      ...deliveryFeedback,
      submitted: true,
      submittedData,
    });

    // Reset form
    setDeliveryFeedback((prev) => ({
      ...prev,
      rating: 0,
      comment: "",
    }));
  };

  const handleEditOrderFeedback = () => {
    setEditingOrderFeedback(true);
    setOrderFeedback({
      ...orderFeedback,
      rating: orderFeedback.submittedData.rating,
      comment: orderFeedback.submittedData.comment,
    });
  };

  const handleEditDeliveryFeedback = () => {
    setEditingDeliveryFeedback(true);
    setDeliveryFeedback({
      ...deliveryFeedback,
      rating: deliveryFeedback.submittedData.rating,
      comment: deliveryFeedback.submittedData.comment,
    });
  };

  const handleUpdateOrderFeedback = (e) => {
    e.preventDefault();
    if (orderFeedback.rating === 0) return;

    const updatedData = {
      ...orderFeedback.submittedData,
      rating: orderFeedback.rating,
      comment: orderFeedback.comment,
      updatedAt: new Date().toLocaleDateString(),
    };

    setOrderFeedback({
      ...orderFeedback,
      submittedData: updatedData,
    });

    setEditingOrderFeedback(false);
  };

  const handleUpdateDeliveryFeedback = (e) => {
    e.preventDefault();
    if (deliveryFeedback.rating === 0) return;

    const updatedData = {
      ...deliveryFeedback.submittedData,
      rating: deliveryFeedback.rating,
      comment: deliveryFeedback.comment,
      updatedAt: new Date().toLocaleDateString(),
    };

    setDeliveryFeedback({
      ...deliveryFeedback,
      submittedData: updatedData,
    });

    setEditingDeliveryFeedback(false);
  };

  const RatingStars = ({ rating, onRatingChange, readonly = false }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange(star)}
          disabled={readonly}
          className={`transition-all duration-200 ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          }`}
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              star <= rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600 font-medium">
        {rating > 0 && `${rating}/5`}
      </span>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200/20 rounded-full blur-2xl animate-float-slow"></div>
        </div>

        {/* Header */}
        <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to="/my-orders"
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">
                      Order Details
                    </span>
                  </div>
                  <h1 className="text-4xl font-black text-gray-800">
                    Order{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      #{orderDetails.orderNumber}
                    </span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${statusConfig.bgColor}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${statusConfig.color.replace(
                      "text-",
                      "bg-"
                    )} animate-pulse`}
                  ></div>
                  <span className={`font-bold ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
              >
                <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                  <Truck className="h-6 w-6 mr-2 text-blue-600" />
                  Order Timeline
                </h2>

                <div className="space-y-6">
                {orderDetails.timeline.map((step, index) => {
                  const timelineItem = tempTimeline.find(item => item.status === step.status);
                  const IconComponent = timelineItem.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                          step.completed
                            ? "bg-green-600 text-white shadow-lg"
                            : index ===
                              orderDetails.timeline.findIndex(
                                (s) => !s.completed
                              )
                            ? "bg-blue-600 text-white animate-pulse"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <IconComponent className="h-6 w-6" />
                        {step.completed && (
                          <div className="absolute inset-0 bg-green-600 rounded-full animate-pulse opacity-30"></div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3
                            className={`font-bold ${
                              step.completed
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                          >
                            {step.status}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {step.date ? new Date(step.date).toLocaleString("en-IN") : '' }
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

                {orderDetails.trackingNumber && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="h-5 w-5 text-blue-600" />
                      <span className="font-bold text-blue-800">
                        Tracking Number
                      </span>
                    </div>
                    <p className="text-blue-700 font-mono text-lg">
                      {orderDetails.trackingNumber}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Order Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
              >
                <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
                  Order Items
                </h2>

                <div className="space-y-4">
                  {orderDetails.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl shadow-md"
                        />
                        <div
                          className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor(
                            item.badge
                          )}`}
                        >
                          {item.badge}
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg font-black text-green-600">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 text-yellow-400 fill-current"
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            4.8
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">
                          Qty: {item.quantity}
                        </div>
                        <div className="text-lg font-black text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Delivery Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
              >
                <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-green-600" />
                  Delivery Address
                </h2>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white rounded-full p-3 shadow-md">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-green-800 mb-2">
                        {orderDetails.deliveryAddress.name}
                      </h3>
                      <div className="text-green-700 space-y-1">
                        <p>
                          {orderDetails.deliveryAddress.address}{" "}
                          {orderDetails.deliveryAddress.apartment}
                        </p>
                        <p>
                          {orderDetails.deliveryAddress.city},{" "}
                          {orderDetails.deliveryAddress.state}{" "}
                          {orderDetails.deliveryAddress.zipCode}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Phone className="h-4 w-4" />
                          <span>{orderDetails.deliveryAddress.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50 sticky top-4"
              >
                <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ₹{orderDetails.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -₹{orderDetails.discount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      ₹{orderDetails.deliveryFee}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-black">
                      <span>Total</span>
                      <span className="text-green-600">
                        ₹{orderDetails.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        Order Date
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(orderDetails.date).toLocaleDateString("en-IN")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Payment</div>
                      <div className="text-sm text-gray-600">
                        {orderDetails.paymentMethod}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="group relative w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-2xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden flex items-center justify-center space-x-2">
                    <span className="relative z-10 flex items-center space-x-2">
                      <Download className="h-5 w-5" />
                      <span>Download Invoice</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>

                  {canCancel && (
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="group relative w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-2xl font-bold hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden flex items-center justify-center space-x-2"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <XCircle className="h-5 w-5" />
                        <span>Cancel Order</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-200"
              >
                <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Need Help?
                </h3>
                <p className="text-blue-700 mb-4 text-sm">
                  Have questions about your order? Our support team is here to
                  help!
                </p>
                <div className="space-y-2">
                  <Link
                    to="/contact"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact Support</span>
                  </Link>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call: (555) 123-4567</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Feedback Section - Only show for delivered orders */}
          {orderDetails.status === "delivered" && (
            <div className="mt-16 space-y-8 flex flex-col lg:flex-row space-x-5">
              {/* Order Feedback */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl lg:w-1/2 shadow-xl p-8 border border-white/50"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-gray-800 flex items-center">
                    <Award className="h-6 w-6 mr-2 text-orange-600" />
                    Order Feedback
                  </h2>
                  {orderFeedback.submitted && !editingOrderFeedback && (
                    <button
                      onClick={handleEditOrderFeedback}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-semibold hover:bg-blue-200 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                {orderFeedback.submitted && !editingOrderFeedback ? (
                  // Display submitted feedback
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-white rounded-full p-3 shadow-md">
                        <ThumbsUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-green-800">
                          Thank you for your feedback!
                        </h3>
                        <p className="text-sm text-green-600">
                          Submitted on {orderFeedback.submittedData.submittedAt}
                          {orderFeedback.submittedData.updatedAt &&
                            ` • Updated on ${orderFeedback.submittedData.updatedAt}`}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <RatingStars
                        rating={orderFeedback.submittedData.rating}
                        readonly
                      />
                    </div>
                    {orderFeedback.submittedData.comment && (
                      <div className="bg-white/50 rounded-xl p-4">
                        <p className="text-green-700 italic">
                          "{orderFeedback.submittedData.comment}"
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Feedback form
                  <form
                    onSubmit={
                      editingOrderFeedback
                        ? handleUpdateOrderFeedback
                        : handleOrderFeedbackSubmit
                    }
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
                      <h3 className="text-lg font-bold text-orange-800 mb-4">
                        How was your overall order experience?
                      </h3>
                      <RatingStars
                        rating={orderFeedback.rating}
                        onRatingChange={(rating) =>
                          setOrderFeedback({ ...orderFeedback, rating })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Additional Comments (Optional)
                      </label>
                      <textarea
                        value={orderFeedback.comment}
                        onChange={(e) =>
                          setOrderFeedback({
                            ...orderFeedback,
                            comment: e.target.value.slice(0, 300),
                          })
                        }
                        placeholder="Tell us about your order experience..."
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 resize-none"
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {orderFeedback.comment.length}/300 characters
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      {editingOrderFeedback && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingOrderFeedback(false);
                            setOrderFeedback((prev) => ({
                              ...prev,
                              rating: 0,
                              comment: "",
                            }));
                          }}
                          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={orderFeedback.rating === 0}
                        className="group relative flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center space-x-2">
                          <Send className="h-5 w-5" />
                          <span>
                            {editingOrderFeedback
                              ? "Update Feedback"
                              : "Submit Order Feedback"}
                          </span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Delivery Feedback */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl lg:w-1/2 shadow-xl p-8 border border-white/50"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-gray-800 flex items-center">
                    <Truck className="h-6 w-6 mr-2 text-blue-600" />
                    Delivery Feedback
                  </h2>
                  {deliveryFeedback.submitted && !editingDeliveryFeedback && (
                    <button
                      onClick={handleEditDeliveryFeedback}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-semibold hover:bg-blue-200 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                {deliveryFeedback.submitted && !editingDeliveryFeedback ? (
                  // Display submitted feedback
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-white rounded-full p-3 shadow-md">
                        <ThumbsUp className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-800">
                          Thank you for rating our delivery!
                        </h3>
                        <p className="text-sm text-blue-600">
                          Submitted on{" "}
                          {deliveryFeedback.submittedData.submittedAt}
                          {deliveryFeedback.submittedData.updatedAt &&
                            ` • Updated on ${deliveryFeedback.submittedData.updatedAt}`}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <RatingStars
                        rating={deliveryFeedback.submittedData.rating}
                        readonly
                      />
                    </div>
                    {deliveryFeedback.submittedData.comment && (
                      <div className="bg-white/50 rounded-xl p-4">
                        <p className="text-blue-700 italic">
                          "{deliveryFeedback.submittedData.comment}"
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Feedback form
                  <form
                    onSubmit={
                      editingDeliveryFeedback
                        ? handleUpdateDeliveryFeedback
                        : handleDeliveryFeedbackSubmit
                    }
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                      <h3 className="text-lg font-bold text-blue-800 mb-4">
                        How was your delivery experience?
                      </h3>
                      <RatingStars
                        rating={deliveryFeedback.rating}
                        onRatingChange={(rating) =>
                          setDeliveryFeedback({ ...deliveryFeedback, rating })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Delivery Comments (Optional)
                      </label>
                      <textarea
                        value={deliveryFeedback.comment}
                        onChange={(e) =>
                          setDeliveryFeedback({
                            ...deliveryFeedback,
                            comment: e.target.value.slice(0, 300),
                          })
                        }
                        placeholder="Tell us about your delivery experience, delivery staff behavior, packaging, etc..."
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {deliveryFeedback.comment.length}/300 characters
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      {editingDeliveryFeedback && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingDeliveryFeedback(false);
                            setDeliveryFeedback((prev) => ({
                              ...prev,
                              rating: 0,
                              comment: "",
                            }));
                          }}
                          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={deliveryFeedback.rating === 0}
                        className="group relative flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 flex items-center space-x-2">
                          <Send className="h-5 w-5" />
                          <span>
                            {editingDeliveryFeedback
                              ? "Update Feedback"
                              : "Submit Delivery Feedback"}
                          </span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </div>

        {/* Cancel Order Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Cancel Order?
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to cancel this order? This action cannot
                  be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={() => {
                      // Handle cancel order logic here
                      setShowCancelModal(false);
                    }}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
