import CartItem from "./CartItem";

const CartItems = ({
  cart,
  clearCart,
  handleQuantityChange,
  handleRemoveItem,
  removingItems,
}: any) => (
  <div className="lg:col-span-2 ">
    <div className=" rounded-2xl overflow-hidden bg-white">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {cart.map((item: any) => (
          <CartItem
            key={item.id}
            item={item}
            handleQuantityChange={handleQuantityChange}
            handleRemoveItem={handleRemoveItem}
            removingItems={removingItems}
          />
        ))}
      </div>
    </div>
  </div>
);

export default CartItems;
