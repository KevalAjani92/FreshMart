import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Plus, 
  Minus, 
  Share2, 
  Shield, 
  Truck, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  MessageCircle,
  Award,
  CheckCircle,
  Clock,
  Sparkles,
  Zap,
  Gift,
  ThumbsUp,
  Eye,
  Copy,
  Facebook,
  Twitter,
  MessageSquare
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });

  // Sample product data
  const [product] = useState({
    id: id || '1',
    name: 'Organic Fresh Strawberries',
    brand: 'FreshMart Premium',
    images: [
      'https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 4.99,
    mrp: 6.99,
    discount: 29,
    pricePerUnit: '$2.50 / 250g',
    stock: 'In Stock',
    stockCount: 15,
    category: 'Fresh Fruits',
    packSize: '500g',
    rating: 4.8,
    reviewCount: 156,
    shortDescription: 'Premium organic strawberries, hand-picked at peak ripeness for maximum sweetness and flavor. Perfect for snacking, desserts, or smoothies.',
    fullDescription: `Our organic strawberries are carefully selected from certified organic farms that prioritize sustainable farming practices. These berries are packed with vitamin C, antioxidants, and natural sweetness that makes them perfect for any occasion.

    Key Features:
    • 100% Organic and pesticide-free
    • Hand-picked at peak ripeness
    • Rich in vitamin C and antioxidants
    • Perfect for fresh consumption, baking, or smoothies
    • Sustainably grown with eco-friendly practices
    
    Storage Instructions:
    Store in refrigerator and consume within 3-5 days for best quality. Wash gently before eating.`,
    specifications: {
      'Pack Size': '500g',
      'Category': 'Fresh Fruits',
      'Origin': 'Local Organic Farms',
      'Shelf Life': '3-5 days',
      'Storage': 'Refrigerate',
      'Certification': 'USDA Organic'
    },
    reviews: [
      {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        date: '2024-01-15',
        comment: 'Absolutely delicious! The strawberries were perfectly ripe and so sweet. Will definitely order again.',
        verified: true
      },
      {
        id: 2,
        name: 'Mike Chen',
        rating: 4,
        date: '2024-01-12',
        comment: 'Great quality strawberries. Fresh and tasty. Packaging was excellent too.',
        verified: true
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        rating: 5,
        date: '2024-01-10',
        comment: 'Best strawberries I\'ve had in a long time! Perfect for my morning smoothies.',
        verified: true
      }
    ]
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} items to cart`);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this amazing ${product.name}!`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
    setShowShareMenu(false);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Submit review logic here
    console.log('Review submitted:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '', name: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 relative">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-3xl h-96 animate-pulse"></div>
              <div className="flex space-x-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-xl w-20 h-20 animate-pulse"></div>
                ))}
              </div>
            </div>
            
            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="bg-gray-200 h-8 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-6 rounded w-3/4 animate-pulse"></div>
              <div className="bg-gray-200 h-12 rounded animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-4 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock === 'Out of Stock';
  const isLowStock = product.stock === 'Low Stock';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-green-600 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-green-600 font-semibold">{product.name}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50">
              <div className="relative group">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover cursor-zoom-in"
                  onClick={() => setShowZoom(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={() => setShowZoom(true)}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <ZoomIn className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? 'border-green-500 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Brand & Title */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-xs text-gray-600">Verified Brand</span>
                </div>
              </div>
              <h1 className="text-4xl font-black text-gray-800 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-800">{product.rating}</span>
              </div>
              <div className="text-gray-600">
                ({product.reviewCount} reviews)
              </div>
              <button className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>View Reviews</span>
              </button>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-4xl font-black text-green-600">
                  ${product.price}
                </span>
                {product.mrp && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.mrp}
                  </span>
                )}
                {product.discount && (
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <div className="text-sm text-green-700 font-medium">
                {product.pricePerUnit}
              </div>
              {product.discount && (
                <div className="text-sm text-green-600 mt-1">
                  You save ${(product.mrp - product.price).toFixed(2)}!
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                isOutOfStock 
                  ? 'bg-red-100 text-red-800' 
                  : isLowStock 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isOutOfStock 
                    ? 'bg-red-500' 
                    : isLowStock 
                      ? 'bg-yellow-500 animate-pulse'
                      : 'bg-green-500'
                }`}></div>
                <span className="font-bold text-sm">{product.stock}</span>
              </div>
              {!isOutOfStock && (
                <span className="text-sm text-gray-600">
                  {product.stockCount} items available
                </span>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {!isOutOfStock && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                  <div className="flex items-center space-x-3 bg-white rounded-xl border-2 border-gray-200 p-1">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg font-bold min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {isOutOfStock ? (
                  <button className="flex-1 bg-gray-400 text-white py-4 rounded-2xl font-bold cursor-not-allowed flex items-center justify-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Notify When Available</span>
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="group relative flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden flex items-center justify-center space-x-2"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                      <Zap className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                )}

                <button
                  onClick={handleWishlistToggle}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    isWishlisted
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-600 hover:border-blue-200 hover:text-blue-600 transition-all duration-300 hover:scale-105"
                  >
                    <Share2 className="h-6 w-6" />
                  </button>

                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50"
                      >
                        <div className="space-y-2">
                          <button
                            onClick={() => handleShare('whatsapp')}
                            className="flex items-center space-x-3 w-full p-2 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <MessageSquare className="h-4 w-4 text-green-600" />
                            <span className="text-sm">WhatsApp</span>
                          </button>
                          <button
                            onClick={() => handleShare('facebook')}
                            className="flex items-center space-x-3 w-full p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Facebook className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">Facebook</span>
                          </button>
                          <button
                            onClick={() => handleShare('twitter')}
                            className="flex items-center space-x-3 w-full p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Twitter className="h-4 w-4 text-blue-400" />
                            <span className="text-sm">Twitter</span>
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className="flex items-center space-x-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <Copy className="h-4 w-4 text-gray-600" />
                            <span className="text-sm">Copy Link</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, text: '100% Genuine', color: 'text-green-600' },
                { icon: Truck, text: 'Free Delivery', color: 'text-blue-600' },
                { icon: RotateCcw, text: 'Easy Returns', color: 'text-purple-600' }
              ].map((badge, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-gray-200">
                  <badge.icon className={`h-5 w-5 ${badge.color}`} />
                  <span className="text-sm font-semibold text-gray-700">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Product Details Sections */}
        <div className="mt-16 space-y-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
          >
            <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-purple-600" />
              Product Description
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                {expandedDescription ? product.fullDescription : product.shortDescription}
              </p>
              
              <button
                onClick={() => setExpandedDescription(!expandedDescription)}
                className="text-green-600 hover:text-green-700 font-semibold flex items-center space-x-1"
              >
                <span>{expandedDescription ? 'Show Less' : 'Read More'}</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${expandedDescription ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </motion.div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
          >
            <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
              <Award className="h-6 w-6 mr-2 text-blue-600" />
              Specifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <span className="font-semibold text-gray-700">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-800 flex items-center">
                <MessageCircle className="h-6 w-6 mr-2 text-green-600" />
                Customer Reviews
              </h2>
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
              >
                Write Review
              </button>
            </div>

            {/* Review Summary */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-4xl font-black text-green-600 mb-2">{product.rating}</div>
                  <div className="flex items-center justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-green-700">{product.reviewCount} reviews</div>
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-3">
                        <span className="text-sm w-8">{stars}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${Math.random() * 80 + 10}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-800">{review.name}</span>
                          {review.verified && (
                            <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span className="text-xs text-green-700 font-semibold">Verified</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-green-600 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {showZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowZoom(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
              <button
                onClick={() => setShowZoom(false)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowReviewForm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Write a Review</h3>
              
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: star})}
                        className="p-1"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= newReview.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 resize-none"
                    required
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;