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
    <div className="rounded-1xl bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
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
                className="w-full flex justify-between items-center px-3 py-2 cursor-pointer transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    #{order.OrderNumber?.slice(-2)}
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-gray-900 text-lg">
                      #{order.OrderNumber}
                    </span>
                    <span className="block text-sm text-gray-600 font-medium">
                      {formatOrderDate(order.CreatedAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {isPaid ? (
                      <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-green-800 font-bold text-sm">
                          Paid
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-2 rounded-full border border-orange-200">
                        <svg
                          className="w-4 h-4 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-orange-800 font-bold text-sm">
                          {paymentStatus}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <svg
                      className={`w-5 h-5 text-purple-600 transition-transform duration-300 ${
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
                <div className="px-6 py-6">
                  <OrderDetails order={order} />
                </div>
              )}
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="text-center py-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-500">
              Your order history will appear here once you make your first
              purchase.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
