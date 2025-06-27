import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const HeroSection = ({ setCurrentView }) => {
  return (
    <section id="home" className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-gray-900 dark:via-blue-900 dark:to-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Premium PC & Laptop
                <span className="text-blue-400"> Wholesale</span> Solutions
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Partner with Mirs Computer, your trusted wholesale distributor
                for cutting-edge computers and laptops. Competitive pricing,
                reliable supply chain, and exceptional B2B service in Hyderabad.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentView("products")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Browse Products</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setCurrentView("products")} 
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                View Pricing
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">500+</div>
                <div className="text-gray-300">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">1000+</div>
                <div className="text-gray-300">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">15+</div>
                <div className="text-gray-300">Years</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern computer setup"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <div className="font-bold">Bulk Pricing Available</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Save up to 40%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;