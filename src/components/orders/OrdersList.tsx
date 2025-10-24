import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createCheckoutSession } from "../../api/payment";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  formatOrderDate,
  getPaymentStatusString,
  getShippingStatusString,
} from "../../utils/order.util";
import type { Order } from "../../types/order.types";

export default function OrdersList({ orders }: { orders: Order[] }) {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const { mutate: startCheckout } = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      if (data?.Url) {
        window.location.href = data.Url;
      }
    },
  });

  const toggleOrder = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const getShippingSteps = (status: string) => {
    const steps = ["Pending", "Processing", "Shipped", "Delivered"];
    const currentIndex = steps.indexOf(status);
    return steps.map((step, index) => ({
      label: step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const getPaymentStatusStyle = (status: number) => {
    switch (status) {
      case 0:
        return "bg-yellow-100 text-yellow-800";
      case 1:
        return "bg-green-100 text-green-800";
      case 2:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 px-6 sm:px-0">
      {orders.map((order: Order, index: number) => {
        const orderId = `${order.Id ?? "no-id"}-${index}`;
        const isExpanded = expandedOrders.has(orderId);
        const paymentStatus = getPaymentStatusString(order.PaymentStatus);
        const shippingStatus = getShippingStatusString(order.ShippingStatus);
        const steps = getShippingSteps(shippingStatus);

        return (
          <div key={orderId} className="bg-white rounded-lg overflow-hidden">
            {/* Header - Always Visible */}
            <div
              className="py-4 px-0 sm:px-4 cursor-pointer "
              onClick={() => toggleOrder(orderId)}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 flex-1">
                  <div>
                    <span className="block font-semibold text-slate-700 text-sm sm:text-base">
                      #{order.OrderNumber}
                    </span>
                    <span className="block text-xs text-slate-600">
                      {formatOrderDate(order.CreatedAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${getPaymentStatusStyle(
                        order.PaymentStatus as any
                      )}`}
                    >
                      {paymentStatus}
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {formatCurrency(order.TotalAmount)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 hidden sm:inline">
                    {isExpanded ? "Hide" : "Show"} Details
                  </span>
                  <svg
                    className={`w-5 h-5 text-slate-600 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Collapsible Content */}
            {isExpanded && (
              <div className="px-0 sm:px-4 pb-6">
                <div className="pt-4">
                  {/* Shipping Status Tracker */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-slate-700 mb-3">
                      Shipping Status
                    </h3>
                    <div className="flex items-center gap-2">
                      {steps.map((step, idx) => (
                        <div
                          key={step.label}
                          className="flex items-center flex-1"
                        >
                          <div className="flex flex-col items-center w-full">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step.completed ? "bg-blue-500" : "bg-gray-200"
                              }`}
                            >
                              {step.completed && (
                                <svg
                                  className="w-5 h-5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <span
                              className={`mt-2 text-xs font-medium ${
                                step.completed
                                  ? "text-slate-700"
                                  : "text-gray-400"
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                          {idx < steps.length - 1 && (
                            <div
                              className={`h-0.5 flex-1 -mx-2 ${
                                step.completed ? "bg-blue-500" : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          Total Amount
                        </span>
                        <p className="text-lg font-bold text-slate-800">
                          {formatCurrency(order.TotalAmount)}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </span>
                        <p className="text-sm font-medium text-slate-700">
                          {formatCurrency(order.SubTotal)}
                        </p>
                      </div>
                      {order.TaxAmount > 0 && (
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">
                            Tax
                          </span>
                          <p className="text-sm font-medium text-slate-700">
                            {formatCurrency(order.TaxAmount)}
                          </p>
                        </div>
                      )}
                      {order.ShippingAmount > 0 && (
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">
                            Shipping
                          </span>
                          <p className="text-sm font-medium text-slate-700">
                            {formatCurrency(order.ShippingAmount)}
                          </p>
                        </div>
                      )}
                      {order.DiscountAmount > 0 && (
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">
                            Discount
                          </span>
                          <p className="text-sm font-medium text-green-600">
                            -{formatCurrency(order.DiscountAmount)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          Shipping Address
                        </span>
                        <p className="text-sm font-medium text-slate-700 mt-1">
                          {order.ShippingFirstName} {order.ShippingLastName}
                        </p>
                        <p className="text-sm text-slate-600">
                          {order.ShippingAddress}
                        </p>
                        <p className="text-sm text-slate-600">
                          {order.ShippingCity}, {order.ShippingState}{" "}
                          {order.ShippingZipCode}
                        </p>
                        <p className="text-sm text-slate-600">
                          {order.ShippingCountry}
                        </p>
                        {order.ShippingPhone && (
                          <p className="text-sm text-slate-600 mt-1">
                            {order.ShippingPhone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.OrderItems && order.OrderItems.length > 0 && (
                    <div className="pt-4">
                      <h3 className="text-sm font-semibold text-slate-700 mb-3">
                        Order Items ({order.OrderItems.length})
                      </h3>
                      <div className="space-y-2">
                        {order.OrderItems.map((item, idx) => (
                          <div
                            key={`${item.Id ?? idx}`}
                            className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-800">
                                {item.ProductName}
                              </p>
                              {item.ProductSKU && (
                                <p className="text-xs text-gray-500">
                                  SKU: {item.ProductSKU}
                                </p>
                              )}
                              <p className="text-xs text-gray-600 mt-1">
                                Qty: {item.Quantity} ×{" "}
                                {formatCurrency(item.UnitPrice)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-slate-800">
                                {formatCurrency(item.TotalPrice)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {order.Notes && (
                    <div className="pt-4 mt-4">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        Notes
                      </span>
                      <p className="text-sm text-slate-700 mt-1">
                        {order.Notes}
                      </p>
                    </div>
                  )}

                  {/* Pay Now Button */}
                  {(order.PaymentStatus as unknown) === 0 && (
                    <div className="pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-slate-700 mb-3">
                        Payment Status
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex px-3 py-1.5 rounded-md text-xs font-semibold ${getPaymentStatusStyle(
                              order.PaymentStatus as any
                            )}`}
                          >
                            {paymentStatus}
                          </span>
                        </div>
                        <button
                          onClick={() => startCheckout(order.Id)}
                          className="w-full sm:w-auto px-8 py-2.5 rounded-md bg-slate-600 text-white text-sm font-semibold cursor-pointer hover:bg-slate-700 active:bg-blue-800 transition-colors  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Complete Payment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
