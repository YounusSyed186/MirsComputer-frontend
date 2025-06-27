import { Monitor } from "lucide-react";

const Footer = ({ setCurrentView }) => {
  return (
    <footer className="bg-slate-900 dark:bg-black text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Mirs Computer</h3>
                <p className="text-gray-400 text-sm">PC & Laptop Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Your trusted partner for premium computer and laptop wholesale
              solutions in Hyderabad. Building lasting business relationships
              through quality products and exceptional service.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("products")}
                  className="hover:text-white transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>095500 57658</li>
              <li>sales@mirscomputer.com</li>
              <li>
                Sabza Colony Rd, lane 9<br />
                Sabza Colony, Brindavan Colony
                <br />
                Toli Chowki, Hyderabad
                <br />
                Telangana 500008
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Mirs Computer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;