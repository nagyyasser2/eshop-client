function Loading() {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="text-center">
        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-500 mb-2">Loading...</h2>
          <p className="text-slate-300 text-sm">
            Please wait while we prepare your content
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
