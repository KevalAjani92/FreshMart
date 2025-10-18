import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  MapPin,
  Phone,
  Camera,
  CheckCircle,
  Apple,
  Wallet,
  CreditCard,
} from "lucide-react";
import toast from "react-hot-toast";
import { deliveryAPI } from "../../services/deliveryAPI";
import LoadingSpinner from "../../components/layout/delivery/LoadingSpinner";
import { useAuthStore } from "../../store/useAuthStore";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const loadOrder = async () => {
      if (!id) return;

      try {
        const data = await deliveryAPI.getOrderById(user.roleId, id);
        setOrder(data);
      } catch (error) {
        console.error("Failed to load order:", error);
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  const updateOrderStatus = async (newStatus) => {
    if (!order) return;

    try {
      if (newStatus === "shipped") {
        // Normal status update
        await deliveryAPI.updateOrderStatus(order.id, newStatus);
      } else if (newStatus === "delivered") {
        // Special API for delivery complete
        await deliveryAPI.markAsDelivered(order.id);
      }

      setOrder({ ...order, status: newStatus });
      toast.success(`Order marked as ${newStatus.replace("_", " ")}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update order status");
    }
  };

  const handleProofUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast.success("Proof of delivery uploaded successfully");
      updateOrderStatus("delivered");
    }, 2000);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl mx-auto mb-6">
          <Apple className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-green-700 mb-2">
          🛒 Order not found
        </h3>
        <button
          onClick={() => navigate("/delivery/orders")}
          className="text-green-600 hover:text-green-700 font-bold bg-green-100 px-4 py-2 rounded-2xl hover:bg-green-200 transition-all"
        >
          🔙 Back to orders
        </button>
      </div>
    );
  }

  const getNextStatus = () => {
    switch (order.status) {
      case "assigned":
        return "shipped";
      case "shipped":
        return "delivered";
      default:
        return null;
    }
  };

  const getNextStatusLabel = () => {
    const nextStatus = getNextStatus();
    switch (nextStatus) {
      case "shipped":
        return "Mark as Shipped";
      case "delivered":
        return "Mark as Delivered";
      default:
        return "Completed";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/delivery/orders")}
          className="p-3 rounded-2xl hover:bg-green-100 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-green-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-green-700 flex items-center space-x-2">
            {/* <ShoppingCart className="h-8 w-8" /> */}
            <span>🛒 Order #{order.orderNumber}</span>
          </h1>
          <p className="text-green-600 text-lg">
            Fresh grocery delivery details and management
          </p>
        </div>
      </div>

      {/* Progress Stepper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-lg border border-green-100 p-8"
      >
        <h3 className="text-xl font-bold text-green-700 mb-6">
          🚚 Delivery Progress
        </h3>
        <div className="flex items-center justify-around">
          {["assigned", "shipped", "delivered"].map((status, index, arr) => {
            const currentIndex = arr.indexOf(order.status); // current step index
            const isCompleted = index < currentIndex; // past steps
            const isActive = index === currentIndex; // current step

            return (
              <div key={status} className="flex items-center">
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center
              ${
                isActive
                  ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg" // current step
                  : isCompleted
                  ? "bg-green-100 text-green-500 border-2 border-green-400" // past steps (lighter)
                  : "bg-gray-200 text-gray-500" // future steps
              }`}
                >
                  {isCompleted || isActive ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {index < arr.length - 1 && (
                  <div
                    className={`w-16 h-1 rounded-full
                ${
                  index < currentIndex
                    ? "bg-gradient-to-r from-green-400 to-green-500" // completed line
                    : "bg-gray-200"
                }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-around mt-3 text-md text-green-600 font-bold">
          <span
            className={
              order.status === "assigned" ? "text-green-700" : "text-green-400"
            }
          >
            📋 Assigned
          </span>
          <span
            className={
              order.status === "shipped"
                ? "text-green-700"
                : order.status === "delivered"
                ? "text-green-400"
                : "text-gray-400"
            }
          >
            🚚 Shipped
          </span>
          <span
            className={
              order.status === "delivered" ? "text-green-700" : "text-gray-400"
            }
          >
            ✅ Delivered
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-lg border border-green-100 p-6"
          >
            <h3 className="text-xl font-bold text-green-700 mb-4">
              👤 Customer Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-semibold text-green-800 text-lg">
                  {order.customerName}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-green-700 font-medium">
                  {order.customerPhone}
                </span>
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-2xl text-sm hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg font-semibold">
                  📞 Call
                </button>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-2xl text-sm hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg font-semibold">
                  💬 WhatsApp
                </button>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center mt-1">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-green-700 font-medium">
                  {order.address}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg border border-green-100 p-6"
          >
            <h3 className="text-xl font-bold text-green-700 mb-4">
              🛍️ Order Items
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover:from-green-100 hover:to-green-200 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-2xl shadow-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800">
                      {item.name}
                    </h4>
                    <p className="text-green-600 font-medium">
                      🔢 Quantity: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-green-700 text-lg">
                    ₹{item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-700">
                  💰 Total Amount:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Status Actions */}
          <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              🚀 Actions
            </h3>

            {getNextStatus() && (
              <button
                onClick={() => updateOrderStatus(getNextStatus())}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-bold mb-3 transform hover:scale-105 shadow-lg"
              >
                ✅ {getNextStatusLabel()}
              </button>
            )}

            {order.status === "shipped" && (
              <div className="space-y-3">
                <button
                  onClick={handleProofUpload}
                  disabled={uploading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all font-bold flex items-center justify-center space-x-2 disabled:opacity-50 transform hover:scale-105 shadow-lg"
                >
                  <Camera className="h-4 w-4" />
                  <span>
                    {uploading ? "📤 Uploading..." : "📸 Upload Proof"}
                  </span>
                </button>

                {order.otp && (
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-2xl border border-yellow-200">
                    <p className="text-sm text-yellow-700 mb-1 font-semibold">
                      🔐 Customer OTP:
                    </p>
                    <p className="text-2xl font-bold text-yellow-800 tracking-wider">
                      {order.otp}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6">
            <h3 className="text-xl font-bold text-green-700 mb-4">
              💳 Payment Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-green-600 font-medium">
                  Payment Mode:
                </span>
                <span
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${
                    order.paymentStatus === "COD"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.paymentMode === "COD" ? (
                    <>
                      <Wallet className="h-4 w-4" /> Cash On Delivery
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" /> Online
                    </>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600 font-medium">
                  Payment Status:
                </span>
                <span
                  className={`font-medium ${
                    order.paymentStatus === "paid"
                      ? "text-green-700 font-bold"
                      : "text-orange-600 font-bold"
                  }`}
                >
                  {order.paymentStatus === "paid" ? "✅ Paid" : "⏳ Pending"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600 font-medium">SubTotal:</span>
                <span className="font-bold text-green-800 text-lg">
                  ₹{order.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600 font-medium">
                  Delivery Fee:
                </span>
                <span className="font-bold text-green-800">
                  ₹{order.deliveryCharge.toFixed(2)}
                </span>
              </div>
              {/* Final Amount */}
              <div className="flex justify-between border-t pt-2">
                <span className="text-green-700 font-bold text-lg">
                  Final Amount:
                </span>
                <span className="font-bold text-green-900 text-xl">
                  ₹{(order.totalAmount + order.deliveryCharge).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {order.customerRating && (
            <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4">
                ⭐ Customer Feedback
              </h3>
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < order.customerRating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              {order.customerReview && (
                <p className="text-green-700 font-medium bg-green-50 p-3 rounded-2xl italic">
                  "{order.customerReview}"
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
