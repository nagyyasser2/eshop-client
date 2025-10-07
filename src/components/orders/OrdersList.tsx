import { useState } from "react";
import OrderDetails from "./OrderDetails";
import type { Order } from "../../types/order.types";
import {
  formatOrderDate,
  getPaymentStatusString,
} from "../../utils/order.util";

export default function OrdersList({ orders }: { orders: Order[] }) {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const toggleAccordion = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="rounded-1xl  overflow-hidden">
      <div className="p-0 space-y-2 rounded-2xl">
        {orders.map((order: Order, index: number) => {
          const paymentStatus = getPaymentStatusString(order.PaymentStatus);
          const isPaid = paymentStatus === "Completed";
          const isExpanded = expandedOrder === order.Id;

          return (
            <div
              key={`${order.Id ?? "no-id"}-${index}`}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 transform"
            >
              <button
                onClick={() => toggleAccordion(order.Id)}
                className="w-full flex justify-between items-center px-3 py-3 sm:px-4 sm:py-4 cursor-pointer transition-all duration-300"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                    #{order.OrderNumber?.slice(-2)}
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-gray-900 text-base sm:text-lg md:text-xl">
                      #{order.OrderNumber}
                    </span>
                    <span className="block text-xs sm:text-sm text-gray-600 font-medium">
                      {formatOrderDate(order.CreatedAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    {isPaid ? (
                      <div className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-200">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-green-800 font-bold text-xs sm:text-sm">
                          Paid
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full border border-orange-200">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-orange-800 font-bold text-xs sm:text-sm">
                          {paymentStatus}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <svg
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-purple-600 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 sm:px-6 py-4 sm:py-6">
                  <OrderDetails order={order} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
