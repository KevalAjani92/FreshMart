import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  User,
  Phone,
  Mail,
  TrendingUp,
  Clock,
  CheckCircle,
  Edit,
  Trash2,
  Eye,
  Truck,
} from "lucide-react";
import Card from "../../components/layout/StoreOwner/Card";
import KPICard from "../../components/layout/StoreOwner/KPICard";
import Badge from "../../components/layout/StoreOwner/Badge";
import Button from "../../components/layout/StoreOwner/Button";
import Modal from "../../components/layout/StoreOwner/Modal";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  fullName: "",
  phone: "",
  email: "",
  zoneId: 0,
};

const DeliveryStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [zones, setZones] = useState([]);
  const [allStaff, setAllStaff] = useState([]); // ✅ keep full list

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [deliveryStaff, setDeliveryStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ ...initialState });
  

  useEffect(() => {
    // Fetch zones from API
    const fetchZones = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7188/api/Zone/zone-dropDown"
        );
        setZones(response.data);
      } catch (error) {
        console.error("Error fetching zones", error);
        toast.error("Failed to load delivery zones. Please try again.");
      }
    };
    fetchZones();
  }, []);

  

  const fetchStaff = async () => {
    try {
      setLoading(true);

      // fetch full staff list
      const fullResponse = await axios.get(
        `https://localhost:7188/api/DeliveryStaff`
      );
      setAllStaff(fullResponse.data); // ✅ store unfiltered staff

      const response = await axios.get(
        `https://localhost:7188/api/DeliveryStaff`,
        {
          params: {
            search: searchTerm,
            status: statusFilter,
            zone: zoneFilter,
            sort: sort,
          },
        }
      );
      setDeliveryStaff(response.data);
    } catch (error) {
      console.error("Error fetching staff", error);
      toast.error("Failed to load delivery staff. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStaff();
  }, [searchTerm, statusFilter, zoneFilter, sort]);

  const totalStaff = allStaff.length;
  const availableStaff = allStaff.filter(
    (s) => s.status === "available"
  ).length;
  const busyStaff = allStaff.filter((s) => s.status === "busy").length;
  const activeDeliveries = allStaff.reduce(
    (sum, staff) => sum + staff.ordersToday,
    0
  );

  const handleAddStaff = async () => {
    console.log("Adding new staff:", newStaff);
    try {
      if (editingStaff) {
        //Update existing staff
        await axios.put(
          `https://localhost:7188/api/DeliveryStaff/owner/${editingStaff.staffID}`,
          newStaff
        );
        toast.success("Staff details updated successfully!");
      } else {
        //Add new staff
        await axios.post("https://localhost:7188/api/DeliveryStaff", newStaff);
        toast.success("New delivery staff added successfully!");
      }
      //Refresh form
      setNewStaff({ ...initialState });
      setEditingStaff(null);
      setShowAddModal(false);
      fetchStaff();
    } catch (error) {
      console.error("Error adding/updating staff", error);
      toast.error(
        "Failed to add/update staff. Please check the details and try again."
      );
    }
  };

  const handleDeleteStaff = (staff) => {
    setStaffToDelete(staff);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://localhost:7188/api/DeliveryStaff/${staffToDelete.staffID}`
      );
      fetchStaff();
      toast.success("Staff member deleted successfully!");
      setShowDeleteModal(false);
      setStaffToDelete(null);
    } catch (error) {
      console.error("Error deleting staff", error);
      toast.error("Failed to delete staff. Please try again.");
    }
  };

  const handleEditStaff = (staff) => {
    setEditingStaff(staff);
    setNewStaff({
      fullName: staff.userName,
      phone: staff.phone,
      email: staff.email,
      zoneId: staff.zoneId,
    });
    setShowAddModal(true);
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
            Delivery Staff Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Manage your delivery team and track their performance
          </motion.p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          {/* <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button> */}
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Staff"
          value={totalStaff}
          change="+2 this month"
          changeType="positive"
          icon={User}
          color="bg-fresh-green"
        />
        <KPICard
          title="Available Now"
          value={availableStaff}
          change="Ready for orders"
          changeType="positive"
          icon={CheckCircle}
          color="bg-grocery-orange"
        />
        <KPICard
          title="Currently Busy"
          value={busyStaff}
          change="On deliveries"
          changeType="neutral"
          icon={Clock}
          color="bg-grocery-yellow"
        />
        <KPICard
          title="Active Deliveries"
          value={activeDeliveries}
          change="Today's total"
          changeType="positive"
          icon={TrendingUp}
          color="bg-purple-500"
        />
      </div>

      {/* Filters */}
      <Card className="p-6 grocery-pattern">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff..."
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
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="all">All Zones</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.name}>
                {zone.name}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent bg-white/80 hover:bg-white transition-colors"
          >
            <option value="">Sort by</option>
            <option value="HighestRating">Highest Rating</option>
            <option value="MostDeliveries">Most Deliveries</option>
            <option value="MostActiveToday">Most Active Today</option>
          </select>
        </div>
      </Card>

      {/* Staff Cards Grid */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-fresh-green flex items-center gap-2">
            <User className="h-6 w-6" />
            Delivery Staff ({deliveryStaff.length})
          </h3>
          <div className="flex space-x-2">
            <Badge variant="success">Available: {availableStaff}</Badge>
            <Badge variant="warning">Busy: {busyStaff}</Badge>
            <Badge variant="error">
              Offline:{" "}
              {deliveryStaff.filter((s) => s.status === "offline").length}
            </Badge>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin h-10 w-10 border-4 border-fresh-green border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-gray-500">Loading Staffs...</p>
          </div>
        ) : deliveryStaff.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {deliveryStaff.map((staff, index) => (
              <motion.div
                key={staff.staffID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br from-white to-fresh-green/5 rounded-2xl border-2 p-6 hover:shadow-fresh transition-all duration-300 ${
                  staff.status === "available"
                    ? "border-green-200 hover:border-fresh-green/50"
                    : staff.status === "busy"
                    ? "border-yellow-200 hover:border-grocery-yellow/50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="space-y-4">
                  {/* Profile Section */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={staff.profileImage}
                        alt={staff.userName}
                        className="w-16 h-16 rounded-2xl object-cover shadow-fresh border-2 border-white"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                          staff.status === "available"
                            ? "bg-green-500"
                            : staff.status === "busy"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900">
                        {staff.userName}
                      </h4>
                      <p className="text-sm text-fresh-green font-medium">
                        {staff.zoneName}
                      </p>
                      <Badge
                        variant={
                          staff.status === "available"
                            ? "success"
                            : staff.status === "busy"
                            ? "warning"
                            : "error"
                        }
                        className="mt-1"
                      >
                        {staff.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{staff.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{staff.email}</span>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded-2xl border border-gray-200 text-center">
                      <p className="text-2xl font-bold text-fresh-green">
                        {staff.ordersToday}
                      </p>
                      <p className="text-xs text-gray-600">Orders Today</p>
                    </div>
                    <div className="p-3 bg-white rounded-2xl border border-gray-200 text-center">
                      <p className="text-2xl font-bold text-grocery-orange">
                        {staff.totalDeliveriesCompleted}
                      </p>
                      <p className="text-xs text-gray-600">Total Deliveries</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-grocery-yellow/10 to-grocery-orange/10 rounded-2xl">
                    <span className="text-2xl">⭐</span>
                    <span className="text-lg font-bold text-gray-900">
                      {staff.rating}
                    </span>
                    <span className="text-sm text-gray-600">rating</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/owner/delivery-staff/${staff.staffID}`}
                      className="flex-1"
                    >
                      <Button variant="ghost" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditStaff(staff)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteStaff(staff)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
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
                <User className="h-16 w-16 text-fresh-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Staff Members Found
              </h3>
              <p className="text-gray-500 mb-6">
                Start building your delivery team
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Staff Member
              </Button>
            </motion.div>
          </div>
        )}
      </Card>

      {/* Add Staff Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setNewStaff({ ...initialState });
        }}
        title={editingStaff ? "Edit Staff" : "Add New Delivery Staff"}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={newStaff.fullName}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, fullName: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={newStaff.phone}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
                placeholder="+1 234-567-8900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={newStaff.email}
              onChange={(e) =>
                setNewStaff({ ...newStaff, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
              placeholder="email@freshmart.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Zone *
            </label>
            <select
              value={newStaff.zoneId}
              onChange={(e) =>
                setNewStaff({ ...newStaff, zoneId: parseInt(e.target.value) })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
            >
              <option value="">Select Zone</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => {
                setShowAddModal(false);
                setNewStaff({ ...initialState });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddStaff}>
              <Plus className="h-4 w-4 mr-2" />
              {editingStaff ? "Edit Staff Details" : "Add Staff Member"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Staff Member"
        size="md"
      >
        {staffToDelete && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-2xl">
              <img
                src={staffToDelete.profileImage}
                alt={staffToDelete.userName}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {staffToDelete.userName}
                </p>
                <p className="text-sm text-gray-600">
                  {staffToDelete.zoneName}
                </p>
              </div>
            </div>

            <p className="text-gray-600">
              Are you sure you want to delete{" "}
              <strong>{staffToDelete.userName}</strong> from the delivery staff?
              This action cannot be undone and will remove all their data and
              performance history.
            </p>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> Make sure this staff member has no
                pending deliveries before deletion.
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Staff Member
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default DeliveryStaff;
