import type { Order } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

interface OrderStatusProps {
  order: Order;
}

function OrderStatus({ order }: OrderStatusProps) {
  const statusColor =
    {
      Processing: "bg-yellow-500",
      Shipped: "bg-blue-500",
      Delivered: "bg-green-500",
      Cancelled: "bg-red-500",
    }[order.status] || "bg-gray-500";

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-2">Order #{order.id}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="mb-2">
            <span className="font-medium">Status: </span>
            <span className={`text-white px-2 py-1 rounded ${statusColor}`}>
              {order.status}
            </span>
          </p>
          <p className="mb-2">
            <span className="font-medium">Order Date: </span>
            {order.date}
          </p>
          <p className="mb-2">
            <span className="font-medium">Estimated Delivery: </span>
            {order.estimatedDelivery}
          </p>
          <p className="mb-2">
            <span className="font-medium">Total: </span>
            {formatCurrency(order.total)}
          </p>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2">Items</h3>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
