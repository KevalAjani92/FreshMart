import React, { useState } from 'react';
import { Mail, Gift, Bell, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: 'Exclusive Deals',
      description: 'Get access to member-only discounts and special offers'
    },
    {
      icon: Bell,
      title: 'Fresh Arrivals',
      description: 'Be the first to know about new products and seasonal items'
    },
    {
      icon: Mail,
      title: 'Weekly Recipes',
      description: 'Receive delicious recipes and cooking tips every week'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Stay Fresh with Our Newsletter
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join thousands of happy customers and never miss out on fresh deals, 
            new arrivals, and exclusive recipes delivered straight to your inbox.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-green-100 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* Newsletter Form */}
          <div className="max-w-md mx-auto">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <button
                  type="submit"
                  className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
            ) : (
              <div className="bg-white/20 rounded-lg p-6 flex items-center justify-center space-x-3">
                <CheckCircle className="h-6 w-6 text-white" />
                <span className="text-lg font-semibold">Thank you for subscribing!</span>
              </div>
            )}
            
            <p className="text-green-100 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          {/* Special Offer */}
          <div className="mt-12 bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">🎉 Welcome Bonus!</h3>
            <p className="text-lg mb-4">
              New subscribers get <span className="font-bold text-yellow-300">15% off</span> their first order
            </p>
            <p className="text-green-100 text-sm">
              Use code: <span className="font-mono bg-white/20 px-2 py-1 rounded">FRESH15</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;