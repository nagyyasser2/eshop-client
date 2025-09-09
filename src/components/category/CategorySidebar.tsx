import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import CategoryItemSkeleton from "./CategoryItemSkeleton";
import type { CategoryTreeDto } from "../../api/catalog";
import catalogService from "../../api/catalog";

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

  const [expandedCategories, setExpandedCategories] = useState<{
    [key: number]: boolean;
  }>({});

  // Fetch category tree using react-query
  const { data: categories = [], isLoading } = useQuery<CategoryTreeDto[]>({
    queryKey: ["categoriesTree"],
    queryFn: catalogService.getCategoriesTree,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Recursive component to render category tree
  const CategoryItem: React.FC<{
    category: CategoryTreeDto;
    level?: number;
  }> = ({ category, level = 0 }) => {
    const hasChildren =
      category.childCategories && category.childCategories.length > 0;
    const isExpanded = expandedCategories[category.id];

    return (
      <div className={level > 0 ? `ml-${level * 4}` : ""}>
        <button
          onClick={() => {
            onCategoryChange(category.id.toString());
            if (hasChildren) toggleCategory(category.id);
          }}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
            selectedCategory === category.id.toString()
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span className="text-sm font-medium">{category.name}</span>
          {hasChildren &&
            (isExpanded ? (
              <FaChevronDown className="text-sm text-gray-500" />
            ) : (
              <FaChevronRight className="text-sm text-gray-500" />
            ))}
        </button>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {category.childCategories?.map((child) => (
              <CategoryItem key={child.id} category={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
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
            {isLoading ? (
              <CategoryItemSkeleton />
            ) : (
              <>
                <button
                  onClick={() => onCategoryChange("all")}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === "all"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-medium">All Products</span>
                </button>
                {categories.map((category) => (
                  <CategoryItem key={category.id} category={category} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;
