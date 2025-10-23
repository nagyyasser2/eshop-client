import { SERVER_URL } from "../../api/api";
import type { CartItem } from "../../types/cart.types";
import { formatCurrency } from "../../utils/formatCurrency";
import QuantityControls from "./QuantityControls";

interface CartItemProp {
  item: CartItem;
  handleQuantityChange: (id: number, quantity: number) => void;
  handleRemoveItem: (id: number) => void;
  removingItems: Set<number>;
}

const CartItemComponent = ({
  item,
  handleQuantityChange,
  handleRemoveItem,
  removingItems,
}: CartItemProp) => {
  return (
    <div
      className={`transition-all duration-300  mb-2
        ${
          removingItems.has(item.ProductId)
            ? "opacity-50 scale-95"
            : "opacity-100 scale-100"
        }
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0 self-center sm:self-auto">
          <img
            src={`${SERVER_URL + item.ImagePath}`}
            alt={item.ProductName}
            className="w-24 h-24 sm:w-20 sm:h-20 rounded-xl object-cover shadow-sm border border-gray-100"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            {item.ProductName}
          </h3>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            {formatCurrency(item.UnitPrice)}{" "}
            <span className="text-xs text-gray-400">each</span>
          </p>
          {item.CategoryName && (
            <p className="text-xs font-medium text-purple-600 mt-2 bg-purple-50 inline-block px-2 py-0.5 rounded-md">
              {item.CategoryName}
            </p>
          )}
        </div>

        {/* Quantity + Remove */}
        <div className="flex flex-row sm:flex-col sm:items-end gap-3 w-full sm:w-auto">
          <QuantityControls
            item={item}
            handleQuantityChange={handleQuantityChange}
            handleRemoveItem={handleRemoveItem}
            removingItems={removingItems}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
