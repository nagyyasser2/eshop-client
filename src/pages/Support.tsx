import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MailIcon,
  PhoneIcon,
  ShoppingCartIcon,
  HomeIcon,
  MessageCircleIcon,
} from "lucide-react";

interface SupportProps {
  orderNumber?: string;
}

function Support({ orderNumber: propOrderNumber }: SupportProps) {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prefer props if provided; otherwise, fall back to location.state
  const orderNumber = propOrderNumber || location.state?.orderNumber;

  useEffect(() => {
    // Reset form when component mounts
    setIsSubmitted(false);
  }, []);

  const handleQuerySubmit = () => {
    // Simulate form submission
    console.log("Support query submitted:", { email, query, orderNumber });

    // Show confirmation
    setIsSubmitted(true);

    // Reset form after a delay
    setTimeout(() => {
      setQuery("");
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-center">
      <div className="w-full max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4 sm:mb-5">
            <MessageCircleIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Customer Support
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            We're here to help! Contact us or submit a query below.
          </p>
        </div>

        {/* Contact Methods - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {/* Email Contact */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <MailIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Email Support
              </h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
              Send us an email and we'll respond within 24 hours.
            </p>
            <a
              href="mailto:support@eshop.com"
              className="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-medium inline-flex items-center"
            >
              support@eshop.com
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Phone Contact */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Phone Support
              </h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
              Call us directly for immediate assistance.
            </p>
            <a
              href="tel:+201090312546"
              className="text-green-600 hover:text-green-700 text-sm sm:text-base font-medium inline-flex items-center"
            >
              (+20) 1090312546
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 sm:mb-8">
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 sm:px-5 sm:py-4 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm sm:text-base">
                Your query has been submitted! We'll get back to you soon.
              </span>
            </div>
          </div>
        )}

        {/* Query Form */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Submit Your Query
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {orderNumber && (
              <div>
                <label className="block text-sm sm:text-base text-gray-700 mb-2">
                  Order Number
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-700 border border-gray-200">
                  {orderNumber}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base text-gray-700 mb-2"
              >
                Your Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="query"
                className="block text-sm sm:text-base text-gray-700 mb-2"
              >
                Your Query
              </label>
              <textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your issue or question in detail"
                rows={5}
                className="w-full px-4 py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 resize-vertical"
              />
            </div>

            <button
              type="button"
              onClick={handleQuerySubmit}
              disabled={!email || !query}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 
              text-white font-semibold py-3 sm:py-4 px-6 rounded-lg hover:shadow-lg 
              transform transition-all duration-300 focus:outline-none 
              focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed
              text-base sm:text-lg"
            >
              Submit Query
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back to Home
          </Link>
          <Link
            to="/orders"
            className="inline-flex items-center text-sm sm:text-base text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Support;
