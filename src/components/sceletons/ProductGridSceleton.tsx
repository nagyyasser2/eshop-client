import React from "react";

const ProductGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="group relative w-full flex flex-col bg-white rounded-lg overflow-hidden transition-shadow duration-300 animate-pulse"
          style={{
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Image Skeleton */}
          <div className="relative w-full aspect-square bg-slate-100" />

          {/* Product Details Skeleton */}
          <div className="p-4 flex flex-col gap-3">
            {/* Name Placeholder */}
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />

            {/* Price + Button Row */}
            <div className="flex items-center justify-between mt-2">
              <div className="h-5 bg-slate-200 rounded w-16" />
              <div className="h-8 bg-slate-300 rounded-md w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
