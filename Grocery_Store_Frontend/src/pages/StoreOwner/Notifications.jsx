import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Filter,
  SquaresUnite as MarkAsUnread,
  Check,
  Trash2,
  AlertTriangle,
  ShoppingCart,
  Package,
  Users,
  Settings,
} from "lucide-react";
import Card from "../../components/layout/StoreOwner/Card";
import Badge from "../../components/layout/StoreOwner/Badge";
import Button from "../../components/layout/StoreOwner/Button";

const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #12345 from Alice Johnson for $45.99",
    time: "2 minutes ago",
    read: false,
    priority: "high",
    icon: ShoppingCart,
    color: "bg-green-500",
  },
  {
    id: 2,
    type: "inventory",
    title: "Low Stock Alert",
    message: "Fresh Milk is running low (only 12 items left)",
    time: "15 minutes ago",
    read: false,
    priority: "high",
    icon: AlertTriangle,
    color: "bg-red-500",
  },
  {
    id: 3,
    type: "delivery",
    title: "Delivery Completed",
    message: "Order #12340 has been successfully delivered to Bob Smith",
    time: "1 hour ago",
    read: true,
    priority: "medium",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    id: 4,
    type: "customer",
    title: "New Customer Registration",
    message: "Eva Martinez has joined as a new customer",
    time: "2 hours ago",
    read: true,
    priority: "low",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    id: 5,
    type: "inventory",
    title: "Stock Updated",
    message: "Organic Bananas stock has been replenished (50 items added)",
    time: "3 hours ago",
    read: true,
    priority: "low",
    icon: Package,
    color: "bg-green-500",
  },
  {
    id: 6,
    type: "order",
    title: "Order Cancelled",
    message: "Order #12338 has been cancelled by customer",
    time: "4 hours ago",
    read: false,
    priority: "medium",
    icon: AlertTriangle,
    color: "bg-orange-500",
  },
  {
    id: 7,
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance completed successfully",
    time: "1 day ago",
    read: true,
    priority: "low",
    icon: Settings,
    color: "bg-gray-500",
  },
  {
    id: 8,
    type: "delivery",
    title: "Delivery Delayed",
    message: "Order #12339 delivery delayed due to weather conditions",
    time: "1 day ago",
    read: false,
    priority: "high",
    icon: AlertTriangle,
    color: "bg-red-500",
  },
];

const Notifications = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType =
      selectedType === "all" || notification.type === selectedType;
    const matchesPriority =
      selectedPriority === "all" || notification.priority === selectedPriority;
    return matchesType && matchesPriority;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    console.log("Marking notification as read:", id);
  };

  const markAllAsRead = () => {
    console.log("Marking all notifications as read");
  };

  const deleteNotification = (id) => {
    console.log("Deleting notification:", id);
  };

  const deleteSelected = () => {
    console.log("Deleting selected notifications:", selectedNotifications);
    setSelectedNotifications([]);
  };

  const toggleSelectNotification = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map((n) => n.id));
  };

  const clearSelection = () => {
    setSelectedNotifications([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        {/* <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Stay updated with your store activities</p>
        </div> */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-fresh-green flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-br from-fresh-green to-emerald-600 rounded-2xl">
              <Bell className="h-8 w-8 text-white" />
            </div>
            Notifications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2"
          >
            Stay updated with your store activities
          </motion.p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Badge variant="warning">{unreadCount} Unread</Badge>
          <Button variant="secondary" size="sm" onClick={markAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          {selectedNotifications.length > 0 && (
            <Button variant="danger" size="sm" onClick={deleteSelected}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="order">Orders</option>
            <option value="inventory">Inventory</option>
            <option value="delivery">Delivery</option>
            <option value="customer">Customers</option>
            <option value="system">System</option>
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <div className="flex space-x-2">
            {selectedNotifications.length === 0 ? (
              <Button variant="ghost" size="sm" onClick={selectAll}>
                Select All
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={clearSelection}>
                Clear Selection
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Notifications ({filteredNotifications.length})
            </h3>
            {selectedNotifications.length > 0 && (
              <span className="text-sm text-gray-600">
                {selectedNotifications.length} selected
              </span>
            )}
          </div>

          <div className="space-y-3">
            {filteredNotifications.map((notification, index) => {
              const Icon = notification.icon;
              const isSelected = selectedNotifications.includes(
                notification.id
              );

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex items-start space-x-4 p-4 rounded-lg border transition-colors cursor-pointer
                    ${
                      !notification.read
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-gray-200"
                    }
                    ${isSelected ? "ring-2 ring-emerald-500" : ""}
                    hover:bg-gray-50
                  `}
                  onClick={() => toggleSelectNotification(notification.id)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectNotification(notification.id)}
                    className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div
                    className={`flex-shrink-0 p-2 rounded-full ${notification.color}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <p
                          className={`font-medium ${
                            !notification.read
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <Badge
                          variant={
                            notification.priority === "high"
                              ? "error"
                              : notification.priority === "medium"
                              ? "warning"
                              : "success"
                          }
                        >
                          {notification.priority}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-gray-500 mt-2">
                No notifications found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Notification Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Order Notifications</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">New orders</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">
                  Order cancellations
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">
                  Payment confirmations
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              Inventory Notifications
            </h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Low stock alerts</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">
                  Out of stock alerts
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">
                  Stock replenishment
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              Customer Notifications
            </h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">New registrations</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Customer reviews</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Support tickets</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              Delivery Notifications
            </h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Delivery updates</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">Delivery delays</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">
                  Staff availability
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button>Save Preferences</Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default Notifications;
