import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Wallet,
  History,
  Bell,
  User,
  HeadphonesIcon,
  X
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const navigationItems = [
  { to: '/delivery/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/delivery/orders', icon: ShoppingCart, label: 'Assigned Orders' },
  // { to: '/delivery/earnings', icon: Wallet, label: 'My Earnings' },
  { to: '/delivery/history', icon: History, label: 'Delivery History' },
  // { to: '/delivery/notifications', icon: Bell, label: 'Notifications' },
  { to: '/delivery/profile', icon: User, label: 'Profile & Settings' },
  { to: '/delivery/support', icon: HeadphonesIcon, label: 'Support' },
];

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useApp();

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-white to-green-50 shadow-2xl z-50 lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-green-100">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-green-700 text-lg">FreshMart</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-xl hover:bg-green-100 transition-colors lg:hidden"
            >
              <X className="h-5 w-5 text-green-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                            : 'text-green-700 hover:bg-green-100 hover:text-green-800 hover:transform hover:scale-102'
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-green-100">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg" />
              <span className="text-sm font-semibold text-green-700">🚚 Ready for deliveries</span>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;