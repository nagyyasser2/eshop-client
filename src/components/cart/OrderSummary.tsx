import { Truck } from "lucide-react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const OrderSummary = ({
  subtotal,
  total,
}: {
  subtotal: number;
  total: number;
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Order Summary
        </h2>

        {/* Order totals */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Updated Payment Info */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <Truck size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              💡 <strong>Place Order First</strong> — Your order will be
              confirmed immediately. You can choose to pay online later in My
              Orders or pay cash on delivery.
            </p>
          </div>
        </div>

        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            🚚 No payment required now — Order first, then choose your payment
            method in My Orders page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
