import React, { useEffect, useState, useRef } from "react";
import getCategories from "../../api/catalog";
import CategorySkeleton from "../sceletons/CategorySkeleton";
import type { Category } from "../../types/category.types";

type FiltersProps = {
  onFilterChange: (filters: {
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    tags?: string;
    categoryId?: string;
  }) => void;
  isFiltersOpen: boolean;
  toggleFilters: () => void;
  initialCategoryId?: string;
  initialCategoryName?: string;
};

const priceRanges = [
  { label: "0 - 500", min: 0, max: 500 },
  { label: "500 - 2000", min: 500, max: 2000 },
  { label: "2000 - 6000", min: 2000, max: 6000 },
  { label: "6000 - above", min: 6000, max: 100000 },
];

const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  isFiltersOpen,
  toggleFilters,
  initialCategoryId,
  initialCategoryName,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>(
    initialCategoryId?.toString() || "All"
  );

  // Dropdown states for desktop
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] =
    useState<boolean>(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] =
    useState<boolean>(false);

  // Refs for click outside detection
  const categoryRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await getCategories();
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

  // Set initial category only on first mount or when explicitly changed from parent
  useEffect(() => {
    if (initialCategoryId) {
      setCategoryId(initialCategoryId.toString());
    }
  }, [initialCategoryId]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
      if (
        priceRef.current &&
        !priceRef.current.contains(event.target as Node)
      ) {
        setIsPriceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply filters when selection changes
  useEffect(() => {
    const selectedRange = priceRanges.find(
      (range) => range.label === selectedPriceRange
    );
    const filters = {
      minPrice: selectedRange ? selectedRange.min : undefined,
      maxPrice: selectedRange ? selectedRange.max : undefined,
      categoryId: categoryId !== "All" ? categoryId : undefined,
    };
    onFilterChange(filters);
  }, [selectedPriceRange, categoryId, onFilterChange]);

  const selectedCategoryName =
    categoryId.toString() === "All"
      ? "All Categories"
      : categories.find((c) => c.Id?.toString() === categoryId.toString())
          ?.Name ||
        (initialCategoryId ? `${initialCategoryName}` : "All Categories");

  return (
    <>
      {/* Mobile backdrop */}
      {isFiltersOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden opacity-100 pointer-events-auto backdrop-blur-sm bg-black/30"
          onClick={toggleFilters}
        ></div>
      )}

      {/* Desktop: Horizontal Flex Layout */}
      <div className="hidden lg:flex gap-4 items-center mb-6 flex-wrap">
        {/* Category Dropdown */}
        <div className="relative" ref={categoryRef}>
          <button
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center gap-2 min-w-[180px] justify-between"
          >
            <span className="font-medium text-gray-700">
              {selectedCategoryName}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isCategoryDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isCategoryDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="p-4">
                  <CategorySkeleton />
                </div>
              ) : error ? (
                <div className="p-4 text-red-500">{error}</div>
              ) : (
                <>
                  <div
                    className={`py-2 px-4 cursor-pointer hover:bg-blue-50 transition-colors ${
                      categoryId === "All"
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setCategoryId("All");
                      setIsCategoryDropdownOpen(false);
                    }}
                  >
                    All Categories
                  </div>
                  {categories.map((categoryItem) => (
                    <div
                      key={categoryItem.Id}
                      className={`py-2 px-4 cursor-pointer hover:bg-blue-50 transition-colors ${
                        categoryId === categoryItem.Id?.toString()
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        setCategoryId(categoryItem.Id?.toString());
                        setIsCategoryDropdownOpen(false);
                      }}
                    >
                      {categoryItem.Name}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Price Dropdown */}
        <div className="relative" ref={priceRef}>
          <button
            onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center gap-2 min-w-[180px] justify-between"
          >
            <span className="font-medium text-gray-700">
              {selectedPriceRange || "Any Price"}
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isPriceDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isPriceDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              <div
                className={`py-2 px-4 cursor-pointer hover:bg-blue-50 transition-colors ${
                  selectedPriceRange === ""
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setSelectedPriceRange("");
                  setIsPriceDropdownOpen(false);
                }}
              >
                Any Price
              </div>
              {priceRanges.map((range) => (
                <div
                  key={range.label}
                  className={`py-2 px-4 cursor-pointer hover:bg-blue-50 transition-colors ${
                    selectedPriceRange === range.label
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedPriceRange(range.label);
                    setIsPriceDropdownOpen(false);
                  }}
                >
                  {range.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Sidebar */}
      <aside
        className={`lg:hidden fixed p-4 flex top-0 left-0 h-full w-80 bg-white border border-gray-200 rounded-r-2xl overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
          isFiltersOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={toggleFilters}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-full">
          {/* Category Filters */}
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-800 text-lg">
              Category
            </label>
            {loading ? (
              <CategorySkeleton />
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="space-y-1">
                <div
                  className={`py-2 px-3 cursor-pointer rounded-lg transition-colors duration-200 ${
                    categoryId === "All"
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setCategoryId("All")}
                >
                  All Categories
                </div>
                {categories.map((categoryItem, index) => (
                  <div
                    key={categoryItem.Id ?? `category-${index}`}
                    className={`py-2 px-3 cursor-pointer rounded-lg transition-colors duration-200 ${
                      categoryId === categoryItem.Id?.toString()
                        ? "text-blue-600 font-semibold bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setCategoryId(categoryItem.Id?.toString())}
                  >
                    {categoryItem.Name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Filters */}
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-800 text-lg">
              Price Range
            </label>
            <div className="space-y-1">
              <div
                className={`py-2 px-3 cursor-pointer rounded-lg transition-colors duration-200 ${
                  selectedPriceRange === ""
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedPriceRange("")}
              >
                Any Price
              </div>
              {priceRanges.map((range) => (
                <div
                  key={range.label}
                  className={`py-2 px-3 cursor-pointer rounded-lg transition-colors duration-200 ${
                    selectedPriceRange === range.label
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedPriceRange(range.label)}
                >
                  {range.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Filters;
