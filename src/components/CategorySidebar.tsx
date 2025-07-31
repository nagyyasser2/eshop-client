// CategorySidebar.tsx
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

// Using the categories from your ProductList for now
const categories = [
  { id: "all", name: "All Products", count: 10 },
  { id: "laptops", name: "Laptops", count: 2 },
  { id: "smartphones", name: "Smartphones", count: 3 },
  { id: "tablets", name: "Tablets", count: 2 },
  { id: "audio", name: "Audio", count: 2 },
  { id: "wearables", name: "Wearables", count: 1 },
];

// Price ranges for filtering
const priceRanges = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "under-500", label: "Under $500", min: 0, max: 500 },
  { id: "500-1000", label: "$500 - $1,000", min: 500, max: 1000 },
  { id: "1000-2000", label: "$1,000 - $2,000", min: 1000, max: 2000 },
  { id: "over-2000", label: "Over $2,000", min: 2000, max: Infinity },
];

interface CategorySidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPriceRange?: string;
  onPriceRangeChange?: (priceRange: string) => void;
  className?: string;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedPriceRange = "all",
  onPriceRangeChange,
  className = "",
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    categories: true,
    priceRange: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      {/* Categories Section */}
      <div className="p-4 border-b border-gray-100">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          {expandedSections.categories ? (
            <FaChevronDown className="text-sm text-gray-500" />
          ) : (
            <FaChevronRight className="text-sm text-gray-500" />
          )}
        </button>

        {expandedSections.categories && (
          <div className="mt-3 space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      {onPriceRangeChange && (
        <div className="p-4">
          <button
            onClick={() => toggleSection("priceRange")}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
            {expandedSections.priceRange ? (
              <FaChevronDown className="text-sm text-gray-500" />
            ) : (
              <FaChevronRight className="text-sm text-gray-500" />
            )}
          </button>

          {expandedSections.priceRange && (
            <div className="mt-3 space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => onPriceRangeChange(range.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedPriceRange === range.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-medium">{range.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySidebar;
