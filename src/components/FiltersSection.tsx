// FiltersSection.tsx
import { FaFilter } from "react-icons/fa";
import SearchBar from "./SearchBar";

interface FiltersSectionProps {
  searchQuery: string;
  sortBy: string;
  onSearch: (query: string) => void;
  onSortChange: (sortBy: string) => void;
  onMobileFiltersOpen: () => void;
}

function FiltersSection({
  searchQuery,
  sortBy,
  onSearch,
  onSortChange,
  onMobileFiltersOpen,
}: FiltersSectionProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-3 items-center">
        {/* Header */}
        <div>
          <div className="container mx-auto pl-0 pr-2">
            <div className="flex justify-center items-center gap-4">
              {/* Mobile Filter Button */}
              <button
                onClick={onMobileFiltersOpen}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaFilter className="text-sm" />
                <span className="text-sm font-medium">Filters</span>
              </button>

              {/* Search Bar */}
              <SearchBar onSearch={onSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltersSection;
