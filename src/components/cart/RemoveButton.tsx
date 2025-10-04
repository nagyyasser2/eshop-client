import type { CartItem } from "../../types/cart.types";

interface RemoveButtonProp {
  item: CartItem;
  handleRemoveItem: any;
  removingItems: any;
}

const RemoveButton = ({
  item,
  handleRemoveItem,
  removingItems,
}: RemoveButtonProp) => (
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
);

export default RemoveButton;
