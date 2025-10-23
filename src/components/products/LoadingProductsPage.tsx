function LoadingProductsPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      {/* Spinner */}
      <div className="relative">
        <div className="w-14 h-14 border-4 border-slate-200 border-t-slate-500 rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <div className="text-center">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-500 via-slate-500 to-slate-500 bg-clip-text text-transparent">
          Loading bags...
        </h2>
        <p className="text-gray-500 text-sm">
          Please wait while we fetch amazing items for you
        </p>
      </div>
    </div>
  );
}

export default LoadingProductsPage;
