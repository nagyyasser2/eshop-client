import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-slate-200 py-10 ">
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
                  to="/orders"
                  className="text-slate-300 hover:text-pink-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-pink-400 rounded-full mr-3 group-hover:w-2 transition-all duration-200"></span>
                  Orders
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
                  (+20) 1090312546
                </a>
              </div>
              <div className="flex items-start text-slate-300">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 mt-1.5"></div>
                <div>
                  <span className="text-sm">Address: </span>
                  <span className="text-slate-400 text-sm mt-1">
                    123 E-Shop St Commerce City, EG
                  </span>
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
          </div>
        </div>
        <div className="flex mt-4 flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
          </p>
          <div className="flex justify-center sm:justify-end mt-6">
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/nagy.yasser.7/"
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
                href="https://www.instagram.com/nagi_yaser_ahmed/"
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
              <a
                href="https://www.linkedin.com/in/nagy-yasser-629bab239/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-110"
                aria-label="Follow us on LinkedIn"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.941v5.665H9.352V9.015h3.414v1.557h.048c.477-.9 1.638-1.852 3.37-1.852 3.602 0 4.265 2.371 4.265 5.455v6.277zM5.337 7.433c-1.144 0-2.063-.932-2.063-2.081 0-1.149.919-2.081 2.063-2.081 1.145 0 2.064.932 2.064 2.081 0 1.149-.919 2.081-2.064 2.081zm1.777 13.019H3.56V9.015h3.554v11.437zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
