export default function MobileFilterButton({ toggleFilters }: any) {
  return (
    <div className="lg:hidden flex items-center mb-4" onClick={toggleFilters}>
      <img
        src="/filter.svg"
        alt="Filter"
        className="h-10 w-10 cursor-pointer"
      />
      <p className="text-xl">Filters</p>
    </div>
  );
}
