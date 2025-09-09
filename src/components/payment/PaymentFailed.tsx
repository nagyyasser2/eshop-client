import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { XCircleIcon, ShoppingCartIcon, HomeIcon } from "lucide-react";

interface PaymentFailedProps {
  orderNumber?: string;
  errorMessage?: string;
}

function PaymentFailed({
  orderNumber: propOrderNumber = "#2541Xs55",
  errorMessage:
    propErrorMessage = "An error occurred during payment processing.",
}: PaymentFailedProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Prefer props if provided; otherwise, fall back to location.state
  const orderNumber = propOrderNumber || location.state?.orderNumber;
  const errorMessage =
    propErrorMessage ||
    location.state?.errorMessage ||
    "An error occurred during payment processing.";

  useEffect(() => {
    // If no orderNumber is provided, go back to previous route
    if (!orderNumber) {
      navigate(-1);
      return;
    }

    // Optional: Auto-redirect after a delay
    const timer = setTimeout(() => {
      // Uncomment to auto-redirect to cart after 10 seconds
      // navigate("/cart");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate, orderNumber]);

  // Don't render anything if we're navigating back
  if (!orderNumber) {
    return null;
  }

  return (
    <div className="py-5 bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Failure Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <XCircleIcon className="w-10 h-10 text-red-600" />
          </div>

          {/* Failure Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            {errorMessage} Please try again or contact support.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">{orderNumber}</span>
            </div>

            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-red-800 text-center">
                ⚠️ Your payment was not processed. Please verify your payment
                details and try again.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/cart"
            className="w-full block text-center bg-gradient-to-r from-red-500 to-rose-600 
            text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-lg 
            hover:scale-105 transform transition-all duration-300 focus:outline-none 
            focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Retry Payment
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 bg-white text-gray-700 
              font-medium py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 
              hover:shadow-md transition-all duration-300 focus:outline-none 
              focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              Shop More
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-white text-gray-700 
              font-medium py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 
              hover:shadow-md transition-all duration-300 focus:outline-none 
              focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our{" "}
            <Link
              to="/support"
              className="text-red-600 hover:text-red-700 underline"
            >
              customer support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed;
