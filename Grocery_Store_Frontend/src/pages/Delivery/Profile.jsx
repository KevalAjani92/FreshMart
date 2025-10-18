import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Truck,
  Shield,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import { useApp } from "../../context/AppContext";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";

const Profile = () => {
  const { profile,updateProfile, toggleAvailability } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleType: "",
    licenseNumber: "",
    vehicleNumber: "",
  });
  // console.log(profile);

  const handleSaveProfile = async () => {
    try {
      // updateProfile(editForm);
      console.log(editForm);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      await axios.put(
        `https://localhost:7188/api/DeliveryStaff/${user.roleId}`,
        editForm
      );
      updateProfile(editForm);
      setIsEditModalOpen(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    if (profile) {
      setEditForm({
        fullName: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        vehicleType: profile.vehicleType || "",
        licenseNumber: profile.licenseNumber || "",
        vehicleNumber: profile.vehicleNumber || "",
      });
    }
  }, [profile]); // ✅ runs when profile is fetched

  const handleAvailabilityToggle = async () => {
    try {
      await toggleAvailability();
      toast.success(`You are now ${profile?.isOnline ? "offline" : "online"}`);
    } catch (error) {
      console.error("Failed to toggle availability:", error);
      toast.error("Failed to update availability");
    }
  };

  if (!profile) {
    return <div className="text-center py-12">Loading profile...</div>;
  }

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-6"
      >
        <h1 className="text-3xl font-bold text-green-700 flex items-center space-x-2">
          {/* <User className="h-8 w-8" /> */}
          <span>👤 Profile & Settings</span>
        </h1>
        <p className="text-green-600 mt-1 text-lg">
          Manage your personal information and delivery preferences
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-lg border border-green-100 p-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-xl font-bold text-green-700">
            👤 Personal Information
          </h3>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg font-semibold"
          >
            {/* <Edit className="h-4 w-4" /> */}
            <span>✏️ Edit</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-3xl object-cover border-4 border-green-200 shadow-lg"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                profile.isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-green-800">
              {profile.name}
            </h2>
            <p className="text-green-600 font-medium">{profile.email}</p>
            <p className="text-sm text-green-500 font-medium">
              🗓️ Joined{" "}
              {new Date(profile.joiningDate).toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-500 font-semibold">
                  👤 Full Name
                </p>
                <p className="font-bold text-green-800">{profile.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-500 font-semibold">📧 Email</p>
                <p className="font-bold text-green-800">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-500 font-semibold">📞 Phone</p>
                <p className="font-bold text-green-800">{profile.phone}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                <Truck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-500 font-semibold">
                  🚚 Vehicle Type
                </p>
                <p className="font-bold text-green-800">
                  {profile.vehicleType || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-500 font-semibold">
                  🆔 License Number
                </p>
                <p className="font-bold text-green-800">
                  {profile.licenseNumber || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-500 font-semibold">
                  🚚 Vehicle Number
                </p>
                <p className="font-bold text-green-800">
                  {profile.vehicleNumber || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Availability Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 mt-6"
      >
        <h3 className="text-xl font-bold text-green-700 mb-4">
          🚚 Availability Settings
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-green-800 text-lg">🟢 Online Status</p>
            <p className="text-sm text-green-600 font-medium">
              Toggle your availability to receive new fresh grocery delivery
              assignments
            </p>
          </div>
          <button
            onClick={handleAvailabilityToggle}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all shadow-lg ${
              profile.isOnline
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${
                profile.isOnline ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </motion.div>

      {/* Edit Profile Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/25" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-3xl shadow-2xl border border-green-100">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-xl font-bold text-green-700">
                  ✏️ Edit Profile
                </Dialog.Title>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 rounded-2xl hover:bg-green-100 transition-colors"
                >
                  <X className="h-5 w-5 text-green-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-green-700 mb-2">
                    👤 Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    required
                    onChange={(e) =>
                      setEditForm({ ...editForm, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-green-700 mb-2">
                    📧 Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    required
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-green-700 mb-2">
                    📞 Phone
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    required
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-green-700 mb-2">
                    🚚 Vehicle Type
                  </label>
                  <select
                    value={editForm.vehicleType}
                    onChange={(e) =>
                      setEditForm({ ...editForm, vehicleType: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                  >
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-green-700 mb-2">
                    🚚 Vehicle Number
                  </label>
                  <input
                    type="text"
                    value={editForm.vehicleNumber}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        vehicleNumber: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-green-700 mb-2">
                    🆔 License Number
                  </label>
                  <input
                    type="text"
                    value={editForm.licenseNumber}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        licenseNumber: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-green-300 text-green-700 rounded-2xl hover:bg-green-50 transition-colors font-semibold"
                >
                  ❌ Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg font-semibold"
                >
                  {/* <Save className="h-4 w-4" /> */}
                  <span>💾 Save Changes</span>
                </button>
              </div>
            </motion.div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Profile;
