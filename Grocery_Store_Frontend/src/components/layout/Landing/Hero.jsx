import React from 'react';
import { ArrowRight, Leaf, Clock, Shield, Star, Zap, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-300 rounded-full opacity-30 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-teal-200 rounded-full opacity-25 animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-green-300 rounded-full opacity-35 animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full mb-6 animate-pulse">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-green-800">#1 Grocery Store in Town</span>
            </div>

            <div className="max-w-2xl">
              <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
                  Fresh
                </span>
                <br />
                <span className="text-gray-800">Groceries</span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Delivered
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the future of grocery shopping with our premium quality products, 
                lightning-fast delivery, and unbeatable prices. Your family deserves the best! 
                <span className="text-green-600 font-semibold">🌟</span>
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={()=> navigate('products')} className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Start Shopping</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                {/* <button className="group relative border-3 border-green-600 text-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-105 overflow-hidden">
                  <span className="relative z-10">View Products</span>
                  <div className="absolute inset-0 bg-green-600 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-2xl"></div>
                </button> */}
              </div>

              {/* Trust Indicators with creative design */}
              <div className="flex flex-wrap gap-6 text-sm">
                {[
                  { icon: Leaf, text: '100% Organic', color: 'text-green-600' },
                  { icon: Clock, text: 'Same Day Delivery', color: 'text-blue-600' },
                  { icon: Shield, text: 'Quality Guaranteed', color: 'text-purple-600' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="font-semibold text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image with creative layout */}
          <div className="lg:w-1/2 relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/1328975/pexels-photo-1328975.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fresh Groceries"
                  className="w-full h-96 lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-6 shadow-xl animate-float">
                <div className="text-center">
                  <div className="text-3xl font-black text-green-600 mb-1">5000+</div>
                  <div className="text-sm text-gray-600 font-semibold">Happy Customers</div>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-xl animate-float-delayed">
                <div className="text-center">
                  <div className="text-3xl font-black mb-1">24/7</div>
                  <div className="text-sm font-semibold opacity-90">Service Available</div>
                  <Heart className="h-4 w-4 mx-auto mt-2 animate-pulse" />
                </div>
              </div>

              <div className="absolute top-1/2 -left-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4 shadow-xl animate-bounce">
                <div className="text-center">
                  <div className="text-2xl font-black mb-1">25%</div>
                  <div className="text-xs font-semibold">OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;