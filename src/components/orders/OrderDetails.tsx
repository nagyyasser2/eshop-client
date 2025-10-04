import { useMutation } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/formatCurrency";
import { createCheckoutSession } from "../../api/payment";
import {
  formatOrderDate,
  getPaymentStatusString,
  getShippingStatusString,
} from "../../utils/order.util";
import type { Order } from "../../types/order.types";

interface OrderDetailsProps {
  order: Order;
}

// utility to calculate delivery estimate
function getEstimatedDelivery(
  deliveredAt?: string | null,
  shippedAt?: string | null
) {
  if (deliveredAt) return `Delivered on ${formatOrderDate(deliveredAt)}`;
  if (shippedAt) return `Shipped on ${formatOrderDate(shippedAt)}`;
  return "Not shipped yet";
}

// Payment status: 0=Pending, 1=Completed, 2=Failed
function getPaymentStatusStyle(status: number) {
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
}

// Shipping status: 0=Pending, 1=Shipped, 2=Delivered
function getShippingStatusStyle(status: number) {
  switch (status) {
    case 0:
      return "bg-blue-100 text-blue-800";
    case 1:
      return "bg-purple-100 text-purple-800";
    case 2:
      return "bg-teal-100 text-teal-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const { mutate: startCheckout } = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      console.log(data);
      if (data?.Url) {
        window.location.href = data.Url;
      }
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Order Details</h2>

      <div className="grid gap-2">
        <p>
          <span className="font-medium">Order ID:</span> {order.Id}
        </p>
        <p>
          <span className="font-medium">Date:</span>{" "}
          {formatOrderDate(order.CreatedAt)}
        </p>
        <p>
          <span className="font-medium">Total:</span>{" "}
          {formatCurrency(order.TotalAmount)}
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium">Payment Status:</span>
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${getPaymentStatusStyle(
              order.PaymentStatus
            )}`}
          >
            {getPaymentStatusString(order.PaymentStatus)}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium">Shipping Status:</span>
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${getShippingStatusStyle(
              Number(order.ShippingStatus)
            )}`}
          >
            {getShippingStatusString(order.ShippingStatus)}
          </span>
        </p>
      </div>

      {order.PaymentStatus === 0 && (
        <button
          onClick={() => startCheckout(order.Id)}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 cursor-pointer"
        >
          Pay Now
        </button>
      )}
    </div>
  );
}
