import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About Mirs Computer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              With over 15 years of experience in the technology distribution
              industry, Mirs Computer has established itself as a trusted
              partner for businesses seeking reliable computer and laptop
              wholesale solutions in Hyderabad and across Telangana.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our commitment to excellence, competitive pricing, and
              exceptional customer service has helped thousands of partners
              grow their businesses while providing their customers with
              cutting-edge technology solutions.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  15+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Years Experience
                </div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  1000+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Business Partners
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=600"
              alt="Team collaboration"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;