import React, { use, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Camera,
  Lock,
  MapPin,
  Edit3,
  Save,
  X,
  Shield,
  Star,
  Award,
  Crown,
  Sparkles,
  Heart,
  Settings,
  Bell,
  Eye,
  EyeOff,
  Trash,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useAuthStore((state) => state.user);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://localhost:7188/api/Customer/profile/1"
      );
      setUserInfo(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = async () => {
    setIsEditing(false);
    // Save logic here
    const payLoad = {
      UserName: userInfo.userName,
      Email: userInfo.email,
      Phone: userInfo.phone,
      Password: "String@123",
    };
    try {
      await axios.put(`https://localhost:7188/api/User/${user.id}`, payLoad);
      fetchUserData();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      };

      const response = await axios.put(
        `https://localhost:7188/api/User/change-password/${user.id}`,
        payload
      );

      toast.success(response.data.message);

      // Reset state
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(
        error.response?.data || "Failed to change password. Please try again."
      );
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // store file
      setPreviewImage(URL.createObjectURL(file)); // preview instantly
    }
    e.target.value = null; // reset input
  };

  const handleRemovePhoto = () => {
    if (previewImage || selectedFile) {
      // If new image is selected but not yet saved
      setPreviewImage(null);
      setSelectedFile(null);
      return;
    } else {
      // If no new image selected, remove from backend
      axios
        .put(
          `https://localhost:7188/api/User/update-profileImage/${user.id}?remove=true`
        )
        .then(() => {
          setUserInfo((prev) => ({
            ...prev,
            profileImageUrl: null,
          }));
        })
        .catch((err) => console.error("Error removing profile photo:", err));
    }
  };

  const handleSavePhoto = async () => {
    if (!selectedFile) {
      setIsEditingPhoto(false);
      return;
    }
    const formData = new FormData();
    formData.append("Image", selectedFile);
    try {
      const response = await axios.put(
        `https://localhost:7188/api/User/update-profileImage/${user.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUserInfo((prev) => ({
        ...prev,
        profileImageUrl: response.data.profileImageUrl,
      }));
      setSelectedFile(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error uploading profile image:", error);
    } finally {
      setIsEditingPhoto(false);
    }
  };

  const handleCancelPhotoEdit = () => {
    setIsEditingPhoto(false);
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const stats = [
    {
      icon: Star,
      label: "Total Orders",
      value: userInfo.totalOrders,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Heart,
      label: "Total Spent",
      value: `₹${userInfo.totalSpent}`,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    // { icon: Award, label: 'Loyalty Points', value: userInfo.loyaltyPoints, color: 'text-purple-600', bg: 'bg-purple-50' },
    // { icon: Crown, label: 'Member Since', value: userInfo.memberSince, color: 'text-yellow-600', bg: 'bg-yellow-50' }
  ];
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-green-200/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4">
              <User className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">
                My Profile
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Profile Settings
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Manage your account and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 sticky top-4"
            >
              {/* Avatar Section */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="relative">
                    <img
                      src={
                        previewImage ||
                        userInfo.profileImageUrl ||
                        "https://localhost:7188/uploads/dummy_profileImage.jpg"
                      }
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-green-500"
                    />
                    {/* <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="h-4 w-4 text-white" />
                    </div> */}

                    {/* Photo Edit Icons - Only show when editing photo */}
                    {isEditingPhoto && (
                      <>
                        <button
                          onClick={handleRemovePhoto}
                          className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg"
                          title="Remove Photo"
                        >
                          <Trash className="h-4 w-4" />
                        </button>

                        <label
                          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg"
                          title="Choose New Photo"
                        >
                          <Camera className="h-4 w-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-black text-gray-800 mb-2">
                  {userInfo.userName}
                </h2>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-purple-800">
                      Customer Since : {userInfo.memberSince}
                    </span>
                  </div>
                </div>

                {/* <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">VIP Customer</span>
                </div> */}
              </div>

              {/* Photo Edit Controls */}
              <div className="text-center mb-6">
                {!isEditingPhoto ? (
                  <button
                    onClick={() => setIsEditingPhoto(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Edit Photo</span>
                  </button>
                ) : (
                  <div className="flex space-x-3 justify-center">
                    <button
                      onClick={handleCancelPhotoEdit}
                      className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSavePhoto}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`${stat.bg} rounded-2xl p-4 text-center`}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${stat.color} mx-auto mb-2`}
                      />
                      <div className="text-lg font-black text-gray-800">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              {/* <div className="mt-8 space-y-3">
                <Link
                  to="/profile/addresses"
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-gray-100 hover:to-gray-50 transition-all duration-300 hover:scale-105 border border-gray-200"
                >
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-800">
                    Manage Addresses
                  </span>
                </Link>

                <Link
                  to="/notifications"
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-gray-100 hover:to-gray-50 transition-all duration-300 hover:scale-105 border border-gray-200"
                >
                  <Bell className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-800">
                    Notifications
                  </span>
                </Link>
              </div> */}
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-800 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
                  Personal Information
                </h2>
                <button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                    isEditing
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  }`}
                >
                  {isEditing ? (
                    <Save className="h-4 w-4" />
                  ) : (
                    <Edit3 className="h-4 w-4" />
                  )}
                  <span>{isEditing ? "Save Changes" : "Edit Profile"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userInfo.userName}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, userName: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-semibold">
                      {userInfo.userName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-semibold">
                      {userInfo.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-semibold">
                      {userInfo.phone}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </motion.div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
            >
              <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-green-600" />
                Security Settings
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-6 w-6 text-green-600" />
                    <div>
                      <h3 className="font-bold text-green-800">Password</h3>
                      <p className="text-sm text-green-600">
                        Last changed 3 months ago
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      <AnimatePresence>
        {showPasswordForm && (
          <motion.div
            className="fixed inset-0 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPasswordForm(false)} // click outside closes
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()} // prevent overlay close when clicking inside
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Change Password
                </h3>
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
