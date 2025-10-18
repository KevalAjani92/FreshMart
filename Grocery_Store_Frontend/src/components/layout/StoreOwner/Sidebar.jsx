import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Percent,
  DollarSign,
  UserCheck,
  Bell,
  BarChart3,
  Settings,
  X,
  ShoppingBag,
  Truck,
  Apple,
  Grid3X3
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/store-owner/dashboard' },
  { icon: ShoppingCart, label: 'Orders', path: '/store-owner/orders' },
  { icon: Apple, label: 'Products', path: '/store-owner/products' },
  { icon: Grid3X3, label: 'Categories', path: '/store-owner/categories' },
  { icon: Truck, label: 'Delivery Staff', path: '/store-owner/delivery-staff' },
  // { icon: Package, label: 'Inventory', path: '/store-owner/inventory' },
  // { icon: Percent, label: 'Discounts', path: '/store-owner/discounts' },
  // { icon: DollarSign, label: 'Earnings', path: '/store-owner/earnings' },
  // { icon: UserCheck, label: 'Customers', path: '/store-owner/customers' },
  // { icon: Bell, label: 'Notifications', path: '/store-owner/notifications' },
  // { icon: BarChart3, label: 'Reports', path: '/store-owner/reports' },
  // { icon: Settings, label: 'Settings', path: '/store-owner/settings' },
  // { icon: Truck, label: 'Assigned Orders', path: '/store-owner/assigned-orders' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-soft-lg transform flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary-600">FreshMart</h1>
              <p className="text-xs text-gray-500 -mt-1">Owner Panel</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-xl hover:bg-white/50 text-gray-500 hover:text-primary-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
        

        {/* Navigation */}
        <nav className="mt-6 px-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      group flex items-center px-4 py-3 text-sm font-medium rounded-2xl
                      transition-all duration-200 relative overflow-hidden
                      ${isActive
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft'
                        : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className={`mr-3 h-5 w-5 relative z-10 ${isActive ? 'text-white' : 'group-hover:text-primary-600'}`} />
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 bg-white rounded-full relative z-10"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-4 border border-primary-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-accent-400 to-accent-500 rounded-xl">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Store Status</p>
                <p className="text-xs text-primary-600">Online & Active</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;