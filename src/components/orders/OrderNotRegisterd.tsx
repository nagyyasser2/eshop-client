import { FaExclamationTriangle, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function OrderNotRegistered() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUser className="text-blue-500 text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Track your orders and view purchase history
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <FaExclamationTriangle className="text-blue-500 text-2xl mx-auto mb-3" />
            <p className="text-blue-800 font-medium">
              Please log in to view your orders
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <FaUser />
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
