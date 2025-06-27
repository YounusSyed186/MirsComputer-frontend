import React from "react";
import { Monitor, Laptop, CheckCircle, ArrowRight } from "lucide-react";

const ProductsSection = ({ setCurrentView }) => {
  return (
    <section id="products" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Product Categories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Comprehensive range of computers and laptops for every business need
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <Monitor className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-4" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Desktop Computers
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  High-performance workstations & business PCs
                </p>
              </div>
            </div>
            <img
              src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Desktop computers"
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Gaming & Workstation PCs
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Business Desktop Solutions
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Custom Configuration Available
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <Laptop className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mr-4" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Laptops & Notebooks
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mobile computing solutions for every need
                </p>
              </div>
            </div>
            <img
              src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
              alt="Laptops"
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Business & Professional Laptops
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Gaming & Creative Notebooks
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                 2-in-1 Devices
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setCurrentView("products")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg inline-flex items-center space-x-2"
          >
            <span>View All Products</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;