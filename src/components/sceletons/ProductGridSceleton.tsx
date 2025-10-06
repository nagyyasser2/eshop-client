import React from "react";

const ProductGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg animate-pulse overflow-hidden"
        >
          {/* Image Skeleton */}
          <div className="relative overflow-hidden">
            <div className="w-full h-48 sm:h-56 bg-gray-200" />
            <div className="absolute top-4 right-4">
              <div className="bg-gray-300 h-6 w-16 rounded-full" />
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full mb-1" />
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />

            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-10 bg-gray-200 rounded-lg w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
