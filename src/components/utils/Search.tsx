import { useRef, useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";

interface SearchProps {
  onSearchSubmit?: () => void;
}

function Search({ onSearchSubmit }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts (for mobile)
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const clearSearch = () => {
    setSearchQuery("");
    searchRef.current?.focus();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`, {
      replace: true,
    });

    // Call callback if provided (to close mobile search)
    if (onSearchSubmit) {
      // onSearchSubmit();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center transition-all duration-300 ease-in-out hover:transform hover:scale-102">
          <div className="absolute left-3 z-10">
            <FaSearch className="h-4 w-4 text-slate-400 transition-colors duration-200" />
          </div>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-full border-2 border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 transition-all duration-300 ease-in-out"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 z-10 p-1 rounded-full hover:bg-slate-200 transition-colors duration-200"
            >
              <FaTimes className="h-3 w-3 text-slate-400 hover:text-slate-600" />
            </button>
          )}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 transition-opacity duration-300 -z-10"
            style={{ transform: "scale(1.02)" }}
          />
        </div>
      </form>
    </div>
  );
}

export default Search;
