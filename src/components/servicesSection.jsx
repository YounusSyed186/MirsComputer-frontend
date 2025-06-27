import React from "react";
import { Shield, Truck, Users, Award, CheckCircle, Star } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Warranty Protection",
    description: "Comprehensive warranty coverage on all products with fast replacement service and technical support.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick turnaround times with reliable shipping partners. Same-day dispatch for in-stock items across Hyderabad.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Personal account managers and technical specialists to help grow your business successfully.",
  },
  {
    icon: Award,
    title: "Premium Brands",
    description: "Authorized distributor for top-tier manufacturers including Dell, HP, Lenovo, and ASUS.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Rigorous testing and quality control processes ensure every product meets our high standards.",
  },
  {
    icon: Star,
    title: "Competitive Pricing",
    description: "Industry-leading wholesale prices with volume discounts and flexible payment terms available.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Mirs Computer?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We deliver exceptional value through our comprehensive wholesale
            solutions, backed by industry expertise and reliable partnerships
            in Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;