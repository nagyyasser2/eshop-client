import React from "react";

type FiltersProps = {
  onFilterChange: (filters: {
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    tags?: string[];
    category?: string;
  }) => void;
  isFiltersOpen: boolean;
  toggleFilters: () => void;
};

// Sample tags and categories - adjust as needed or fetch dynamically
const availableTags = ["New", "Sale", "Popular", "Limited"];
const availableCategories = [
  "All",
  "Clothing",
  "Electronics",
  "Shoes",
  "Accessories",
];

// Predefined price ranges
const priceRanges = [
  { label: "0 - 100", min: 0, max: 100 },
  { label: "100 - 500", min: 100, max: 500 },
  { label: "500 - 1000", min: 500, max: 1000 },
  { label: "1000 - 1500", min: 1000, max: 1500 },
  { label: "1500 - 2000", min: 1500, max: 2000 },
  { label: "2000 - 10000", min: 2000, max: 10000 },
];

const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  isFiltersOpen,
  toggleFilters,
}) => {
  const [selectedPriceRange, setSelectedPriceRange] =
    React.useState<string>("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState<string>("All");
  const [isPriceOpen, setIsPriceOpen] = React.useState<boolean>(true);
  const [isCategoryOpen, setIsCategoryOpen] = React.useState<boolean>(true);

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  React.useEffect(() => {
    const selectedRange = priceRanges.find(
      (range) => range.label === selectedPriceRange
    );
    onFilterChange({
      minPrice: selectedRange ? selectedRange.min : undefined,
      maxPrice: selectedRange ? selectedRange.max : undefined,
      tags: tags.length > 0 ? tags : undefined,
      category: category !== "All" ? category : undefined,
    });
  }, [selectedPriceRange, tags, category, onFilterChange]);

  return (
    <>
      {/* Mobile overlay */}
      {isFiltersOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden opacity-100 pointer-events-auto backdrop-blur-sm"
          onClick={toggleFilters}
        ></div>
      )}

      {/* Filters sidebar */}
      <aside
        className={`fixed rounded-md lg:sticky top-0 lg:top-[88px] left-0 h-full w-3/4 max-w-md lg:w-64 bg-white p-6 overflow-y-auto z-50 lg:z-auto transform transition-transform duration-300 ease-in-out shadow-[0_0_5px_rgba(0,0,0,0.1)] ${
          isFiltersOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:self-start`}
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
            <ul className="list-disc pl-5 space-y-2 mt-2">
              {availableCategories.map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer hover:text-blue-500 ${
                    category === cat
                      ? "text-blue-500 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
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
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full border-2 font-medium transition-all duration-200 transform hover:scale-105 shadow-sm ${
                  tags.includes(tag)
                    ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-500 shadow-md"
                    : "border-gray-300 text-gray-700 bg-white hover:border-blue-300 hover:bg-gray-50"
                }`}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Filters;
