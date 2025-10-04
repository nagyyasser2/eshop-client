import type { CartItem, OrderTotals } from "../../types/cart.types";

interface CheckoutSummaryProp {
  cart: CartItem[];
  totals: OrderTotals;
}

export default function CheckoutSummary({ cart, totals }: CheckoutSummaryProp) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 sticky top-25">
      <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.ProductId}
            className="flex justify-between items-start pb-4 border-b border-gray-100"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.ProductName}</p>
              <p className="text-sm text-gray-500">Qty: {item.Quantity}</p>
            </div>
            <p className="font-semibold text-gray-800">
              ${(item.UnitPrice * item.Quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${totals.SubTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>${totals.ShippingAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>${totals.TaxAmount.toFixed(2)}</span>
        </div>
        {totals.DiscountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${totals.DiscountAmount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-xl font-bold">
        <span className="text-gray-800">Total</span>
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ${totals.TotalAmount.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
