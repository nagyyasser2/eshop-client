import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="rounded-2xl p-2 mb-10 text-center">
      {/* Icon */}
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
        <FaShoppingBag className="text-gray-400 text-4xl" />
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Your cart is empty
      </h3>

      {/* Subtext */}
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven’t added any items to your cart yet. Start shopping
        to fill it up!
      </p>

      {/* Button */}
      <Link
        to="/bags"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <FaShoppingBag />
        Start Shopping
      </Link>
    </div>
  );
}
