import { FaExclamationTriangle } from "react-icons/fa";

export default function OrderNotRegistered() {
  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaExclamationTriangle className="text-red-500 text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-6">
          We couldn't load your orders right now. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </>
  );
}
