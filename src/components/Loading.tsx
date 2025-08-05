function Loading() {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated Loading Spinner */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto">
            {/* Outer Ring */}
            <div className="bg-stale-200 absolute inset-0 rounded-full border-4 border-slate-700"></div>
            {/* Animated Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 border-r-purple-400 animate-spin"></div>
            {/* Inner Ring */}
            <div
              className="absolute inset-2 rounded-full border-2 border-transparent border-t-purple-400 border-l-pink-400 animate-spin animate-reverse"
              style={{ animationDuration: "1.5s" }}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Loading...
          </h2>
          <p className="text-slate-300 text-sm">
            Please wait while we prepare your content
          </p>
        </div>

        {/* Animated Dots */}
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

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full opacity-5 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-400 rounded-full opacity-5 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-pink-400 rounded-full opacity-5 animate-pulse delay-2000"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
