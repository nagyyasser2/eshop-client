import React from "react";

type CategorySkeletonProps = {
  layout?: "horizontal" | "vertical";
};

const CategorySkeleton: React.FC<CategorySkeletonProps> = ({
  layout = "horizontal",
}) => {
  if (layout === "horizontal") {
    // Desktop horizontal layout
    return (
      <div className="flex gap-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-10 bg-gray-200 rounded-lg animate-pulse"
            style={{ width: `${80 + Math.random() * 60}px` }}
          />
        ))}
      </div>
    );
  }

  // Mobile vertical layout
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center">
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
