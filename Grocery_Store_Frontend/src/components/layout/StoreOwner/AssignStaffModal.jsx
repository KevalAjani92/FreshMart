import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, User, Phone, MapPin, UserPlus } from "lucide-react";
import Modal from "./Modal";
import Badge from "./Badge";
import Button from "./Button";
import axios from "axios";

// const deliveryStaff = [
//   {
//     id: 1,
//     name: 'John Driver',
//     phone: '+1 234-567-8900',
//     email: 'john@example.com',
//     zone: 'North Zone',
//     activeDeliveries: 2,
//     status: 'available',
//     rating: 4.8,
//     avatar: null
//   },
//   {
//     id: 2,
//     name: 'Sarah Express',
//     phone: '+1 234-567-8901',
//     email: 'sarah@example.com',
//     zone: 'South Zone',
//     activeDeliveries: 1,
//     status: 'available',
//     rating: 4.9,
//     avatar: null
//   },
//   {
//     id: 3,
//     name: 'Mike Quick',
//     phone: '+1 234-567-8902',
//     email: 'mike@example.com',
//     zone: 'East Zone',
//     activeDeliveries: 0,
//     status: 'available',
//     rating: 4.6,
//     avatar: null
//   },
//   {
//     id: 4,
//     name: 'Lisa Swift',
//     phone: '+1 234-567-8903',
//     email: 'lisa@example.com',
//     zone: 'West Zone',
//     activeDeliveries: 3,
//     status: 'busy',
//     rating: 4.7,
//     avatar: null
//   },
//   {
//     id: 5,
//     name: 'Tom Speedy',
//     phone: '+1 234-567-8904',
//     email: 'tom@example.com',
//     zone: 'Central Zone',
//     activeDeliveries: 0,
//     status: 'offline',
//     rating: 4.5,
//     avatar: null
//   }
// ];

