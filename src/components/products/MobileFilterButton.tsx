import filterIcon from "../../assets/filters-2-svgrepo-com.svg";

export default function MobileFilterButton({ toggleFilters }: any) {
  return (
    <div className="lg:hidden flex items-center mb-4">
      <button
        onClick={toggleFilters}
        aria-label="Toggle filters"
        className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
      >
        <img
          src={filterIcon}
          alt="Filter"
          className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
        />
      </button>
    </div>
  );
}
