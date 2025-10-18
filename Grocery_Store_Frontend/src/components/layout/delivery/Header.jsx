import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Search, Bell, ShoppingCart } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const Header = () => {
  const { sidebarOpen, setSidebarOpen, profile } = useApp();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg px-4 py-3 flex items-center justify-between"
    >
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl hover:bg-white/20 transition-colors"
        >
          <Menu className="h-5 w-5 text-white" />
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-white hidden sm:block text-lg">FreshMart Delivery</span>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm border-0 rounded-2xl focus:ring-2 focus:ring-white focus:bg-white transition-all placeholder-green-500/70"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-xl hover:bg-white/20 transition-colors"
        >
          <Bell className="h-5 w-5 text-white" />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            3
          </span>
        </motion.button>

        <div className="flex items-center space-x-2">
          <img
            src={profile?.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg'}
            alt="Profile"
            className="w-10 h-10 rounded-2xl object-cover border-2 border-white/30"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">{profile?.name}</p>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${profile?.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="text-xs text-green-100">
                {profile?.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;