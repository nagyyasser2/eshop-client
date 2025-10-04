import { type FC } from "react";

const OrderSkeleton: FC = () => {
  return (
    <div className="rounded-1xl bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl overflow-hidden">
      <div className="p-0 space-y-2">
        {/* Render multiple skeleton items to mimic a list of orders */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 transform"
          >
            <div className="w-full flex justify-between items-center px-3 py-2">
              <div className="flex items-center space-x-4">
                {/* Skeleton for order number circle */}
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                <div className="text-left">
                  {/* Skeleton for order number */}
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                  {/* Skeleton for order date */}
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Skeleton for payment status */}
                <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-full animate-pulse">
                  <div className="w-4 h-4 bg-gray-300 rounded-full" />
                  <div className="h-4 w-12 bg-gray-300 rounded" />
                </div>
                {/* Skeleton for accordion arrow */}
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSkeleton;
