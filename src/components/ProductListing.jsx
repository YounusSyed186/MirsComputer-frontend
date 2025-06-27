import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Grid,
  List,
  ShoppingCart,
  Heart,
  Star,
  ChevronDown,
  Package,
  Truck,
  Shield,
  ArrowLeft,
  X,
  Loader2,
} from "lucide-react";
import useProductStore from "../store/useProductStore";
import ProductCard from "./productcard";

const ProductListing = ({ onBack, openProduct }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCurrentProduct } = useProductStore();

  const categories = [
    "all",
    "Desktop",
    "Laptop",
    "Gaming PC",
    "Workstation",
    "Components",
    "Accessories",
  ];

  const brands = [
    "all",
    "Dell",
    "HP",
    "Lenovo",
    "ASUS",
    "Acer",
    "MSI",
    "Apple",
    "Samsung",
    "Intel",
    "AMD",
    "NVIDIA",
  ];

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASEBACKEND_URL}products/getlist`,
        {
          params: {
            search: searchTerm,
            category: selectedCategory !== "all" ? selectedCategory : undefined,
            status: "active",
          },
        }
      );

      // Transform data to match frontend expectations
      const transformedProducts = response.data.data.map((product) => ({
        ...product,
        category: categories.includes(product.category)
          ? product.category
          : "Components",
        brand: brands.includes(product.brand) ? product.brand : "Other",
        image: product.images?.[0] || "https://via.placeholder.com/300",
        wholesalePrice: product.price,
        originalPrice:
          product.discount > 0
            ? Math.round(product.price * (1 + product.discount / 100))
            : product.price,
        isNew:
          new Date() - new Date(product.createdAt) < 30 * 24 * 60 * 60 * 1000,
        status:
          product.stock > 10
            ? "in-stock"
            : product.stock > 0
            ? "low-stock"
            : "out-of-stock",
        rating: product.rating || 4,
        reviews: product.reviewsCount || 0,
      }));

      setProducts(transformedProducts);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    if (!product || typeof product !== "object") return false;

    const brandMatch =
      selectedBrand === "all" ||
      (product.brand &&
        product.brand.toLowerCase() === selectedBrand.toLowerCase());

    const productPrice = product.price || product.wholesalePrice || 0;
    const priceMatch =
      productPrice >= priceRange[0] && productPrice <= priceRange[1];

    return brandMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.price || a.wholesalePrice || 0;
    const priceB = b.price || b.wholesalePrice || 0;

    switch (sortBy) {
      case "price-low":
        return priceA - priceB;
      case "price-high":
        return priceB - priceA;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Product Card Component
  //   const ProductCard = ({ product }) => {
  //   const handleClick = () => {
  //     setCurrentProduct(product);
  //     openProduct(product._id);
  //   };

  //   return (
  //     <div
  //       onClick={handleClick}
  //       className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full"
  //     >
  //       {/* Image Container */}
  //       <div className="relative pt-[75%] overflow-hidden"> {/* 4:3 aspect ratio */}
  //         <img
  //           src={product.image}
  //           alt={product.name}
  //           className="absolute top-0 left-0 w-full h-full object-cover"
  //           onError={(e) => {
  //             e.target.src = "https://via.placeholder.com/300";
  //             e.target.className = "absolute top-0 left-0 w-full h-full object-contain bg-gray-100 p-4";
  //           }}
  //         />
  //         {/* Badges */}
  //         <div className="absolute top-2 left-2 flex flex-col space-y-1">
  //           {product.isNew && (
  //             <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
  //               New
  //             </span>
  //           )}
  //           {product.discount > 0 && (
  //             <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
  //               {product.discount}% OFF
  //             </span>
  //           )}
  //         </div>
  //       </div>

  //       {/* Product Info */}
  //       <div className="p-4 flex flex-col flex-grow">
  //         <div className="mb-2">
  //           <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
  //             {product.brand}
  //           </span>
  //           <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem]">
  //             {product.name}
  //           </h3>
  //         </div>

  //         {/* Rating */}
  //         <div className="flex items-center mb-2">
  //           <div className="flex items-center">
  //             {[...Array(5)].map((_, i) => (
  //               <Star
  //                 key={i}
  //                 className={`h-3 w-3 ${
  //                   i < Math.floor(product.rating)
  //                     ? "text-yellow-400 fill-current"
  //                     : "text-gray-300"
  //                 }`}
  //               />
  //             ))}
  //           </div>
  //           <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
  //             ({product.reviews})
  //           </span>
  //         </div>

  //         {/* Price */}
  //         <div className="mt-auto">
  //           <div className="mb-2">
  //             <div className="flex items-center space-x-2">
  //               <span className="text-lg font-bold text-gray-900 dark:text-white">
  //                 ₹{product.price.toLocaleString()}
  //               </span>
  //               {product.discount > 0 && (
  //                 <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
  //                   ₹{product.originalPrice.toLocaleString()}
  //                 </span>
  //               )}
  //             </div>
  //             <span className="text-xs text-gray-600 dark:text-gray-400">
  //               Wholesale Price
  //             </span>
  //           </div>

  //           {/* Stock Status */}
  //           <div className="flex items-center justify-between mb-3">
  //             <div
  //               className={`text-xs font-medium ${
  //                 product.status === "in-stock"
  //                   ? "text-green-600"
  //                   : product.status === "low-stock"
  //                   ? "text-yellow-600"
  //                   : "text-red-600"
  //               }`}
  //             >
  //               {product.status === "in-stock"
  //                 ? `${product.stock} in stock`
  //                 : product.status === "low-stock"
  //                 ? `Only ${product.stock} left`
  //                 : "Out of stock"}
  //             </div>
  //           </div>

  //           {/* Add to Cart Button */}
  //           <button
  //             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
  //             disabled={product.status === "out-of-stock"}
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               // Add to cart logic here
  //             }}
  //           >
  //             <ShoppingCart className="h-4 w-4" />
  //             <span>
  //               {product.status === "out-of-stock"
  //                 ? "Out of Stock"
  //                 : "Add to Cart"}
  //             </span>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // Product List Item Component
  const ProductListItem = ({ product }) => {
    const handleClick = () => {
      setCurrentProduct(product);
      openProduct(product._id);
    };

    return (
      <div
        onClick={handleClick}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-300 cursor-pointer"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-shrink-0 w-full md:w-48 h-48">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300";
              }}
            />
            <div className="absolute top-2 left-2 flex space-x-1">
              {product.isNew && (
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
                  New
                </span>
              )}
              {product.discount > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <div className="mb-2">
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {product.brand}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {product.model || product.category}
                </p>
              </div>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                  ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                {product.description || "No description available"}
              </p>

              <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  <Package className="h-3 w-3 mr-1" />
                  <span>{product.category}</span>
                </div>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  <Truck className="h-3 w-3 mr-1" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>Warranty</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Wholesale Price
                </span>
                <div
                  className={`text-xs font-medium mt-1 ${
                    product.status === "in-stock"
                      ? "text-green-600"
                      : product.status === "low-stock"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {product.status === "in-stock"
                    ? `${product.stock} in stock`
                    : product.status === "low-stock"
                    ? `Only ${product.stock} left`
                    : "Out of stock"}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-red-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="h-4 w-4" />
                </button>
                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.status === "out-of-stock"}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full">
            <X className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Error loading products
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {error}
          </p>
          <button
            onClick={fetchProducts}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm sm:text-base">Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Product Catalog
              </h1>
            </div>

            {/* Right Side */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Mobile Overlay */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Filters Sidebar */}
          <aside
            className={`fixed lg:static z-50 top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
              showFilters ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Category Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {category === "all" ? "All Categories" : category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    Brand
                  </h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="brand"
                          value={brand}
                          checked={selectedBrand === brand}
                          onChange={(e) => setSelectedBrand(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {brand === "all" ? "All Brands" : brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <div className="px-2">
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([0, parseInt(e.target.value)])
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>₹0</span>
                      <span>Up to ₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {sortedProducts.length} Products
              </h2>
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filters</span>
              </button>
            </div>

            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {sortedProducts.length} of {products.length} products
              </p>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-8 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      product={product}
                      setCurrentProduct={setCurrentProduct}
                      openProduct={openProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedProducts.map((product) => (
                    <ProductListItem key={product._id} product={product} />
                  ))}
                </div>
              )
            ) : products.length > 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No products match your filters
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find what
                  you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setPriceRange([0, 100000]);
                    setSearchTerm("");
                  }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No products available
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  There are currently no products in our catalog. Please check
                  back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductListing;
