import { type FC } from "react";

const OrderSkeleton: FC = () => {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="p-2 sm:p-2 md:p-2 px-0 space-y-3 sm:space-y-4">
        {/* Render multiple skeleton items to mimic a list of orders */}
        {[...Array(1)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden transition-all duration-300 transform"
          >
            <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Skeleton for order number circle */}
                <div className="text-left">
                  {/* Skeleton for order number */}
                  <div className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-200 rounded animate-pulse mb-1 sm:mb-2" />
                  {/* Skeleton for order date */}
                  <div className="h-3 sm:h-4 w-24 sm:w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
                {/* Skeleton for payment status */}
                <div className="flex items-center space-x-2 bg-gray-200 px-3 sm:px-8 py-1.5 sm:py-2 rounded-lg animate-pulse"></div>
                {/* Skeleton for accordion arrow */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSkeleton;
