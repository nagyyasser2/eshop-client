import { SERVER_URL } from "../../api/api";
import { formatCurrency } from "../../utils/formatCurrency";
import QuantityControls from "./QuantityControls";
import RemoveButton from "./RemoveButton";

const CartItem = ({
  item,
  handleQuantityChange,
  handleRemoveItem,
  removingItems,
}: any) => (
  <div
    className={`p-6 transition-all duration-300 ${
      removingItems.has(item.id)
        ? "opacity-50 scale-95"
        : "opacity-100 scale-100"
    }`}
  >
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img
          src={
            SERVER_URL + item.image ||
            `https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=150&h=150&fit=crop`
          }
          alt={item.name}
          className="w-20 h-20 rounded-xl object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-gray-600 mt-1">{formatCurrency(item.price)} each</p>
        <p className="text-sm text-gray-500 mt-1">
          {item?.category.name || "Electronics"}
        </p>
      </div>
      <QuantityControls
        item={item}
        handleQuantityChange={handleQuantityChange}
        removingItems={removingItems}
      />
      <RemoveButton
        item={item}
        handleRemoveItem={handleRemoveItem}
        removingItems={removingItems}
      />
    </div>
  </div>
);

export default CartItem;
