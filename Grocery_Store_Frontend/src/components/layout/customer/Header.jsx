import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, MapPin, Phone, Sparkles, Bell } from 'lucide-react';
import Sidebar from './Sidebar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <header className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 opacity-90"></div>
        <div className="absolute inset-0 bg-pattern-dots animate-pulse"></div>
        
        {/* Top notification bar */}
        <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="container mx-auto flex justify-between items-center text-sm relative z-10">
            <div className="flex items-center space-x-4 animate-bounce">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">🎉 Grand Opening Sale - 25% OFF Everything!</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Bell className="h-4 w-4 animate-pulse" />
              <span>Free delivery on orders over $30</span>
            </div>
          </div>
        </div>

        {/* Main header */}
        <nav className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Logo with creative design */}
            <Link to="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-white to-green-100 rounded-full p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">!</span>
                  </div>
                </div>
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                  FreshMart
                </h1>
                <p className="text-sm text-green-100 font-medium">Premium Groceries</p>
              </div>
            </Link>

            {/* Desktop Navigation with creative styling */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { path: '/', label: 'Home' },
                // { path: '/#products', label: 'Categories', isAnchor: true },
                { path: '/products', label: 'Shop All' },
                // { path: '/#services', label: 'Services', isAnchor: true },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' }
              ].map((item, index) => (
                item.isAnchor ? (
                  <a
                    key={index}
                    href={item.path}
                    className="relative px-4 py-2 text-white font-medium transition-all duration-300 hover:text-green-200 group"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </a>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={`relative px-4 py-2 font-medium transition-all duration-300 group ${
                      isActive(item.path)
                        ? 'text-yellow-300 bg-white/20 rounded-lg'
                        : 'text-white hover:text-green-200'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {!isActive(item.path) && (
                      <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    )}
                  </Link>
                )
              ))}
            </div>

            {/* Action buttons with creative design */}
            <div className="flex items-center space-x-3">
              {/* Sidebar Toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
              >
                <Menu className="h-5 w-5" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>
              
              {/* Cart with animation */}
              <button className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  3
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>
              
              {/* Mobile menu button */}
              <button
                className="md:hidden relative p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation with slide animation */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 py-6 border-t border-white/20 animate-slide-down">
              <div className="flex flex-col space-y-3">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/#categories', label: 'Categories', isAnchor: true },
                  { path: '/products', label: 'Shop All' },
                  { path: '/#services', label: 'Services', isAnchor: true },
                  { path: '/about', label: 'About' },
                  { path: '/contact', label: 'Contact' }
                ].map((item, index) => (
                  item.isAnchor ? (
                    <a
                      key={index}
                      href={item.path}
                      className="px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-all duration-300 hover:translate-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={index}
                      to={item.path}
                      className={`px-4 py-3 font-medium rounded-lg transition-all duration-300 hover:translate-x-2 ${
                        isActive(item.path)
                          ? 'text-yellow-300 bg-white/20'
                          : 'text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;