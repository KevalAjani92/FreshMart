import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  Truck,
  Clock,
  MapPin,
  ArrowRight,
  Download,
  Star,
  Gift,
  Sparkles,
  Heart,
  Zap,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    items: [],
    customer: {},
  });
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7188/api/Order/confirmation/${orderId}`
      );
      // console.log("Order Details:", response.data);
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const downloadInvoice = async (orderId) => {
    navigate(`/invoice/download/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl animate-float-slow"></div>

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-2xl"
          >
            <CheckCircle className="h-12 w-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-6xl font-black text-gray-800 mb-4"
          >
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Order Confirmed!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl text-gray-600 mb-2"
          >
            Thank you for your order! 🎉
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full"
          >
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-bold text-blue-800">
              Order-Number : {orderDetails.orderNumber}
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
            >
              <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
                Order Summary
              </h2>

              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <motion.div
                    key={item.productID}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-green-600">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-2xl font-black">
                  <span>Total Paid</span>
                  <span className="text-green-600">
                    ₹{orderDetails.finalAmount}
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="text-sm text-red-400">
                    (including Delivery Charges.)
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
            >
              <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                <Truck className="h-6 w-6 mr-2 text-blue-600" />
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <span className="font-bold text-blue-800">
                      Estimated Delivery
                    </span>
                  </div>
                  <p className="text-xl font-black text-blue-700">
                    {orderDetails.estimatedDeliveryDate ? new Date(orderDetails.estimatedDeliveryDate).toDateString() :
                      "Will Be Updated Shortly"}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <MapPin className="h-6 w-6 text-green-600" />
                    <span className="font-bold text-green-800">
                      Delivery Address
                    </span>
                  </div>
                  <div className="text-green-700">
                    <p className="font-semibold">
                      {orderDetails.customer.userName}
                    </p>
                    <p>{orderDetails.customer.address}</p>
                    <p>
                      {orderDetails.customer.city} ,{" "}
                      {orderDetails.customer.state} ,{" "}
                      {orderDetails.customer.pinCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Tracking */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Order Status
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
                    <span className="font-semibold text-green-600">
                      {orderDetails.status}
                    </span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full">
                    <div className="h-1 bg-green-500 rounded-full w-1/4 animate-pulse"></div>
                  </div>
                  <span className="text-gray-500">Preparing</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Cards */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50"
            >
              <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                Quick Actions
              </h2>

              <div className="space-y-4">
                <Link
                  to={`/customer/order/${orderId}`}
                  className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden flex items-center justify-center space-x-2"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Track Order</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>

                <button
                  onClick={() => downloadInvoice(orderId)}
                  className="group relative w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-2xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden flex items-center justify-center space-x-2"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download Invoice</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>

                <Link
                  to="/customer/products"
                  className="group relative w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden flex items-center justify-center space-x-2"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <ArrowRight className="h-5 w-5" />
                    <span>Continue Shopping</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </div>
            </motion.div>

            {/* Special Offer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl shadow-xl p-6 text-white relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <Gift className="h-6 w-6" />
                  <span className="font-bold">Special Offer!</span>
                </div>
                <h3 className="text-xl font-black mb-2">
                  Get 15% off your next order
                </h3>
                <p className="text-orange-100 mb-4 text-sm">
                  Use code:{" "}
                  <span className="font-mono bg-white/20 px-2 py-1 rounded">
                    NEXT15
                  </span>
                </p>
                <button className="bg-white text-orange-600 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-colors text-sm">
                  Save Code
                </button>
              </div>
            </motion.div>

            {/* Customer Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Need Help?
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Our customer support team is here to help with any questions
                about your order.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                <span>Contact Support</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="text-center mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200"
        >
          <h2 className="text-3xl font-black text-gray-800 mb-4">
            Thank you for choosing FreshMart! 🌟
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering the freshest groceries right to your
            doorstep. Your satisfaction is our priority, and we can't wait to
            serve you again!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
