import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className=" bg-gradient-to-br from-indigo-50 to-purple-50  flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-slate-900 leading-relaxed text-lg">
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry, even the best explorers get lost
            sometimes!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            to="/"
            className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 text-white font-semibold"
          >
            <span className="w-2 h-2 bg-white rounded-full mr-3 group-hover:w-3 transition-all duration-200"></span>
            Back to Home
          </Link>

          <Link
            to="/products"
            className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 text-white font-semibold"
          >
            <span className="w-2 h-2 bg-white rounded-full mr-3 group-hover:w-3 transition-all duration-200"></span>
            Browse Products
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
