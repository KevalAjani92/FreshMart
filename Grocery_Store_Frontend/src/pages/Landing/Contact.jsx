import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Sparkles, Heart, Star, Zap } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Store',
      details: ['123 Main Street', 'Anytown, ST 12345'],
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['(555) 123-4567', 'Toll-free: (800) 123-4567'],
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@freshmart.com', 'support@freshmart.com'],
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Store Hours',
      details: ['Mon-Sat: 8AM-10PM', 'Sunday: 9AM-8PM'],
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      iconColor: 'text-orange-600'
    }
  ];

  const departments = [
    {
      name: 'Customer Service',
      phone: '(555) 123-4567',
      email: 'service@freshmart.com',
      hours: 'Mon-Sun: 8AM-8PM',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      name: 'Delivery Support',
      phone: '(555) 123-4568',
      email: 'delivery@freshmart.com',
      hours: 'Mon-Sun: 7AM-9PM',
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      name: 'Bulk Orders',
      phone: '(555) 123-4569',
      email: 'bulk@freshmart.com',
      hours: 'Mon-Fri: 9AM-5PM',
      color: 'bg-gradient-to-r from-purple-500 to-violet-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50"></div>
        <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-float-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-6 animate-pulse">
              <Heart className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">We're Here to Help</span>
            </div>
            
            <h1 className="text-6xl font-black text-gray-800 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Contact
              </span>
              <br />
              <span className="text-gray-800">Us</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We'd love to hear from you! Whether you have questions, feedback, or need assistance, 
              our friendly team is here to help make your shopping experience amazing! 
              <span className="text-green-600 font-semibold">💬</span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              Get in
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Touch</span>
            </h2>
            <p className="text-xl text-gray-600">Multiple ways to reach us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div 
                  key={index} 
                  className={`group relative ${info.bgColor} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-105 border border-white/50`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 mb-6`}>
                      <IconComponent className={`h-8 w-8 ${info.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 mb-1 font-medium">{detail}</p>
                    ))}
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full blur-lg group-hover:bg-white/20 transition-colors duration-500"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-white/50">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-4">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Send Message</span>
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-2">Let's Talk!</h2>
                <p className="text-gray-600">We'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name ✨
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 group-hover:border-green-300"
                      placeholder="Your awesome name"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address 📧
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 group-hover:border-green-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                    Subject 🎯
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 group-hover:border-green-300"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                    Message 💬
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 resize-none group-hover:border-green-300"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                    <Zap className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl h-64 flex items-center justify-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
                <div className="text-center relative z-10">
                  <div className="bg-white rounded-full p-4 shadow-lg mb-4 inline-block">
                    <MapPin className="h-12 w-12 text-green-600" />
                  </div>
                  <p className="text-gray-700 font-bold text-lg">Interactive Map</p>
                  <p className="text-sm text-gray-600">123 Main Street, Anytown, ST 12345</p>
                </div>
              </div>

              {/* Department Contacts */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <h3 className="text-2xl font-black mb-2 flex items-center">
                    <Sparkles className="h-6 w-6 mr-2" />
                    Department Contacts
                  </h3>
                  <p className="opacity-90">Specialized support for your needs</p>
                </div>
                
                <div className="p-6 space-y-6">
                  {departments.map((dept, index) => (
                    <div key={index} className="group relative bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-gray-300">
                      <div className={`absolute top-0 left-0 w-1 h-full ${dept.color} rounded-l-2xl`}></div>
                      <h4 className="font-black text-gray-800 mb-3 text-lg">{dept.name}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-green-600" />
                          <span className="font-semibold">{dept.phone}</span>
                        </p>
                        <p className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="font-semibold">{dept.email}</span>
                        </p>
                        <p className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-purple-600" />
                          <span className="font-semibold">{dept.hours}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full mb-6">
              <Star className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-800">Quick Answers</span>
            </div>
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              Frequently Asked
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"> Questions</span>
            </h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "What are your delivery hours?",
                answer: "We offer delivery Monday through Sunday from 8AM to 8PM. Same-day delivery is available for orders placed before 2PM.",
                icon: Clock,
                color: "text-blue-600"
              },
              {
                question: "Do you offer organic products?",
                answer: "Yes! We have a wide selection of certified organic fruits, vegetables, dairy products, and pantry items.",
                icon: Sparkles,
                color: "text-green-600"
              },
              {
                question: "What's your return policy?",
                answer: "We offer a 100% satisfaction guarantee. If you're not happy with any product, bring it back within 7 days for a full refund.",
                icon: Heart,
                color: "text-red-600"
              },
              {
                question: "Do you accept special orders?",
                answer: "Absolutely! Contact our customer service team at least 48 hours in advance for special orders or bulk purchases.",
                icon: Star,
                color: "text-purple-600"
              }
            ].map((faq, index) => {
              const IconComponent = faq.icon;
              return (
                <div key={index} className="group bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                  <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center">
                    <div className="bg-white rounded-full p-2 shadow-md mr-4">
                      <IconComponent className={`h-5 w-5 ${faq.color}`} />
                    </div>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-14 leading-relaxed">{faq.answer}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;