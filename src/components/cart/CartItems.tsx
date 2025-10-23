import type { CartItem as CartItemType } from "../../types/cart.types";
import CartItemComponent from "./CartItem";

interface CartItemsProps {
  clearCart: any;
  cart: CartItemType[];
  handleQuantityChange: (id: number, quantity: number) => void;
  handleRemoveItem: (id: number) => void;
  removingItems: any;
}

const CartItems = ({
  cart,
  handleQuantityChange,
  handleRemoveItem,
  removingItems,
}: CartItemsProps) => {
  return (
    <div className="lg:col-span-2 pt-2">
      <div className="rounded-xl  overflow-hidden">
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
