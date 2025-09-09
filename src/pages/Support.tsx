import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
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
    <div className=" bg-gradient-to-br from-purple-50 to-pink-50 py-4 sm:py-6 md:py-8 lg:py-10 flex items-center justify-center px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-5 xs:mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-3 xs:mb-4">
            <MessageCircleIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 text-purple-600" />
          </div>
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Customer Support
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            We're here to help! Contact us or submit a query below.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="flex items-center justify-center mb-5 xs:mb-6 sm:mb-8">
            <div className="w-fit bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-purple-800 px-4 py-3 rounded-lg mb-5 xs:mb-6 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm xs:text-base">
                Your query has been submitted! We'll get back to you soon.
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 xs:p-5 sm:p-6 mb-5 xs:mb-6 sm:mb-8 lg:mb-0 lg:w-3/5">
            <div className="space-y-4 xs:space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs xs:text-sm text-gray-600 mb-1 xs:mb-2"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 text-xs xs:text-sm sm:text-base rounded-lg xs:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="query"
                  className="block text-xs xs:text-sm text-gray-600 mb-1 xs:mb-2"
                >
                  Your Query
                </label>
                <textarea
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe your issue or question"
                  rows={4}
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 text-xs xs:text-sm sm:text-base rounded-lg xs:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="button"
                onClick={handleQuerySubmit}
                disabled={!email || !query}
                className="w-full block text-center bg-gradient-to-r from-purple-600 to-pink-600 
                text-white font-semibold py-3 xs:py-3 sm:py-4 px-4 rounded-xl xs:rounded-xl hover:shadow-lg 
                hover:scale-[1.02] transform transition-all duration-300 focus:outline-none 
                focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed
                text-xs xs:text-sm sm:text-base"
              >
                Submit Query
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
