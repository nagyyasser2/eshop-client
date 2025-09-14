export default function MobileFilterButton({
  toggleFilters,
  productsLength,
}: any) {
  return (
    <div className="lg:hidden flex items-center justify-between mb-4">
      <button
        onClick={toggleFilters}
        className="px-4 py-2  text-blue rounded-lg  transition-colors flex items-center justify-center cursor-pointer"
        aria-label="Toggle filters"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <p className="ml-2 hidden  xs:inline mr-5">Filters</p>
      </button>
      <div>
        <p className="text-slate-500">( {productsLength} ) - products</p>
      </div>
    </div>
  );
}
