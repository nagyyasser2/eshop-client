import filterIcon from "../../assets/filters-2-svgrepo-com.svg";

export default function MobileFilterButton({ toggleFilters }: any) {
  return (
    <div className="lg:hidden flex items-center mb-4">
      <img
        onClick={toggleFilters}
        src={filterIcon}
        alt="Filter"
        className="h-8 w-8 cursor-pointer text-slate-600"
      />
    </div>
  );
}
