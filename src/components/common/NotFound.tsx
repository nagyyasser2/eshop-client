import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-125   flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-600 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-500 leading-relaxed text-lg">
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry, even the best explorers get lost
            sometimes!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            to="/"
            className="group flex items-center justify-center underline text-slate-500 font-semibold"
          >
            Back to Home
          </Link>

          <Link
            to="/products"
            className="group flex items-center justify-center underline font-semibold text-slate-500"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
