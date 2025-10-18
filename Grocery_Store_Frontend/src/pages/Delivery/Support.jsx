import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeadphonesIcon, ChevronDown, Send, Phone, Mail, Apple } from 'lucide-react';
import { Disclosure } from '@headlessui/react';
import toast from 'react-hot-toast';

const faqs = [
  {
    question: 'How do I update my delivery status?',
    answer: 'You can update your delivery status by going to the Order Details page and clicking the appropriate status button. Make sure to update the status as you progress through each step of the delivery.'
  },
  {
    question: 'What should I do if a customer is not available?',
    answer: 'If a customer is not available, try calling them first. If they don\'t answer, wait for 10 minutes and try again. If still unavailable, contact support through this page and we\'ll help resolve the situation.'
  },
  {
    question: 'How are my earnings calculated?',
    answer: 'Your earnings include base delivery fees, distance-based charges, tips from customers, and performance bonuses. You can view detailed breakdowns in the Earnings section.'
  },
  {
    question: 'Can I reject an assigned order?',
    answer: 'Generally, orders should not be rejected once assigned. However, if you have a valid reason (vehicle breakdown, emergency), contact support immediately and we\'ll help reassign the order.'
  },
  {
    question: 'How do I report damaged or missing items?',
    answer: 'If you notice damaged or missing items during pickup, document it with photos and contact support immediately. Do not proceed with delivery until the issue is resolved.'
  }
];

const Support = () => {
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [issueForm, setIssueForm] = useState({
    orderId: '',
    issueType: '',
    description: ''
  });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Your message has been sent to support');
    setContactForm({ subject: '', message: '', priority: 'medium' });
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Issue reported successfully');
    setIssueForm({ orderId: '', issueType: '', description: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-700 flex items-center space-x-2">
          {/* <HeadphonesIcon className="h-8 w-8" /> */}
          <span>🎧 Support & Help Center</span>
        </h1>
        <p className="text-green-600 mt-1 text-lg">Get help with your fresh grocery deliveries and account</p>
      </div>

      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-50 to-red-100 border border-red-300 rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-red-800 mb-3">🚨 Emergency Support</h3>
        <p className="text-red-700 mb-4 font-medium">For urgent issues during fresh grocery delivery, contact us immediately:</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <a
            href="tel:+1-800-GROCERY"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg font-semibold"
          >
            <Phone className="h-4 w-4" />
            <span>📞 Call: 1-800-GROCERY</span>
          </a>
          <a
            href="mailto:emergency@grocerystore.com"
            className="flex items-center justify-center space-x-2 bg-red-200 text-red-800 px-6 py-3 rounded-2xl hover:bg-red-300 transition-all transform hover:scale-105 shadow-lg font-semibold"
          >
            <Mail className="h-4 w-4" />
            <span>📧 emergency@grocerystore.com</span>
          </a>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg border border-green-100 p-6"
        >
          <h3 className="text-xl font-bold text-green-700 mb-4">❓ Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-2xl bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 text-left text-sm font-semibold text-green-800 hover:from-green-100 hover:to-green-200 focus:outline-none transition-all">
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-green-500 transition-transform`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-3 pb-2 text-sm text-green-700 font-medium">
                      {faq.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </motion.div>

        {/* Contact Forms */}
        <div className="space-y-6">
          {/* Contact Admin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg border border-green-100 p-6"
          >
            <h3 className="text-xl font-bold text-green-700 mb-4">📞 Contact Admin</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-green-700 mb-2">
                  📝 Subject
                </label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-green-700 mb-2">
                  🚨 Priority
                </label>
                <select
                  value={contactForm.priority}
                  onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                  className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-green-700 mb-2">
                  💬 Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg font-semibold"
              >
                <Send className="h-4 w-4" />
                <span>📤 Send Message</span>
              </button>
            </form>
          </motion.div>

          {/* Report Issue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-lg border border-green-100 p-6"
          >
            <h3 className="text-xl font-bold text-green-700 mb-4">🐛 Report Issue</h3>
            <form onSubmit={handleIssueSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-green-700 mb-2">
                  🛒 Order ID (Optional)
                </label>
                <input
                  type="text"
                  value={issueForm.orderId}
                  onChange={(e) => setIssueForm({ ...issueForm, orderId: e.target.value })}
                  placeholder="e.g., ORD001"
                  className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-green-700 mb-2">
                  🏷️ Issue Type
                </label>
                <select
                  value={issueForm.issueType}
                  onChange={(e) => setIssueForm({ ...issueForm, issueType: e.target.value })}
                  className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                  required
                >
                  <option value="">Select issue type</option>
                  <option value="payment">Payment Issue</option>
                  <option value="order_not_found">Order Not Found</option>
                  <option value="customer_issue">Customer Issue</option>
                  <option value="app_bug">App Bug</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-green-700 mb-2">
                  📝 Description
                </label>
                <textarea
                  value={issueForm.description}
                  onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg font-semibold"
              >
                <HeadphonesIcon className="h-4 w-4" />
                <span>🐛 Report Issue</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Support;
