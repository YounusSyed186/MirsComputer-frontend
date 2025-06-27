import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Package,
  Truck,
  Shield,
  CheckCircle,
  Minus,
  Plus,
  Eye,
  Zap,
  Award,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import useProductStore from '../store/useProductStore';

const ProductPage = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specifications');
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Get product from Zustand store with defaults
  const { selectedProduct } = useProductStore();
  
  // Destructure with comprehensive defaults
  const {
    id = '',
    name = 'Product Name',
    brand = 'Brand',
    model = 'Model Not Specified',
    images = ['https://via.placeholder.com/300'],
    rating = 0,
    reviews = 0,
    price = 0,
    originalPrice = 0,
    wholesalePrice = 0,
    discount = 0,
    stock = 0,
    status = 'out-of-stock',
    isNew = false,
    isFeatured = false,
    deliveryTime = '2-3 business days',
    warranty = '1 Year',
    specifications = 'No specifications available',
    features = 'No features listed',
    description = 'No description available'
  } = selectedProduct || {};

  // Memoized calculations
  const discountAmount = useMemo(() => originalPrice - wholesalePrice, [originalPrice, wholesalePrice]);
  const savingsPercentage = useMemo(() => Math.round((discountAmount / originalPrice) * 100), [discountAmount, originalPrice]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${name} to cart`);
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} x ${name}`);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300';
  };

  // Format text with line breaks
  const formatTextWithLineBreaks = (text) => {
    return text.split('\n').map((paragraph, i) => (
      <p key={i} className="mb-4 last:mb-0">{paragraph || <br />}</p>
    ));
  };

  // Sample related products

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Product not found
          </h3>
          <button
            onClick={onBack}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Products</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <img
                src={images[selectedImage]}
                alt={name}
                className="w-full h-96 object-contain rounded-lg"
                onError={handleImageError}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {isNew && (
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">New</span>
                )}
                {isFeatured && (
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">Featured</span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">{savingsPercentage}% OFF</span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-blue-500' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img 
                    src={image} 
                    alt={`${name} ${index + 1}`} 
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand and Title */}
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">{brand}</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Model: {model}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="ml-2 text-lg font-medium text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">({reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{wholesalePrice.toLocaleString()}</span>
                {originalPrice > wholesalePrice && (
                  <>
                    <span className="text-xl text-gray-500 dark:text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm font-medium rounded-full">
                      Save ₹{discountAmount.toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Wholesale Price (Exclusive of taxes)</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">MRP: ₹{price.toLocaleString()}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                status === 'in-stock' ? 'bg-green-500' :
                status === 'low-stock' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}></div>
              <span className={`font-medium ${
                status === 'in-stock' ? 'text-green-600 dark:text-green-400' :
                status === 'low-stock' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-red-600 dark:text-red-400'
              }`}>
                {status === 'in-stock' ? `${stock} units in stock` :
                 status === 'low-stock' ? `Only ${stock} left in stock` :
                 'Out of stock'}
              </span>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= stock}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                
                <button
                  onClick={handleBuyNow}
                  disabled={status === 'out-of-stock'}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
                >
                  Buy Now Call 095500 57458
                </button>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Fast Delivery</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{deliveryTime}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Warranty</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{warranty}</div>
                </div>
              </div>
            </div>

            {/* Contact for Bulk Orders */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Need Bulk Quantities?</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">Contact us for special pricing on bulk orders and custom configurations.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Phone className="h-4 w-4" />
                  <span>Call: 095500 57658</span>
                </button>
                <button className="flex items-center justify-center space-x-2 border border-blue-600 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-sm">
                  <MessageCircle className="h-4 w-4" />
                  <span>Get Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {[
                { id: 'specifications', label: 'Specifications' },
                { id: 'features', label: 'Features' },
                { id: 'description', label: 'Description' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'specifications' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Technical Specifications</h3>
                {specifications && specifications !== 'No specifications available' ? (
                  <div className="prose dark:prose-invert max-w-none text-gray-900 dark:text-white">
                    {formatTextWithLineBreaks(specifications)}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                    No specifications available
                  </div>
                )}
              </div>
            )}

            {activeTab === 'features' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Key Features</h3>
                {features && features !== 'No features listed' ? (
                  <div className="prose  text-gray-900 dark:text-white max-w-none">
                    {formatTextWithLineBreaks(features)}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                    No features listed
                  </div>
                )}
              </div>
            )}

            {activeTab === 'description' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Product Description</h3>
                <div className="prose  text-gray-900 dark:text-white max-w-none">
                  {formatTextWithLineBreaks(description)}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Customer Reviews</h3>
                <div className="text-center py-12">
                  <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Reviews Coming Soon</h4>
                  <p className="text-gray-600 dark:text-gray-400">Customer reviews and ratings will be displayed here.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        
      </div>
    </div>
  );
};

export default ProductPage;