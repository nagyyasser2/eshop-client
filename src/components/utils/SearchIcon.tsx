import Search from "./Search";

export default function SearchIcon({
  searchRef,
  isSearchVisible,
  setIsSearchVisible,
}: {
  searchRef: any;
  isSearchVisible: boolean;
  setIsSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setIsSearchVisible(!isSearchVisible)}
        className="p-2 transition-colors duration-200"
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="searchGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#4299e1", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#3182ce", stopOpacity: 1 }}
              />
            </linearGradient>
            <filter
              id="searchShadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0.5"
                dy="1"
                stdDeviation="0.5"
                floodColor="#000000"
                floodOpacity="0.1"
              />
            </filter>
          </defs>
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke="url(#searchGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#searchShadow)"
          />
        </svg>
      </button>

      {/* Search Dropdown */}
      {isSearchVisible && (
        <div className="fixed sm:absolute top-20 sm:top-14 right-4 sm:right-0 left-4 sm:left-auto sm:mt-2 w-auto sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
          <Search onSearchSubmit={() => setIsSearchVisible(false)} />
        </div>
      )}
    </div>
  );
}
