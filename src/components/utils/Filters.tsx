import React, { useEffect, useState } from "react";
import getCategoriesTree, { type CategoryTreeDto } from "../../api/catalog";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import CategorySkeleton from "../sceletons/CategorySkeleton";

type FiltersProps = {
  onFilterChange: (filters: {
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    tags?: string;
    category?: string;
  }) => void;
  isFiltersOpen: boolean;
  toggleFilters: () => void;
};

// Sample tags
const availableTags = ["New", "Sale", "Popular", "Limited"];

// Predefined price ranges
const priceRanges = [
  { label: "0 - 100", min: 0, max: 100 },
  { label: "100 - 500", min: 100, max: 500 },
  { label: "500 - 1000", min: 500, max: 1000 },
  { label: "1000 - 2000", min: 1000, max: 2000 },
  { label: "2000 - 6000", min: 2000, max: 6000 },
  { label: "6000 - 15000", min: 6000, max: 15000 },
  { label: "15000 - above", min: 15000, max: 100000 },
];

const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  isFiltersOpen,
  toggleFilters,
}) => {
  const [categories, setCategories] = useState<CategoryTreeDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await getCategoriesTree();
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load categories");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleTag = (tag: string) => {
    setTags((prev) => {
      const tagList = prev
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

      if (tagList.includes(tag)) {
        return tagList.filter((t) => t !== tag).join(",");
      } else {
        return [...tagList, tag].join(",");
      }
    });
  };

  const toggleCategoryExpansion = (categoryId: number) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const selectedRange = priceRanges.find(
      (range) => range.label === selectedPriceRange
    );
    const filters = {
      minPrice: selectedRange ? selectedRange.min : undefined,
      maxPrice: selectedRange ? selectedRange.max : undefined,
      tags: tags.length > 0 ? tags : undefined,
      categoryId: category !== "All" ? category : undefined,
    };
    onFilterChange(filters);
    toggleFilters();
  }, [selectedPriceRange, tags, category, onFilterChange]);

  const renderCategory = (categoryItem: CategoryTreeDto, level = 0) => {
    const hasChildren =
      categoryItem.childCategories && categoryItem.childCategories.length > 0;
    const isExpanded = expandedCategories.has(categoryItem.id);
    const isSelected = category === categoryItem.id.toString();

    return (
      <div key={categoryItem.id}>
        <div
          className={`flex items-center py-1 cursor-pointer transition-colors duration-200 ${
            isSelected
              ? "text-blue-500 font-semibold bg-blue-50 px-2 py-1 rounded"
              : "text-gray-700 hover:text-blue-500 hover:bg-gray-50 px-2 py-1 rounded"
          }`}
          onClick={() => {
            if (hasChildren) {
              toggleCategoryExpansion(categoryItem.id);
            } else {
              setCategory(categoryItem.id.toString());
            }
          }}
        >
          {hasChildren && (
            <span className="mr-2 transform transition-transform">
              {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          )}
          <span
            onClick={(e) => {
              e.stopPropagation();
              setCategory(categoryItem.id.toString());
            }}
            className={`transition-colors duration-200 ${
              isSelected ? "text-blue-500" : "hover:text-blue-500"
            }`}
          >
            {categoryItem.name}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4 border-l border-gray-200 pl-2">
            {categoryItem.childCategories!.map((child) =>
              renderCategory(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isFiltersOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden opacity-100 pointer-events-auto backdrop-blur-sm"
          onClick={toggleFilters}
        ></div>
      )}
      <aside
        className={`fixed rounded-md lg:sticky top-0 lg:top-[125px] left-0 h-full w-3/4 max-w-md lg:w-64 bg-white p-6 overflow-y-auto z-50 lg:z-auto transform transition-transform duration-300 ease-in-out border-gray-50 rounded-2xl px-4 py-1"
           ${
             isFiltersOpen ? "translate-x-0" : "-translate-x-full"
           } lg:translate-x-0 lg:self-start`}
        style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>
            <span className="text-gray-500">
              {isCategoryOpen ? (
                <span className="text-2xl font-bold">-</span>
              ) : (
                <span className="text-2xl font-bold">+</span>
              )}
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isCategoryOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            {loading ? (
              <CategorySkeleton />
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="mt-2">
                <div
                  className={`py-1 px-2 cursor-pointer rounded transition-colors duration-200 ${
                    category === "All"
                      ? "text-blue-500 font-semibold bg-blue-50"
                      : "text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setCategory("All")}
                >
                  All
                </div>
                <ul>{categories.map((cat) => renderCategory(cat))}</ul>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsPriceOpen(!isPriceOpen)}
          >
            <label className="block mb-2 font-medium text-gray-700">
              Price
            </label>
            <span className="text-gray-500">
              {isPriceOpen ? (
                <span className="text-2xl font-bold">-</span>
              ) : (
                <span className="text-2xl font-bold">+</span>
              )}
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isPriceOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li
                className={`cursor-pointer hover:text-blue-500 ${
                  selectedPriceRange === ""
                    ? "text-blue-500 font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => setSelectedPriceRange("")}
              >
                Any
              </li>
              {priceRanges.map((range) => (
                <li
                  key={range.label}
                  className={`cursor-pointer hover:text-blue-500 ${
                    selectedPriceRange === range.label
                      ? "text-blue-500 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setSelectedPriceRange(range.label)}
                >
                  {range.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-3 font-medium text-gray-700">Tags</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const tagList = tags
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t);
              const isSelected = tagList.includes(tag);

              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full border-2 font-medium transition-all duration-200 transform hover:scale-105 shadow-sm ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-500 shadow-md"
                      : "border-gray-300 text-gray-700 bg-white hover:border-blue-300 hover:bg-gray-50"
                  }`}
                  type="button"
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Filters;
