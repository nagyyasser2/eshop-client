function ProductDetailsSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-8 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-8 lg:gap-12">
          {/* Image Section Skeleton */}
          <div className="p-6 lg:p-8 w-full lg:w-1/2">
            <div className="relative mb-6">
              <div className="aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-gray-200 animate-pulse">
                <div className="w-full h-full bg-gray-300 rounded-2xl"></div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-gray-300 text-transparent text-sm px-3 py-1 rounded-full font-medium">
                  Loading
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-200 animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Product Info Section Skeleton */}
          <div className="p-6 lg:p-8 w-full lg:w-1/2 flex flex-col">
            <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="mb-6">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center mb-6">
              <div className="flex text-gray-200">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="h-4 w-32 bg-gray-200 rounded ml-2 animate-pulse"></div>
            </div>

            {/* Variants Skeleton */}
            <div className="mb-6">
              <div className="h-6 w-24 bg-gray-200 rounded mb-3 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="mb-8">
              <div className="h-6 w-32 bg-gray-200 rounded mb-3 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
              </div>
            </div>

            {/* Stock Skeleton */}
            <div className="mb-6">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Add to Cart Section Skeleton */}
            <div className="mt-auto">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <div className="h-4 w-16 bg-gray-200 rounded mr-3 animate-pulse"></div>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <div className="h-10 w-10 bg-gray-200 animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-100 border-x border-gray-300 animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 h-14 bg-gray-300 rounded-2xl animate-pulse"></div>
                <div className="flex-1 sm:flex-initial h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
              </div>
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gray-300 rounded-full mr-2 animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
