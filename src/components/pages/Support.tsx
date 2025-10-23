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
    <div className="py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-center">
      <div className="w-full max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-2xl font-semibold text-slate-700 mb-2">
            Customer Support
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            We're here to help! Contact us or submit a query below.
          </p>
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
        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-normal text-slate-700 mb-4 sm:mb-6">
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
                className="w-full px-4 py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
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
                className="w-full px-4 py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-vertical"
              />
            </div>

            <button
              type="button"
              onClick={handleQuerySubmit}
              disabled={!email || !query}
              className="w-full bg-slate-700
              text-white font-semibold py-3 sm:py-4 px-6 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed
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
            className="inline-flex items-center text-sm sm:text-base text-gray-600 "
          >
            <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back to Home
          </Link>
          <Link
            to="/orders"
            className="inline-flex items-center text-sm sm:text-base text-gray-600 "
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
