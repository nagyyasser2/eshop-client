import React from "react";

const ProductGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative w-full aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200  animate-pulse"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0" />
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
