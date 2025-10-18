import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  MessageSquare, 
  Send, 
  Camera, 
  X, 
  CheckCircle,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Sparkles,
  Award,
  Gift,
  Zap
} from 'lucide-react';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('review');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState({
    orderRating: 0,
    deliveryRating: 0,
    productRating: 0,
    comment: '',
    images: [],
    category: 'general',
    anonymous: false
  });
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    { 
      id: 'review', 
      label: 'Product Review', 
      icon: Star, 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-50',
      description: 'Rate and review your purchased products'
    },
    { 
      id: 'complaint', 
      label: 'Complaint', 
      icon: AlertTriangle, 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      description: 'Report issues with your order or service'
    },
    { 
      id: 'suggestion', 
      label: 'Suggestion', 
      icon: ThumbsUp, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      description: 'Share ideas to improve our service'
    },
    { 
      id: 'compliment', 
      label: 'Compliment', 
      icon: Heart, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      description: 'Share positive feedback about our service'
    }
  ];

  const categories = [
    'General Experience',
    'Product Quality',
    'Delivery Service',
    'Customer Support',
    'Website/App',
    'Pricing',
    'Other'
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
    
    setFeedback(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (id) => {
    setFeedback(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit feedback logic here
    console.log('Feedback submitted:', { feedbackType, rating, feedback });
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setFeedback({
        orderRating: 0,
        deliveryRating: 0,
        productRating: 0,
        comment: '',
        images: [],
        category: 'general',
        anonymous: false
      });
    }, 3000);
  };

  const RatingStars = ({ value, onChange, size = 'h-8 w-8', label }) => (
    <div className="flex items-center space-x-1">
      {label && <span className="text-sm font-semibold text-gray-700 mr-3">{label}:</span>}
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating && setHoverRating(star)}
          onMouseLeave={() => setHoverRating && setHoverRating(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`${size} transition-colors ${
              star <= (hoverRating || value)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {value > 0 && `${value}/5`}
      </span>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 text-center max-w-md mx-4 relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-black text-gray-800 mb-4">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your feedback has been submitted successfully. We appreciate your input!
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Gift className="h-5 w-5" />
              <span className="font-semibold">You've earned 50 loyalty points!</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-green-200/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Your Opinion Matters</span>
            </div>
            <h1 className="text-5xl font-black text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Share Feedback
              </span>
            </h1>
            <p className="text-xl text-gray-600">Help us improve your shopping experience</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Feedback Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/50"
          >
            <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
              What would you like to share?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {feedbackTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setFeedbackType(type.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      feedbackType === type.id
                        ? `${type.bg} border-current ${type.color} shadow-lg`
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <IconComponent className={`h-8 w-8 mx-auto mb-3 ${
                      feedbackType === type.id ? type.color : 'text-gray-400'
                    }`} />
                    <h3 className={`font-bold mb-2 ${
                      feedbackType === type.id ? type.color : 'text-gray-700'
                    }`}>
                      {type.label}
                    </h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Ratings Section */}
              {feedbackType === 'review' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-600" />
                    Rate Your Experience
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                      <RatingStars
                        value={feedback.orderRating}
                        onChange={(value) => setFeedback(prev => ({ ...prev, orderRating: value }))}
                        label="Overall Order"
                        size="h-6 w-6"
                      />
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                      <RatingStars
                        value={feedback.deliveryRating}
                        onChange={(value) => setFeedback(prev => ({ ...prev, deliveryRating: value }))}
                        label="Delivery Service"
                        size="h-6 w-6"
                      />
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <RatingStars
                        value={feedback.productRating}
                        onChange={(value) => setFeedback(prev => ({ ...prev, productRating: value }))}
                        label="Product Quality"
                        size="h-6 w-6"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Overall Rating for other types */}
              {feedbackType !== 'review' && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Overall Rating</h3>
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                    <RatingStars
                      value={rating}
                      onChange={setRating}
                    />
                  </div>
                </div>
              )}

              {/* Category Selection */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-4">Category</label>
                <select
                  value={feedback.category}
                  onChange={(e) => setFeedback(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-semibold"
                >
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase().replace(' ', '-')}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  Your {feedbackType === 'review' ? 'Review' : 'Feedback'}
                </label>
                <textarea
                  value={feedback.comment}
                  onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                  placeholder={`Share your ${feedbackType === 'review' ? 'detailed review' : 'feedback'} here...`}
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  Add Photos (Optional)
                </label>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                    <div className="text-center">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm font-semibold text-gray-600">
                        Click to upload photos (Max 5)
                      </span>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  {feedback.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {feedback.images.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.preview}
                            alt="Upload preview"
                            className="w-full h-24 object-cover rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={feedback.anonymous}
                  onChange={(e) => setFeedback(prev => ({ ...prev, anonymous: e.target.checked }))}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="anonymous" className="text-sm font-semibold text-gray-700">
                  Submit anonymously
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden flex items-center space-x-3 mx-auto"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <Send className="h-6 w-6" />
                    <span>Submit Feedback</span>
                    <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </form>
          </motion.div>

          {/* Incentive Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="relative z-10">
              <Gift className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Earn Rewards for Your Feedback!</h3>
              <p className="text-green-100 mb-4">
                Get 50 loyalty points for every feedback you submit. Points can be redeemed for discounts!
              </p>
              <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">Your feedback helps us improve!</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;