const AssignStaffModal = ({
  isOpen,
  onClose,
  order,
  onStaffAssigned,
  deliveryStaff,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  //   console.log(deliveryStaff);

  // Loading state check
  if (isLoading) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Assign Delivery Staff"
        size="xl"
      >
        <div className="text-center py-12">
          <p className="text-gray-500">Loading delivery staff...</p>
        </div>
      </Modal>
    );
  }
  if (deliveryStaff?.length === 0) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Assign Delivery Staff"
        size="xl"
      >
        <div className="text-center py-12">
          <p className="text-gray-500">No delivery staff available.</p>
        </div>
      </Modal>
    );
  }

  const filteredStaff = (deliveryStaff || []).filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableStaff = filteredStaff.filter(
    (staff) => staff.status === "available"
  );
  const busyStaff = filteredStaff.filter((staff) => staff.status === "busy");
  const offlineStaff = filteredStaff.filter(
    (staff) => staff.status === "unavailable"
  );

  const handleAssign = () => {
    console.log(selectedStaff);
    
    if (selectedStaff) {
      onStaffAssigned(selectedStaff);
      setSelectedStaff(null);
      setSearchTerm("");
    }
  };

  const handleStaffSelect = (staffId, status) => {
    if (status === "available") {
      setSelectedStaff(staffId);
    }
  };

  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Delivery Staff"
      size="xl"
    >
           
      <div className="space-y-6">
                {/* Order Summary */}       
        <div className="p-4 bg-fresh-green/10 rounded-2xl border border-fresh-green/30">
          <h4 className="font-semibold text-fresh-green mb-2">Order Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-700">
                  <strong>Order:</strong> {order.orderNumber}     
              </p>
              <p className="text-gray-700">
                <strong>Customer:</strong> {order.customer.name}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>Amount:</strong> ${order.total}         
              </p>
              <p className="text-gray-700">
                <strong>Payment:</strong>
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-700 text-sm">
              <strong>Address:</strong> {order.customer.address} 
            </p>
          </div>
        </div>
        {/* Search */}       
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search delivery staff by name or zone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-2xl focus:ring-2 focus:ring-fresh-green focus:border-transparent"
          />
        </div>
        {/* Available Staff */}       
        {availableStaff.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>         
                Available Staff ({availableStaff.length})            
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {availableStaff.map((staff) => (
                <motion.div
                  key={staff.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                    selectedStaff === staff.id
                      ? "border-fresh-green bg-fresh-green/10 shadow-fresh"
                      : "border-gray-200 bg-white hover:border-fresh-green/50 hover:bg-fresh-green/5"
                  }`}
                  onClick={() => handleStaffSelect(staff.id, staff.status)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />                 
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {staff.name}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />                         
                          <span>{staff.phone}</span>                       
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-fresh-green">
                          <MapPin className="h-3 w-3" />                       
                            <span>{staff.zone}</span>                       
                        </div>
                      </div>
                                         
                    </div>
                                       
                    <div className="text-right">
                                           
                      <Badge variant="success">Available</Badge>               
                           
                      <p className="text-xs text-gray-600 mt-1">
                                                ⭐ {staff.rating} rating        
                                     
                      </p>
                                           
                      <p className="text-xs text-gray-600">
                                                {staff.activeDeliveries} active
                        deliveries                      
                      </p>
                                         
                    </div>
                                     
                  </div>
                                 
                </motion.div>
              ))}
                         
            </div>
                     
          </div>
        )}
                {/* Busy Staff */}       
        {busyStaff.length > 0 && (
          <div>
                       
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                           
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>       
                    Busy Staff ({busyStaff.length})            
            </h4>
                       
            <div className="space-y-3 max-h-40 overflow-y-auto">
                           
              {busyStaff.map((staff) => (
                <div
                  key={staff.id}
                  className="p-4 border border-gray-200 rounded-2xl bg-gray-50 opacity-75"
                >
                                   
                  <div className="flex items-center justify-between">
                                       
                    <div className="flex items-center space-x-3">
                                           
                      <div className="w-10 h-10 bg-gray-400 rounded-2xl flex items-center justify-center">
                                               
                        <User className="h-5 w-5 text-white" />                 
                           
                      </div>
                                           
                      <div>
                                               
                        <p className="font-medium text-gray-700">
                          {staff.name}
                        </p>
                                               
                        <p className="text-sm text-gray-600">{staff.zone}</p>   
                                         
                      </div>
                                         
                    </div>
                                       
                    <div className="text-right">
                                           <Badge variant="warning">Busy</Badge>
                                           
                      <p className="text-xs text-gray-600 mt-1">
                                                {staff.activeDeliveries} active
                        deliveries                      
                      </p>
                                         
                    </div>
                                     
                  </div>
                                 
                </div>
              ))}
                         
            </div>
                     
          </div>
        )}
                {/* Offline Staff */}       
        {offlineStaff.length > 0 && (
          <div>
                       
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                           
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>           
                Offline Staff ({offlineStaff.length})            
            </h4>
                       
            <div className="space-y-3 max-h-32 overflow-y-auto">
                           
              {offlineStaff.map((staff) => (
                <div
                  key={staff.id}
                  className="p-3 border border-gray-200 rounded-2xl bg-gray-50 opacity-50"
                >
                                   
                  <div className="flex items-center justify-between">
                                       
                    <div className="flex items-center space-x-3">
                                           
                      <div className="w-8 h-8 bg-gray-400 rounded-xl flex items-center justify-center">
                                               
                        <User className="h-4 w-4 text-white" />                 
                           
                      </div>
                                           
                      <div>
                                               
                        <p className="font-medium text-gray-700">
                          {staff.name}
                        </p>
                                               
                        <p className="text-xs text-gray-600">{staff.zone}</p>   
                                         
                      </div>
                                         
                    </div>
                                        <Badge variant="error">Offline</Badge> 
                                   
                  </div>
                                 
                </div>
              ))}
                         
            </div>
                     
          </div>
        )}
                {/* No Staff Found */}       
        {filteredStaff.length === 0 && (
          <div className="text-center py-8">
                       
            <User className="mx-auto h-12 w-12 text-gray-400 mb-3" />           
            <p className="text-gray-500">
              No delivery staff found matching your search.
            </p>
                     
          </div>
        )}
                {/* Actions */}       
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                   
          <Button variant="secondary" onClick={onClose}>
                        Cancel          
          </Button>
                   
          <Button onClick={handleAssign} disabled={!selectedStaff}>
                        <UserPlus className="h-4 w-4 mr-2" />            Assign
            Selected Staff          
          </Button>
                 
        </div>
             
      </div>
         
    </Modal>
  );
};

export default AssignStaffModal;
