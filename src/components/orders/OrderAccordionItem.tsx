import { useState } from "react";

function OrderAccordionItem({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const paymentMutation = useMockPaymentMutation();

  const orderDate = formatOrderDate(order.createdAt);
  const estimatedDelivery = getEstimatedDelivery(
    order.deliveredAt,
    order.shippedAt
  );
  const paymentStatus = mapPaymentStatus(order.paymentStatus);
  const isPaid = paymentStatus === "Completed" || paymentStatus === "Paid";

  const handlePayment = () => {
    paymentMutation.mutate(order.id);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
      {/* Collapsed View - Essential Info */}
      <div
        className="p-4 bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200"
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="font-semibold text-gray-900">
                #{order.orderNumber}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {isPaid ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Paid
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  COD
                </span>
              )}
            </div>

            <div className="hidden sm:flex items-center text-sm text-gray-600 space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{orderDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Package className="h-4 w-4" />
                <span>{estimatedDelivery}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-900">
              {formatCurrency(order.totalAmount)}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Mobile-friendly basic info */}
        <div className="sm:hidden mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{orderDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Package className="h-4 w-4" />
            <span>{estimatedDelivery}</span>
          </div>
        </div>
      </div>

      {/* Expanded View - Detailed Info */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Items */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
              <div className="space-y-2">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm bg-white p-3 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-gray-900">
                        {item.productName}
                      </span>
                      <span className="text-gray-500 ml-2">
                        ×{item.quantity}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details & Actions */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Order Details
                </h4>
                <div className="bg-white p-3 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="text-gray-900">{orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Status:</span>
                    <span className="text-gray-900">{estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className="text-gray-900">{paymentStatus}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span className="text-gray-900">Total Amount:</span>
                    <span className="text-gray-900">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Action */}
              {!isPaid && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Payment Options
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePayment();
                    }}
                    disabled={paymentMutation.isPending}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {paymentMutation.isPending ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Online Now
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderAccordionItem;
