import React from "react";

const ProductGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative w-full aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg animate-pulse"
        >
          {/* Main Image Skeleton */}
          <div className="w-full h-full bg-slate-300" />

          {/* Category Badge Skeleton - Top Right */}
          <div className="absolute top-4 right-4 z-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-300 rounded-full h-6 w-20" />
          </div>

          {/* Overlay Skeleton */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0" />

          {/* Content Skeleton (hidden but maintains structure) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0">
            {/* Title Skeleton */}
            <div className="text-center space-y-2 w-full px-4">
              <div className="h-6 bg-slate-300 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-slate-300 rounded w-5/6 mx-auto" />
              <div className="h-8 bg-slate-300 rounded w-1/2 mx-auto mt-2" />
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div className="px-7 py-3 rounded-full bg-slate-300 w-24 h-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
