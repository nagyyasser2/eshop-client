import React from "react";

const CategorySkeleton: React.FC = () => {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
