import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ShoppingBag
} from 'lucide-react';

const Navbar = ({ setSidebarOpen }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationCount] = useState(3);

  return (
    <header className="bg-white shadow-soft border-b border-gray-200">
      <div className="flex items-center justify-between h-20 px-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle - visible at all breakpoints */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-2 rounded-xl hover:bg-primary-50 text-primary-600 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </motion.button>

          {/* Logo - visible on larger screens */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary-600">FreshMart</h1>
              <p className="text-xs text-gray-500 -mt-1">Owner Dashboard</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders, products..."
              className="w-64 lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile search button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
          >
            <Search className="h-5 w-5" />
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
              >
                {notificationCount}
              </motion.span>
            )}
          </motion.button>

          {/* Profile dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 md:space-x-3 text-sm rounded-2xl hover:bg-primary-50 p-2 transition-colors"
            >
              <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block font-medium text-gray-700">John Doe</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </motion.button>

            {profileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-lg border border-gray-200 z-50 overflow-hidden"
              >
                <div className="py-2">
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <User className="mr-3 h-4 w-4" />
                    Profile
                  </a>
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </a>
                  <hr className="my-1 border-gray-200" />
                  <a href="#" className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign out
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;