import type { CartItem, OrderTotals } from "../../types/cart.types";

interface CheckoutSummaryProp {
  cart: CartItem[];
  totals: OrderTotals;
}

export default function CheckoutSummary({ cart, totals }: CheckoutSummaryProp) {
  return (
    <div className="bg-white min-h-100 rounded-xl py-2 sticky top-25">
      <h2 className="text-xl font-semibold mb-6 text-slate-600">Summary</h2>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.ProductId}
            className="flex justify-between items-start pb-4 border-b border-gray-100"
          >
            <div className="flex-1">
              <p className="font-medium text-slate-600">{item.ProductName}</p>
              <p className="text-sm text-gray-500">Qty: {item.Quantity}</p>
            </div>
            <p className="font-semibold text-gray-600">
              ${(item.UnitPrice * item.Quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-xl font-semibold">
        <span className="text-slate-600">Total</span>
        <span className="text-slate-600">${totals.TotalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}
