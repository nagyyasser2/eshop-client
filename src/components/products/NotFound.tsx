export default function NotFound() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't load this product.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
