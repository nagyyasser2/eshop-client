import { useMutation } from "@tanstack/react-query";
import type { OrderDto } from "../../api/orders";
import { formatCurrency } from "../../utils/formatCurrency";
import { createCheckoutSession } from "../../api/payment";
import {
  formatOrderDate,
  getEstimatedDelivery,
  mapPaymentStatus,
} from "../../utils/order.util";

interface OrderDetailsProps {
  order: OrderDto;
}

function OrderDetails({ order }: OrderDetailsProps) {
  const paymentMutation = useMutation({
    mutationFn: (orderId: number) => createCheckoutSession(orderId),
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
    },
  });

  const orderDate = formatOrderDate(order.createdAt);
  const estimatedDelivery = getEstimatedDelivery(
    order.deliveredAt,
    order.shippedAt
  );

  const handlePayment = () => {
    paymentMutation.mutate(order.id);
  };

  const paymentStatus = mapPaymentStatus(order.paymentStatus);
  const isPaid = paymentStatus === "Completed" || paymentStatus === "Paid";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {!isPaid && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-100">
            <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Payment
            </h4>
            <button
              onClick={handlePayment}
              disabled={paymentMutation.isPending}
              className={`w-full  cursor-pointer text-center bg-gradient-to-r from-green-500 to-emerald-600 
                text-white font-semibold py-4 px-6 rounded-2xl  
                 focus:outline-none 
                focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                ${
                  paymentMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
            >
              {paymentMutation.isPending ? <>Processing...</> : <>Pay Now</>}
            </button>
          </div>
        )}

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
          <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Order Date
          </h4>
          <p className="text-gray-800 font-medium">{orderDate}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl border border-green-100">
          <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Est. Delivery
          </h4>
          <p className="text-gray-800 font-medium">{estimatedDelivery}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-100">
          <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z"
                clipRule="evenodd"
              />
            </svg>
            Total
          </h4>
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {formatCurrency(order.totalAmount)}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-6 rounded-xl border border-gray-100">
        <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4 flex items-center">
          <svg
            className="w-4 h-4 mr-2 text-purple-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"
              clipRule="evenodd"
            />
          </svg>
          Order Items
        </h4>
        <div className="space-y-3">
          {order.orderItems.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-800 font-medium">
                  {item.productName}
                </span>
                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                  x{item.quantity}
                </span>
              </div>
              <span className="font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {formatCurrency(item.totalPrice)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
