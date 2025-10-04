import React from "react";

function LoadingProductsPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      {/* Spinner */}
      <div className="relative">
        <div className="w-14 h-14 border-4 border-slate-200 border-t-purple-500 rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <div className="text-center">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Loading products...
        </h2>
        <p className="text-gray-500 text-sm">
          Please wait while we fetch amazing items for you
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex justify-center space-x-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
}

export default LoadingProductsPage;
