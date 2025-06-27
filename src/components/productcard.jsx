import { ShoppingCart, Star } from 'lucide-react'; // or whatever icon library you're using

const ProductCard = ({ product, setCurrentProduct, openProduct }) => {
    
  const handleClick = () => {
    setCurrentProduct(product);
    openProduct(product._id);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative pt-[75%] overflow-hidden"> {/* 4:3 aspect ratio */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300";
            e.target.className = "absolute top-0 left-0 w-full h-full object-contain bg-gray-100 p-4";
          }}
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
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

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            {product.brand}
          </span>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <div className="mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
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
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between mb-3">
            <div
              className={`text-xs font-medium ${
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

          {/* Add to Cart Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.status === "out-of-stock"}
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>
              {product.status === "out-of-stock"
                ? "Out of Stock"
                : "Add to Cart"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;