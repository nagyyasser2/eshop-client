import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-slate-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="text-slate-300 hover:text-pink-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-pink-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-sm">Email:</span>
                <a
                  href="mailto:support@eshop.com"
                  className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  support@eshop.com
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-sm">Phone:</span>
                <a
                  href="tel:+11234567890"
                  className="ml-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-start text-slate-300">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 mt-1.5"></div>
                <div>
                  <span className="text-sm">Address:</span>
                  <p className="text-slate-400 text-sm mt-1">
                    123 E-Shop St
                    <br />
                    Commerce City, USA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              About ShopHub
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              Your one-stop shop for the latest electronics and gadgets. We
              strive to provide quality products and excellent customer service
              with a modern shopping experience.
            </p>
            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-400 mb-3">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/shophub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-110"
                  aria-label="Follow us on Facebook"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/shophub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-lg hover:from-purple-500 hover:via-pink-500 hover:to-red-400 transition-all duration-300 transform hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 20.25c-2.744 0-4.968-2.213-4.968-4.944V8.694c0-2.731 2.224-4.944 4.968-4.944h7.102c2.744 0 4.968 2.213 4.968 4.944v6.612c0 2.731-2.224 4.944-4.968 4.944H8.449zm3.568-3.75c2.071 0 3.75-1.679 3.75-3.75s-1.679-3.75-3.75-3.75-3.75 1.679-3.75 3.75 1.679 3.75 3.75 3.75zm0-5.625c1.036 0 1.875.839 1.875 1.875s-.839 1.875-1.875 1.875-1.875-.839-1.875-1.875.839-1.875 1.875-1.875zm4.688-2.188c.518 0 .938-.42.938-.938s-.42-.938-.938-.938-.938.42-.938.938.42.938.938.938z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gradient-to-r from-transparent via-slate-700 to-transparent pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0 space-x-4">
              <div className="flex space-x-2">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
              </div>
              <span className="text-slate-500 text-xs">
                Powered by modern design
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
