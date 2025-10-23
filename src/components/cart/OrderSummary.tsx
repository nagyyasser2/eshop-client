import { Truck, CreditCard, Package } from "lucide-react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

interface OrderSummaryProps {
  subtotal: number;
  total: number;
  shipping?: number;
  discount?: number;
  tax?: number;
  itemCount?: number;
  paymentMethod?: string;
}

const OrderSummary = ({
  subtotal,
  total,
  shipping = 0,
  discount = 0,
  tax = 0,
  itemCount = 0,
  paymentMethod = "Cash on Delivery",
}: OrderSummaryProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-25">
        <h2 className="text-xl font-bold bg-gradient-to-r from-slate-600 to-pink-400 bg-clip-text text-transparent mb-6">
          Cart Summary
        </h2>

        {/* Items Info */}
        <div className="flex items-center text-gray-600 mb-4">
          <Package className="w-5 h-5 text-slate-600 mr-2" />
          <span>
            {itemCount} {itemCount === 1 ? "item" : "items"} in cart
          </span>
        </div>

        {/* Breakdown */}
        <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span>{shipping > 0 ? formatCurrency(shipping) : "Free"}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
          )}
          {tax > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center text-xl font-bold mb-6">
          <span className="text-slate-700">Total</span>
          <span className="text-slate-600">{formatCurrency(total)}</span>
        </div>

        {/* Payment Method */}
        <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-200 mb-4">
          <CreditCard size={18} className="text-slate-600 mr-2" />
          <p className="text-sm text-slate-800">
            Payment Method: <strong>{paymentMethod}</strong>
          </p>
        </div>

        {/* Info Boxes */}
        <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <Truck size={20} className="text-slate-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-800">
              💡 <strong>Place Order First</strong> — Your order will be
              confirmed immediately. You can pay online later in{" "}
              <em>My Orders</em> or on delivery.
            </p>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            🚚 No payment required now — Secure your order first, then choose
            your payment method anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
