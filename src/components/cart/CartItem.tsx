import type { CartItem } from "../../types/cart.types";
import { formatCurrency } from "../../utils/formatCurrency";
import QuantityControls from "./QuantityControls";
import RemoveButton from "./RemoveButton";

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
      className={`p-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50
        ${
          removingItems.has(item.ProductId)
            ? "opacity-50 scale-95"
            : "opacity-100 scale-100"
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={
              item.ImageUrl ||
              `https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=150&h=150&fit=crop`
            }
            alt={item.ProductName}
            className="w-20 h-20 rounded-xl object-cover shadow-sm border border-gray-100"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {item.ProductName}
          </h3>
          <p className="text-gray-600 mt-1">
            {formatCurrency(item.UnitPrice)}{" "}
            <span className="text-sm text-gray-400">each</span>
          </p>
          {item.CategoryName && (
            <p className="text-xs font-medium text-purple-600 mt-1 bg-purple-50 inline-block px-2 py-0.5 rounded-md">
              {item.CategoryName}
            </p>
          )}
        </div>

        {/* Quantity + Remove */}
        <div className="flex items-center gap-3">
          <QuantityControls
            item={item}
            handleQuantityChange={handleQuantityChange}
          />
          <RemoveButton
            item={item}
            handleRemoveItem={handleRemoveItem}
            removingItems={removingItems}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
