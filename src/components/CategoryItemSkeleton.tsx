import React from "react";

const CategoryItemSkeleton: React.FC = () => {
  return (
    <div className="space-y-2">
      {/* Skeleton for top-level categories */}
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
          </div>
          {/* Skeleton for potential child categories */}
          {item === 1 && (
            <div className="mt-1 space-y-1 ml-4">
              {[1, 2].map((child) => (
                <div
                  key={child}
                  className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryItemSkeleton;
