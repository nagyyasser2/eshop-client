import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import { useCart } from "../../context/CartContext";
import { ShoppingCart } from "lucide-react";
import cartSvg from "../../assets/cart.svg";

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

  return (
    <div className=" py-4 px-0">
      <div className="container mx-auto p-4 ">
        {/* Page Header */}
        <div className="flex items-center mb-2">
          <div className="flex items-center gap-2 justify-center">
            <img src={cartSvg} alt="Cart" width={60} height={60} />
            <p className="text-slate-700 font-semibold text-lg">My Cart</p>

            {cart.length > 0 && (
              <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
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
                  to="/bags"
                  className="w-full block text-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
