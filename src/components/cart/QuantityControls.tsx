import type { CartItem } from "../../types/cart.types";
import { formatCurrency } from "../../utils/formatCurrency";

interface QuantityControlsProp {
  item: CartItem;
  handleQuantityChange: (id: number, quantity: number) => void;
  handleRemoveItem: (id: number) => void;
  removingItems: Set<number>;
}

const QuantityControls = ({
  item,
  handleQuantityChange,
  handleRemoveItem,
  removingItems,
}: QuantityControlsProp) => (
  <div className="flex items-center justify-between sm:justify-start space-x-3 w-full sm:w-auto">
    {/* Quantity Controls */}
    <div className="flex items-center border border-gray-300 rounded-lg">
      <button
        onClick={() => handleQuantityChange(item.ProductId, item.Quantity - 1)}
        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
        disabled={item.Quantity <= 1}
      >
        −
      </button>
      <span className="px-4 py-2 border-x border-gray-300 bg-gray-50 font-medium min-w-[3rem] text-center">
        {item.Quantity}
      </span>
      <button
        onClick={() => handleQuantityChange(item.ProductId, item.Quantity + 1)}
        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
      >
        +
      </button>
    </div>

    {/* Item Total */}
    <div className="text-right min-w-[4rem] sm:min-w-[5rem]">
      <p className="text-sm sm:text-lg font-semibold text-gray-900">
        {formatCurrency(item.UnitPrice * item.Quantity)}
      </p>
    </div>

    {/* Remove Button */}
    <button
      onClick={() => handleRemoveItem(item.ProductId)}
      disabled={removingItems.has(item.ProductId)}
      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 flex-shrink-0"
    >
      {removingItems.has(item.ProductId) ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      )}
    </button>
  </div>
);

export default QuantityControls;
