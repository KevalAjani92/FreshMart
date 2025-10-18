import React from 'react';
import { Truck, Clock, Shield, Headphones, CreditCard, Repeat, Sparkles, Zap, Award, Heart, Star } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery on orders over $50 within 5 miles',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconColor: 'text-green-600',
      highlight: 'Lightning Fast'
    },
    {
      id: 2,
      icon: Clock,
      title: 'Same Day Delivery',
      description: 'Order before 2 PM for same-day delivery',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      highlight: 'Super Quick'
    },
    {
      id: 3,
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% satisfaction guarantee on all products',
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
      iconColor: 'text-purple-600',
      highlight: 'Premium Quality'
    },
    {
      id: 4,
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer service support',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      iconColor: 'text-orange-600',
      highlight: 'Always Here'
    },
    {
      id: 5,
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Multiple secure payment options available',
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
      iconColor: 'text-pink-600',
      highlight: 'Bank Level Security'
    },
    {
      id: 6,
      icon: Repeat,
      title: 'Easy Returns',
      description: 'Hassle-free returns within 7 days',
      color: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50',
      iconColor: 'text-teal-600',
      highlight: 'No Questions Asked'
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Creative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-green-50"></div>
      <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6 animate-pulse">
            <Award className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">Premium Services</span>
          </div>
          
          <h2 className="text-5xl font-black text-gray-800 mb-6">
            Why Choose
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> FreshMart?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to providing you with the best grocery shopping experience through 
            innovative services, cutting-edge technology, and unwavering dedication to quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`group relative ${service.bgColor} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-3 hover:scale-105 border border-white/50`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Highlight Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-md">
                  {service.highlight}
                </div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Icon Section */}
                  <div className="flex items-center justify-center mb-6">
                    <div className={`relative p-6 bg-white rounded-3xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <IconComponent className={`h-12 w-12 ${service.iconColor}`} />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 text-center">
                    <button className="group/btn relative overflow-hidden bg-white text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 mx-auto">
                      <span className="relative z-10">Learn More</span>
                      <Zap className="h-4 w-4 relative z-10 group-hover/btn:rotate-12 transition-transform" />
                      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300`}></div>
                    </button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors duration-500"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/5 rounded-full blur-lg group-hover:bg-white/10 transition-colors duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Special Offer Banner with Creative Design */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl"></div>
          <div className="absolute inset-0 bg-pattern-dots opacity-20 rounded-3xl"></div>
          
          {/* Floating elements in banner */}
          <div className="absolute top-4 right-8 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 left-8 w-12 h-12 bg-white/10 rounded-full blur-lg animate-float"></div>
          
          <div className="relative p-12 text-center text-white">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Heart className="h-4 w-4 text-white animate-pulse" />
              <span className="text-sm font-semibold">Limited Time Offer</span>
            </div>
            
            <h3 className="text-4xl font-black mb-4">
              Special Offer for New Customers!
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Get <span className="font-black text-yellow-300 text-2xl">20% off</span> your first order with code: 
              <span className="font-mono bg-white/20 px-3 py-1 rounded-lg ml-2">FRESH20</span>
            </p>
            
            <button className="group relative bg-white text-green-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Claim Your Discount</span>
                <Star className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '5000+', label: 'Happy Customers', icon: Heart },
            { number: '99.9%', label: 'Uptime', icon: Shield },
            { number: '24/7', label: 'Support', icon: Headphones },
            { number: '15min', label: 'Avg Delivery', icon: Truck }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <IconComponent className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-black text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;