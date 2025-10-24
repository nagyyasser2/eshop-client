import React, { useEffect, useState, useRef } from "react";
import getCategories from "../../api/catalog";
import CategorySkeleton from "../sceletons/CategorySkeleton";
import type { Category } from "../../types/category.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

const dateRanges = [
  { label: "This Week", value: 7 },
  { label: "This Month", value: 30 },
  { label: "Last 3 Months", value: 90 },
  { label: "Last 6 Months", value: 180 },
  { label: "This Year", value: 365 },
];

const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  isFiltersOpen,
  toggleFilters,
  initialCategoryId,
}) => {
  const queryClient = useQueryClient();

  // ✅ Get cached categories if available
  const cachedCategories = queryClient.getQueryData<Category[]>(["categories"]);

  // ✅ Use React Query to fetch ONLY if not cached
  const {
    data: fetchedCategories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    enabled: !cachedCategories, // 🔥 Only fetch if not already cached
    staleTime: 1000 * 60 * 30, // optional: 30 min cache
  });

  // ✅ Merge cache + fetched data
  const categories = cachedCategories || fetchedCategories || [];

  // States
  const [categoryId, setCategoryId] = useState<string>(
    initialCategoryId?.toString() || "All"
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedDateRange, setSelectedDateRange] = useState("");

  // Dropdowns
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const priceRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // ✅ Sync category with initialCategoryId
  useEffect(() => {
    if (initialCategoryId) {
      setCategoryId(initialCategoryId.toString());
    }
  }, [initialCategoryId]);

  // ✅ Handle outside clicks for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        priceRef.current &&
        !priceRef.current.contains(event.target as Node)
      ) {
        setIsPriceDropdownOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Notify parent when filters change
  useEffect(() => {
    const selectedRange = priceRanges.find(
      (range) => range.label === selectedPriceRange
    );
    const selectedDate = dateRanges.find(
      (range) => range.label === selectedDateRange
    );

    const filters = {
      minPrice: selectedRange?.min,
      maxPrice: selectedRange?.max,
      daysBack: selectedDate?.value,
      categoryId: categoryId !== "All" ? categoryId : undefined,
    };

    onFilterChange(filters);
  }, [selectedPriceRange, selectedDateRange, categoryId, onFilterChange]);

  // ✅ Disable background scroll when filters open
  useEffect(() => {
    if (isFiltersOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isFiltersOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      {isFiltersOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden opacity-100 pointer-events-auto backdrop-blur-sm bg-black/30"
          onClick={toggleFilters}
        ></div>
      )}

      {/* Desktop: Filters Layout */}
      <div className="hidden lg:block mb-6 lg:flex items-start justify-between gap-10">
        {/* Categories - Horizontal scrollable */}
        <div className="mb-4">
          {isLoading && (
            <div className="flex gap-2">
              <CategorySkeleton layout="horizontal" />
            </div>
          )}

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setCategoryId("All")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                categoryId === "All"
                  ? "bg-slate-600 text-white font-semibold shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((categoryItem) => (
              <button
                key={categoryItem.Id}
                onClick={() => setCategoryId(categoryItem.Id?.toString())}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  categoryId === categoryItem.Id?.toString()
                    ? "bg-slate-600 text-white font-semibold shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {categoryItem.Name}
              </button>
            ))}
          </div>
        </div>

        {/* Price and Date Dropdowns */}
        <div className="flex gap-2 items-center flex-wrap">
          {/* Price Dropdown */}
          <div className="relative" ref={priceRef}>
            <button
              onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
              className="px-4 py-2 rounded-lg bg-gray-100  focus:outline-none hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
            >
              <span className="font-normal text-gray-700">
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
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg  z-50 max-h-80 overflow-y-auto">
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

          {/* Date Published Dropdown */}
          <div className="relative" ref={dateRef}>
            <button
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none hover:border-gray-200 transition-all duration-200 flex items-center gap-2"
            >
              <span className="font-normal text-gray-700">
                {selectedDateRange || "Any Time"}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDateDropdownOpen ? "rotate-180" : ""
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
            {isDateDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg  z-50 max-h-80 overflow-y-auto">
                <div
                  className={`py-2 px-4 cursor-pointer hover:bg-blue-50 transition-colors ${
                    selectedDateRange === ""
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedDateRange("");
                    setIsDateDropdownOpen(false);
                  }}
                >
                  Any Time
                </div>
                {dateRanges.map((range) => (
                  <div
                    key={range.label}
                    className={`py-2 px-4 cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedDateRange === range.label
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedDateRange(range.label);
                      setIsDateDropdownOpen(false);
                    }}
                  >
                    {range.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Sidebar */}
      <aside
        className={`lg:hidden fixed p-4 flex top-0 left-0 h-full w-80 bg-white border border-gray-200 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
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

            {isLoading && <CategorySkeleton layout="vertical" />}

            <div className="space-y-1">
              <div
                className={`py-2 px-3 cursor-pointer rounded-lg transition-colors duration-200 ${
                  categoryId === "All"
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setCategoryId("All");
                  if (window.innerWidth < 1024) toggleFilters();
                }}
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
                  onClick={() => {
                    setCategoryId(categoryItem.Id?.toString());
                    if (window.innerWidth < 1024) toggleFilters();
                  }}
                >
                  {categoryItem.Name}
                </div>
              ))}
            </div>
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
                onClick={() => {
                  setSelectedPriceRange("");
                  if (window.innerWidth < 1024) toggleFilters();
                }}
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
                  onClick={() => {
                    setSelectedPriceRange(range.label);
                    if (window.innerWidth < 1024) toggleFilters();
                  }}
                >
                  {range.label}
                </div>
              ))}
            </div>
          </div>

          {/* Date Filters */}
          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-800 text-lg">
              Date Range
            </label>
            <div className="space-y-1">
              <div
                className={`py-2 px-3 cursor-pointer rounded-lg transition-colors duration-200 ${
                  selectedDateRange === ""
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setSelectedDateRange("");
                  if (window.innerWidth < 1024) toggleFilters();
                }}
              >
                Any Date
              </div>
              {dateRanges.map((range) => (
                <div
                  key={range.label}
                  className={`py-2 px-3 cursor-pointer rounded-lg transition-colors duration-200 ${
                    selectedDateRange === range.label
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedDateRange(range.label);
                    if (window.innerWidth < 1024) toggleFilters();
                  }}
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
