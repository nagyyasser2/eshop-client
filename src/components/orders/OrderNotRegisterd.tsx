import { FaExclamationTriangle, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function OrderNotRegistered() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-10 sm:py-12">
      <div className="container mx-auto px-4 max-w-md sm:max-w-2xl">
        <div className="rounded-2xl p-6 sm:p-8 text-center">
          {/* Avatar Circle */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <FaUser className="text-white text-2xl sm:text-3xl" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            My Orders
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Track your orders and view purchase history
          </p>

          {/* Warning Box */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-6 mb-5 sm:mb-6">
            <FaExclamationTriangle className="text-purple-600 text-xl sm:text-2xl mx-auto mb-2 sm:mb-3" />
            <p className="text-sm sm:text-base md:text-lg text-purple-800 font-medium">
              Please log in to view your orders
            </p>
          </div>

          {/* Login Button */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold text-sm sm:text-base hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <FaUser className="text-sm sm:text-base" />
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
