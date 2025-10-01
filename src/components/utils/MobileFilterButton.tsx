export default function MobileFilterButton({ toggleFilters }: any) {
  return (
    <div className="lg:hidden flex items-center justify-between mb-4">
      <img
        src="/filter.svg"
        alt="Filter"
        className="h-10 w-10 cursor-pointer"
        onClick={toggleFilters}
      />
    </div>
  );
}
