import { Phone, Mail, MapPin } from "lucide-react";
import map from "../assets/map.png";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="relative z-10">Get In Touch</span>
            <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-full -z-0 transform translate-y-1"></span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to partner with us? Let's discuss your wholesale needs. Our team is here to help you with any inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl flex-shrink-0">
                <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-3">
                  Phone
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">095500 57658</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md">
                    Mon-Fri 9AM-7PM IST
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl flex-shrink-0">
                <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-3">
                  Email
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                  sales@mirscomputer.com
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-md">
                    We respond within 2 hours
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl flex-shrink-0">
                <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-900 dark:text-white mb-3">
                  Address
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Sabza Colony Rd, lane 9<br />
                  Sabza Colony, Brindavan Colony
                  <br />
                  Toli Chowki, Hyderabad
                  <br />
                  Telangana 500008
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform hover:scale-[1.02] transition-transform duration-500">
            <img 
              src={map} 
              alt="Company location map" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Our Location</h3>
                <p className="text-blue-200">Visit us for a personal consultation</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;