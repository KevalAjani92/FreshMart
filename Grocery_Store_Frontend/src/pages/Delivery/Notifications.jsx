import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Trash2, AlertCircle, Info, Apple } from 'lucide-react';
import toast from 'react-hot-toast';
import { deliveryAPI } from '../../services/deliveryAPI';
import LoadingSpinner from '../../components/layout/delivery/LoadingSpinner';

const notificationIcons = {
  info: Info,
  success: Check,
  warning: AlertCircle,
  error: AlertCircle
};

const notificationColors = {
  info: 'bg-gradient-to-br from-green-100 to-green-200 text-green-700',
  success: 'bg-gradient-to-br from-green-100 to-green-200 text-green-700',
  warning: 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700',
  error: 'bg-gradient-to-br from-red-100 to-red-200 text-red-700'
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await deliveryAPI.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to load notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await deliveryAPI.markNotificationAsRead(id);
      setNotifications(notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      ));
      toast.success('Notification marked as read');
    } catch (error) {
      console.error('Failed to mark as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast.success('Notification deleted');
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(notif => !notif.read);

    try {
      await Promise.all(unreadNotifications.map(notif =>
        deliveryAPI.markNotificationAsRead(notif.id)
      ));

      setNotifications(notifications.map(notif => ({ ...notif, read: true })));
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      toast.error('Failed to mark notifications as read');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-700 flex items-center space-x-2">
            {/* <Bell className="h-8 w-8" /> */}
            <span>🔔 Notifications</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Stay updated with your fresh grocery delivery assignments and updates
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all mt-4 sm:mt-0 transform hover:scale-105 shadow-lg font-semibold"
          >
            <Check className="h-4 w-4" />
            <span>✅ Mark All Read</span>
          </button>
        )}
      </div>

      {/* Unread Count */}
      {unreadCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-2xl p-4"
        >
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-bold">
              🔔 You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence>
          {notifications.map((notification, index) => {
            const Icon = notificationIcons[notification.type];

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm border-l-4 p-6 hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-green-500 bg-gradient-to-r from-green-50 to-white' : 'border-l-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-2xl ${notificationColors[notification.type]} shadow-md`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        🔔 {notification.title}
                      </h3>
                      <p className="text-green-700 mt-1 font-medium">{notification.message}</p>
                      <p className="text-xs text-green-500 mt-2 font-medium">
                        ⏰ {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-green-400 hover:text-green-600 transition-colors rounded-xl hover:bg-green-100"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-100"
                      title="Delete notification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {notifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl mx-auto mb-6">
            <Apple className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-green-700 mb-2">🔔 No notifications</h3>
          <p className="text-green-600">You're all caught up! No new fresh grocery notifications to show.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Notifications;