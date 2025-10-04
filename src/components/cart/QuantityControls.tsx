import type { CartItem } from "../../types/cart.types";
import { formatCurrency } from "../../utils/formatCurrency";

interface QuantityControlsProp {
  item: CartItem;
  handleQuantityChange: any;
}

const QuantityControls = ({
  item,
  handleQuantityChange,
}: QuantityControlsProp) => (
  <div className="flex items-center justify-between sm:justify-start space-x-3 w-full sm:w-auto">
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
    <div className="text-right min-w-[4rem] sm:min-w-[5rem]">
      <p className="text-sm sm:text-lg font-semibold text-gray-900">
        {formatCurrency(item.UnitPrice * item.Quantity)}
      </p>
    </div>
  </div>
);
export default QuantityControls;
