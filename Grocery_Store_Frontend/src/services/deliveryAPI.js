import axios from "axios";
import {
  mockOrders,
  mockNotifications,
  mockStats,
  mockEarningsData,
  mockProfile,
} from "../data/mockData";

// The following data and types were provided in the original block and have been converted to JS.
// const mockOrders = [
//   {
//     id: 'ORD-123',
//     customerName: 'Alice Johnson',
//     customerPhone: '555-0101',
//     address: '123 Pine St, Anytown',
//     items: [
//       { id: 'item-1', name: 'Apples', quantity: 2, price: 1.50, image: 'https://placehold.co/50x50/F87171/fff?text=🍎' },
//       { id: 'item-2', name: 'Milk', quantity: 1, price: 2.75, image: 'https://placehold.co/50x50/3498DB/fff?text=🥛' },
//     ],
//     totalAmount: 5.75,
//     paymentStatus: 'paid',
//     status: 'assigned',
//     assignedAt: '2024-09-08T10:00:00Z',
//     otp: '1234'
//   },
//   {
//     id: 'ORD-456',
//     customerName: 'Bob Williams',
//     customerPhone: '555-0202',
//     address: '456 Oak Ave, Anytown',
//     items: [
//       { id: 'item-3', name: 'Bread', quantity: 1, price: 3.00, image: 'https://placehold.co/50x50/F87171/fff?text=🍞' },
//       { id: 'item-4', name: 'Eggs', quantity: 12, price: 4.50, image: 'https://placehold.co/50x50/F87171/fff?text=🥚' },
//     ],
//     totalAmount: 7.50,
//     paymentStatus: 'pending',
//     status: 'assigned',
//     assignedAt: '2024-09-08T10:05:00Z',
//     otp: '5678'
//   }
// ];

// const mockNotifications = [
//   { id: 'notif-1', title: 'New Order Assigned', message: 'You have a new order (#ORD-123) for Alice Johnson.', type: 'info', timestamp: '2024-09-08T10:00:10Z', read: false },
//   { id: 'notif-2', title: 'Payment Received', message: 'Payment for order #ORD-789 has been confirmed.', type: 'success', timestamp: '2024-09-07T14:30:00Z', read: true },
// ];

// const mockStats = {
//   pendingOrders: 2,
//   outForDelivery: 1,
//   completedToday: 5,
//   earningsToday: 75.50,
//   weeklyEarnings: 420.25,
//   monthlyEarnings: 1500.00,
//   totalDeliveries: 125,
//   averageRating: 4.8
// };

// const mockEarningsData = [
//   { date: 'Mon', amount: 50, orders: 8 },
//   { date: 'Tue', amount: 65, orders: 10 },
//   { date: 'Wed', amount: 72, orders: 9 },
//   { date: 'Thu', amount: 80, orders: 12 },
//   { date: 'Fri', amount: 95, orders: 15 },
//   { date: 'Sat', amount: 110, orders: 18 },
//   { date: 'Sun', amount: 125, orders: 20 },
// ];

// const mockProfile = {
//   id: 'dvr-1',
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   phone: '555-9876',
//   avatar: 'https://placehold.co/50x50/E5E7EB/fff?text=JD',
//   isOnline: true,
//   joiningDate: '2023-01-15',
//   vehicleType: 'Car',
//   licenseNumber: 'L-12345'
// };

const api = axios.create({
  baseURL: "https://api.grocerystore.com/delivery",
  headers: {
    "Content-Type": "application/json",
  },
});

export const deliveryAPI = {
  // Dashboard
  getStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockStats;
  },

  // Orders
  getAssignedOrders: async (staffId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const response = await axios.get(
        `https://localhost:7188/api/Order/delivery-staff/${staffId}/orders`
      );
      return response.data; // API returns orders
    } catch (error) {
      console.error("Failed to fetch assigned orders:", error);
      return [];
    }
  },

  getOrderById: async (staffId, id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    try {
      const response = await axios.get(
        `https://localhost:7188/api/Order/delivery-staff/${staffId}/orders/${id}`
      );
      return response.data; // API returns orders
    } catch (error) {
      console.error("Failed to fetch assigned orders:", error);
      return [];
    }
  },

  updateOrderStatus: async (id, status) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return axios.put(`https://localhost:7188/api/order/update-status/${id}`, { status });
  },

  markAsDelivered: async (id) => {
    return axios.put(`https://localhost:7188/api/order/mark-delivered/${id}`);
  },

  // Earnings
  getEarningsData: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockEarningsData;
  },

  // Notifications
  getNotifications: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockNotifications;
  },

  markNotificationAsRead: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return true;
  },

  // Profile
  getProfile: async (staffId) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    try {
      const response = await axios.get(
        `https://localhost:7188/api/DeliveryStaff/${staffId}`
      );
      return response.data; // API returns orders
    } catch (error) {
      console.error("Failed to fetch assigned orders:", error);
      return [];
    }
  },

  updateProfile: async (profile) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return true;
  },

  toggleAvailability: async (staffId,isOnline) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const response = await axios.put(
      `https://localhost:7188/api/DeliveryStaff/${staffId}/availability`,
      isOnline, // sending boolean in body
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  },
};
