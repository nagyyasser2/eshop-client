import type { Order } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

interface OrderStatusProps {
  order: Order;
}

function OrderStatus({ order }: OrderStatusProps) {
  const statusColor =
    {
      Processing: "bg-yellow-100 text-yellow-800 ring-yellow-500",
      Shipped: "bg-blue-100 text-blue-800 ring-blue-500",
      Delivered: "bg-green-100 text-green-800 ring-green-500",
      Cancelled: "bg-red-100 text-red-800 ring-red-500",
    }[order.status] || "bg-gray-100 text-gray-800 ring-gray-500";

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      <td className="py-4 px-6">
        <span className="font-semibold text-gray-900">#{order.id}</span>
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor} ring-1 ring-inset`}
        >
          {order.status}
        </span>
      </td>
      <td className="py-4 px-6 text-gray-700">{order.date}</td>
      <td className="py-4 px-6 text-gray-700">{order.estimatedDelivery}</td>
      <td className="py-4 px-6 font-medium text-gray-900">
        {formatCurrency(order.total)}
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-col space-y-1">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-700">
                {item.name} (x{item.quantity})
              </span>
              <span className="text-gray-900">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
}

export default OrderStatus;
