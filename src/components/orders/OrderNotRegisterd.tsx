import { Link } from "react-router-dom";

export default function OrderNotRegistered() {
  return (
    <div className="py-10 sm:py-16">
      <div className="container mx-auto px-4 max-w-md sm:max-w-lg">
        <div className=" rounded-3xl p-8 sm:p-12 ">
          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 mb-3 text-center">
            View Your Orders
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-md text-slate-600 mb-8 text-center leading-relaxed">
            Sign in to access your order history, track shipments, and manage
            your purchases all in one place.
          </p>

          {/* CTA Button */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full bg-slate-600 hover:bg-slate-700 text-white px-4 py-3 rounded-lg font-semibold text-sm "
            aria-label="Log in to view your orders"
          >
            Sign In to Continue
          </Link>

          {/* Helper text */}
          <p className="text-xs sm:text-sm text-slate-500 mt-6 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-slate-700 hover:text-slate-900 font-semibold underline decoration-2 underline-offset-2"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
