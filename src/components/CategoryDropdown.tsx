import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { type CategoryTreeDto } from "../api/catalog";

interface CategoryDropdownProps {
  categories: CategoryTreeDto[];
  isMobile?: boolean;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  isMobile = false,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    number | null
  >(null);

  if (!categories || categories.length === 0) {
    return null;
  }

  const toggleMobileCategory = (categoryId: number) => {
    setExpandedMobileCategory(
      expandedMobileCategory === categoryId ? null : categoryId
    );
  };

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center justify-between">
              <Link
                to={`/category/${category.id}`}
                className="flex-1 px-2 py-2 hover:text-gray-900 transition-colors text-sm"
              >
                {category.name}
              </Link>
              {category.childCategories &&
                category.childCategories.length > 0 && (
                  <button
                    onClick={() => toggleMobileCategory(category.id)}
                    className="p-2 hover:bg-gray-100 rounded"
                    aria-label={`Toggle ${category.name} subcategories`}
                  >
                    {expandedMobileCategory === category.id ? (
                      <FaChevronDown className="text-xs" />
                    ) : (
                      <FaChevronRight className="text-xs" />
                    )}
                  </button>
                )}
            </div>

            {/* Mobile Subcategories */}
            {category.childCategories &&
              category.childCategories.length > 0 &&
              expandedMobileCategory === category.id && (
                <div className="pl-4 pb-2 bg-gray-50">
                  {category.childCategories.map((subCategory) => (
                    <Link
                      key={subCategory.id}
                      to={`/category/${subCategory.id}`}
                      className="block px-2 py-1 hover:text-gray-900 transition-colors text-sm text-gray-600"
                    >
                      {subCategory.name}
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="flex items-center space-x-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="relative group"
          onMouseEnter={() => setHoveredCategory(category.id)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <Link
            to={`/category/${category.id}`}
            className="flex items-center px-3 py-2 hover:text-gray-900 transition-colors font-medium"
          >
            {category.name}
            {category.childCategories &&
              category.childCategories.length > 0 && (
                <FaChevronDown className="ml-1 text-xs" />
              )}
          </Link>

          {/* Desktop Dropdown */}
          {category.childCategories && category.childCategories.length > 0 && (
            <div
              className={`absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-200 ${
                hoveredCategory === category.id
                  ? "opacity-100 visible transform translate-y-0"
                  : "opacity-0 invisible transform translate-y-2"
              }`}
            >
              <div className="py-2">
                {category.childCategories.map((subCategory) => (
                  <Link
                    key={subCategory.id}
                    to={`/category/${subCategory.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    {subCategory.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryDropdown;
