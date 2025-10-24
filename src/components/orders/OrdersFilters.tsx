import type { Dispatch } from "react";

const orderStatus = [
  { id: 1, name: "All" },
  { id: 2, name: "Pending" },
  { id: 3, name: "Processing" },
  { id: 4, name: "Shipped" },
  { id: 5, name: "Deliverd" },
  { id: 6, name: "Cancelled" },
];

interface OrdersFiltersProps {
  filterKey: string;
  setFilterKey: Dispatch<React.SetStateAction<string>>;
}

export default function OrdersFilters({
  filterKey,
  setFilterKey,
}: OrdersFiltersProps) {
  const handleFilterClick = (key: string) => {
    setFilterKey(key);
  };
  return (
    <div className="flex flex-col gap-6 px-6 sm:px-4 text-slate-700">
      <p className="px-1 font-xs">Track Your Orders</p>
      <div className="flex gap-2 overflow-scroll scrollbar-hide">
        {orderStatus.map((item) => {
          return (
            <div
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200  cursor-pointer
                ${
                  item.name === filterKey
                    ? "bg-slate-600 text-white"
                    : "bg-gray-100 text-slate-600"
                }
              `}
              onClick={() => handleFilterClick(item.name)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
