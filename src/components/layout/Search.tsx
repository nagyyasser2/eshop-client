import { useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearchSubmit?: () => void;
}

function Search({ searchQuery, setSearchQuery, onSearchSubmit }: SearchProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/products?search=${encodeURIComponent(query.trim())}`, {
      replace: true,
    });
    onSearchSubmit?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    handleSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center transition-all duration-300 ease-in-out hover:transform hover:scale-102">
          <div className="absolute left-3 z-10">
            <FaSearch className="h-4 w-4 text-slate-400" />
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-full border-2 border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-slate-300 transition-all duration-300"
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
        </div>
      </form>
    </div>
  );
}

export default Search;
