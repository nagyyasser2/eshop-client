import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import { useCart } from "../../context/CartContext";
import { ShoppingCart } from "lucide-react";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, calculateTotals } =
    useCart();
  const [removingItems, setRemovingItems] = useState(new Set<number>());

  // Calculate totals using cart context
  const shippingAmount = 0;
  const discountAmount = 0;
  const totals = calculateTotals(shippingAmount, discountAmount);

  const handleRemoveItem = async (itemId: number) => {
    setRemovingItems((prev) => new Set([...prev, itemId]));
    removeFromCart(itemId);
    setRemovingItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className=" py-4 px-0">
      <div className="container mx-auto p-4 ">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Cart
          </h1>
          {cart.length > 0 && (
            <span className="text-xs bg-purple-100 text-purple-800 py-1 rounded-full">
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left section: Cart items */}
          <div className="lg:col-span-2 space-y-6">
            <CartItems
              cart={cart}
              clearCart={clearCart}
              handleQuantityChange={handleQuantityChange}
              handleRemoveItem={handleRemoveItem}
              removingItems={removingItems}
            />
          </div>

          {/* Right section: Summary + Actions */}
          <div className="lg:col-span-1 space-y-6">
            <OrderSummary
              subtotal={totals.SubTotal}
              total={totals.TotalAmount}
              itemCount={cart.length}
            />

            <div className="space-y-3">
              <Link
                to={"/checkout"}
                className={`w-full block text-center bg-gradient-to-r from-purple-600 to-pink-400 
              text-white font-bold py-4 px-6 rounded-xl shadow-md 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              transition-all hover:from-purple-700 hover:to-pink-500 transform hover:scale-[1.02]"
              `}
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="w-full block text-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
