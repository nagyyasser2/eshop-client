import type { CartItem as CartItemType } from "../../types/cart.types";
import CartItemComponent from "./CartItem";

interface CartItemsProps {
  cart: CartItemType[];
  handleQuantityChange: (id: number, quantity: number) => void;
  handleRemoveItem: (id: number) => void;
  removingItems: number[];
}

const CartItems = ({
  cart,
  handleQuantityChange,
  handleRemoveItem,
  removingItems,
}: CartItemsProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Cart Items
          </h2>
        </div>

        {/* Cart List */}
        <div className="divide-y divide-gray-100">
          {cart.length > 0 ? (
            cart.map((item: CartItemType) => (
              <CartItemComponent
                key={item.ProductId}
                item={item}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
                removingItems={removingItems}
              />
            ))
          ) : (
            <div className="px-6 py-10 text-center text-gray-500">
              Your cart is empty 🛒
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
