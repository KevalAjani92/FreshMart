import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  User, 
  Phone, 
  Apple, 
  Milk, 
  Wheat, 
  Fish, 
  Coffee, 
  Leaf,
  Heart,
  Clock,
  MapPin,
  ChevronRight,
  X,
  Menu
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState(null);

  const isActive = (path) => location.pathname === path;

  const mainNavItems = [
    { path: '/customer', icon: Home, label: 'Home' },
    { path: '/customer/products', icon: ShoppingCart, label: 'All Products' },
    { path: '/customer/about', icon: User, label: 'About Us' },
    { path: '/customer/contact', icon: Phone, label: 'Contact' },
  ];

  const categories = [
    { icon: Apple, label: 'Fresh Fruits', count: 45 },
    { icon: Leaf, label: 'Vegetables', count: 38 },
    { icon: Milk, label: 'Dairy Products', count: 22 },
    { icon: Wheat, label: 'Bakery', count: 18 },
    { icon: Fish, label: 'Meat & Seafood', count: 15 },
    { icon: Coffee, label: 'Beverages', count: 32 },
  ];

  const quickActions = [
    { icon: ShoppingCart, label: 'My Cart', badge: '3',path: '/customer/cart' },
    // { icon: Heart, label: 'Wishlist', badge: '7',path: '/customer/wishlist' },
    { icon: Clock, label: 'Order History',path: '/customer/my-orders' },
    // { icon: MapPin, label: 'Store Locator' },
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-80 lg:w-72
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 rounded-full p-2">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">FreshMart</h2>
              <p className="text-sm text-gray-600">Menu</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Main Navigation */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <nav className="space-y-2">
              {mainNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onToggle}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive(item.path)
                        ? 'bg-green-100 text-green-700 border-r-4 border-green-600'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Actions */}
          <div className="px-6 pb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Link
                    key={action.path}
                    to={action.path}
                    onClick={onToggle}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{action.label}</span>
                    </div>
                    {action.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {action.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          {/* <div className="px-6 pb-6">
            <button
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Categories
              </h3>
              <ChevronRight 
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  expandedSection === 'categories' ? 'rotate-90' : ''
                }`} 
              />
            </button>
            
            {expandedSection === 'categories' && (
              <div className="space-y-2">
                {categories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-4 w-4" />
                        <span className="text-sm font-medium">{category.label}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div> */}

          {/* Store Info */}
          <div className="px-6 pb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Store Hours</h4>
              <div className="text-sm text-green-700 space-y-1">
                <p>Mon-Sat: 8AM-10PM</p>
                <p>Sunday: 9AM-8PM</p>
              </div>
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-sm text-green-700">
                  📞 (555) 123-4567
                </p>
                <p className="text-sm text-green-700">
                  📍 123 Main Street
                </p>
              </div>
            </div>
          </div>

          {/* Special Offer */}
          <div className="px-6 pb-8">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-4 text-white">
              <h4 className="font-bold mb-2">🎉 Special Offer!</h4>
              <p className="text-sm mb-3">Get 20% off your first order</p>
              <button className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
                Claim Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;