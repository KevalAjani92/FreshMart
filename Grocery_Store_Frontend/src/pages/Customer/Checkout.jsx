import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  CreditCard,
  Shield,
  Truck,
  Clock,
  Tag,
  CheckCircle,
  ArrowRight,
  User,
  Phone,
  Mail,
  Home,
  Sparkles,
  Zap,
  Gift,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import useCartStore from "../../store/cartStore";

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const user = useAuthStore((state) => state.user);
  const { fetchCartItemCount } = useCartStore((state) => state);
  const [formData, setFormData] = useState({
    // Payment
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Delivery
    deliveryOption: "standard",
    deliveryInstructions: "",
  });

  const [address, setAddress] = useState({
    address: null,
    city: null,
    state: null,
    pinCode: null,
  });
  const [customer, setCustomer] = useState({});

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState({
    code: "FRESH20",
    discount: 0.2,
    type: "percentage",
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7188/api/Cart/GetCartItemsByUser?customerID=" +
          user.roleId
      );
      setCartItems(response.data.items);
      // console.log("Cart items fetched:", response.data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const fetchCustomer = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7188/api/Customer/" + user.roleId
      );
      setCustomer(response.data);
      setAddress({
        address: response.data.address,
        city: response.data.city,
        state: response.data.state,
        pinCode: response.data.pinCode,
      });
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };
  useEffect(() => {
    fetchCartItems();
    fetchCustomer();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const promoDiscount = appliedPromo ? 0 : 0;
  const deliveryFee = formData.deliveryOption === "express" ? 40 : 20;
  const total = subtotal - promoDiscount + deliveryFee;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name.trim()]: value, 
    });
  };

  const handleSaveAddress = async () => {
    try {
      console.log(address);
      
      await axios.put(
        "https://localhost:7188/api/Customer/" + user.roleId,
        address
      );
      toast.success("Address updated successfully!");
      setIsEditingAddress(false);
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address.");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const payLoad = {
        customerID: user.roleId,
        paymentMode: "COD",
        orderItems: cartItems.map((item) => ({
          productID: item.productID,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      };

      const res = await axios.post(
        "https://localhost:7188/api/Order/Place_New_Order",
        payLoad,
        { withCredentials: true }
      );

      toast.success("Order placed successfully!");
      console.log("Order response:", res.data);
      fetchCartItemCount(user.roleId);
      navigate(`/customer/order-confirmation/${res.data.response.orderId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order!");
    }
  };

  const steps = [
    { id: 1, title: "Delivery", icon: MapPin },
    { id: 2, title: "Payment", icon: CreditCard },
    { id: 3, title: "Review", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-4">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">
                Secure Checkout
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Checkout
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Complete your order securely
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-600 text-white"
                        : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                    {isCompleted && (
                      <div className="absolute inset-0 bg-green-600 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span
                    className={`ml-3 font-semibold ${
                      isActive
                        ? "text-blue-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-4 rounded-full ${
                        isCompleted ? "bg-green-600" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
            >
              {/* Step 1: Delivery Address */}
              {currentStep === 1 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-gray-800 flex items-center">
                      <MapPin className="h-6 w-6 mr-2 text-green-600" />
                      Delivery Address
                    </h2>
                    <button
                      onClick={() => setIsEditingAddress(!isEditingAddress)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        isEditingAddress
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      }`}
                    >
                      {isEditingAddress ? "Cancel Edit" : "Edit Address"}
                    </button>
                  </div>

                  {!isEditingAddress ? (
                    // Display Mode
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-green-700 mb-1">
                            Full Name
                          </label>
                          <p className="text-green-800 font-semibold">
                            {customer.userName}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-green-700 mb-1">
                            Email
                          </label>
                          <p className="text-green-800 font-semibold">
                            {customer.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-green-700 mb-1">
                            Phone
                          </label>
                          <p className="text-green-800 font-semibold">
                            +91 {customer.phone}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-green-700 mb-1">
                            Address
                          </label>
                          <p className="text-green-800 font-semibold">
                            {address.address}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-green-700 mb-1">
                            City, State
                          </label>
                          <p className="text-green-800 font-semibold">
                            {address.city}, {address.state} {address.pinCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Edit Mode
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          <Home className="h-4 w-4 inline mr-1" />
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={address.address}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          State
                        </label>
                        <select
                          name="state"
                          value={address.state || ""}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                        >
                          <option value="" disabled>
                            Select State
                          </option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="NY">New York</option>
                          <option value="CA">California</option>
                          <option value="TX">Texas</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={address.city}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          name="pinCode"
                          value={address.pinCode || ""}
                          onChange={handleAddressChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                        />
                      </div>
                    </div>
                  )}

                  {/* Save Address Button (only in edit mode) */}
                  {isEditingAddress && (
                    <div className="mb-6">
                      <button
                        onClick={handleSaveAddress}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                      >
                        Save Address
                      </button>
                    </div>
                  )}

                  {/* Delivery Options */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-blue-600" />
                      Delivery Options
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-300 transition-colors">
                        <input
                          type="radio"
                          name="deliveryOption"
                          value="standard"
                          checked={formData.deliveryOption === "standard"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-semibold">Standard Delivery</div>
                          <div className="text-sm text-gray-600">
                            2-3 business days 
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {/* {subtotal > 50 ? "FREE" : "$4.99"} */}
                            ₹20
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-300 transition-colors">
                        <input
                          type="radio"
                          name="deliveryOption"
                          value="express"
                          checked={formData.deliveryOption === "express"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-semibold">Express Delivery</div>
                          <div className="text-sm text-gray-600">
                            Same day delivery • Order before 2 PM
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">₹40</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                    <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
                    Payment Method
                  </h2>

                  <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="font-semibold">Credit/Debit Card</span>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-300 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <Truck className="h-5 w-5 mr-2 text-green-600" />
                      <div className="flex-1">
                        <span className="font-semibold">Cash on Delivery</span>
                        <div className="text-sm text-gray-600">
                          Pay when your order arrives
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                        No Extra Fee
                      </div>
                    </label>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                    Review Your Order
                  </h2>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.cartItemsID}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address */}
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-bold text-blue-800 mb-2">
                      Delivery Address
                    </h3>
                    <p className="text-blue-700">
                      {customer.userName}
                      <br />
                      {address.address}
                      <br />
                      {address.city}, {address.state} {address.pinCode}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6 p-4 bg-purple-50 rounded-xl">
                    <h3 className="font-bold text-purple-800 mb-2">
                      Payment Method
                    </h3>
                    <p className="text-purple-700">
                      {formData.paymentMethod === "card"
                        ? "Credit Card ending in ****"
                        : "Cash on Delivery"}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                  >
                    <span>Place Order</span>
                    <CheckCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/50 sticky top-4">
              <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.cartItemsID} className="flex justify-between">
                    <span className="text-gray-600">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span className="font-semibold">
                      -₹{promoDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-black">
                    <span>Total</span>
                    <span className="text-green-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800">
                      Secure Checkout
                    </div>
                    <div className="text-sm text-green-600">
                      SSL encrypted & protected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
