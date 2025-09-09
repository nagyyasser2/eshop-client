import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaShoppingBag className="text-gray-400 text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No orders yet</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You haven't placed any orders yet. Start shopping to see your orders
          here!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <FaShoppingBag />
          Start Shopping
        </Link>
      </div>
    </>
  );
}
