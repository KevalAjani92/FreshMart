export const mockOrders = [
  {
    id: 'ORD001',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8901',
    address: '123 Oak Street, Downtown, City 12345',
    items: [
      { id: '1', name: 'Fresh Apples (2kg)', quantity: 1, price: 5.99, image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg' },
      { id: '2', name: 'Organic Milk (1L)', quantity: 2, price: 3.49, image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg' },
      { id: '3', name: 'Whole Grain Bread', quantity: 1, price: 2.99, image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg' }
    ],
    totalAmount: 15.96,
    paymentStatus: 'paid',
    status: 'assigned',
    assignedAt: '2025-01-27T09:30:00Z',
    otp: '1234'
  },
  {
    id: 'ORD002',
    customerName: 'Mike Chen',
    customerPhone: '+1 234-567-8902',
    address: '456 Pine Avenue, Uptown, City 12346',
    items: [
      { id: '4', name: 'Fresh Vegetables Bundle', quantity: 1, price: 12.99, image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg' },
      { id: '5', name: 'Chicken Breast (500g)', quantity: 1, price: 8.99, image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg' }
    ],
    totalAmount: 21.98,
    paymentStatus: 'paid',
    status: 'out_for_delivery',
    assignedAt: '2025-01-27T08:15:00Z'
  },
  {
    id: 'ORD003',
    customerName: 'Emily Davis',
    customerPhone: '+1 234-567-8903',
    address: '789 Maple Road, Westside, City 12347',
    items: [
      { id: '6', name: 'Greek Yogurt (500g)', quantity: 3, price: 4.49, image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg' },
      { id: '7', name: 'Fresh Berries Mix', quantity: 1, price: 6.99, image: 'https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg' }
    ],
    totalAmount: 20.46,
    paymentStatus: 'paid',
    status: 'delivered',
    assignedAt: '2025-01-26T14:20:00Z',
    deliveredAt: '2025-01-26T15:45:00Z',
    customerRating: 5,
    customerReview: 'Fast delivery and fresh products!'
  }
];

export const mockNotifications = [
  {
    id: 'NOT001',
    title: 'New Order Assigned',
    message: 'Order ORD001 has been assigned to you for delivery',
    type: 'info',
    timestamp: '2025-01-27T09:30:00Z',
    read: false
  },
  {
    id: 'NOT002',
    title: 'Payment Received',
    message: 'Payment confirmed for order ORD002',
    type: 'success',
    timestamp: '2025-01-27T08:20:00Z',
    read: false
  },
  {
    id: 'NOT003',
    title: 'Weekly Bonus Earned',
    message: 'Congratulations! You earned a $25 bonus this week',
    type: 'success',
    timestamp: '2025-01-26T18:00:00Z',
    read: true
  }
];

export const mockStats = {
  pendingOrders: 5,
  outForDelivery: 2,
  completedToday: 8,
  earningsToday: 89.50,
  weeklyEarnings: 425.75,
  monthlyEarnings: 1850.25,
  totalDeliveries: 247,
  averageRating: 4.8
};

export const mockEarningsData = [
  { date: '2025-01-21', amount: 75.50, orders: 6 },
  { date: '2025-01-22', amount: 92.25, orders: 8 },
  { date: '2025-01-23', amount: 68.75, orders: 5 },
  { date: '2025-01-24', amount: 105.00, orders: 9 },
  { date: '2025-01-25', amount: 84.25, orders: 7 },
  { date: '2025-01-26', amount: 89.50, orders: 8 },
  { date: '2025-01-27', amount: 89.50, orders: 8 }
];

export const mockProfile = {
  id: 'DEL001',
  name: 'Alex Martinez',
  email: 'alex.martinez@grocerystore.com',
  phone: '+1 234-567-8900',
  avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
  isOnline: true,
  joiningDate: '2024-06-15',
  vehicleType: 'Motorcycle',
  licenseNumber: 'DL123456789'
};
