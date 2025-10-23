import { useCart } from "../../context/CartContext";
import cartSvg from "../../assets/cart.svg";

export default function NavbarCartButton() {
  const { cart, isCartPopupOpen, setIsCartPopupOpen } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.Quantity, 0);

  return (
    <div className="relative cursor-pointer">
      <button
        onClick={() => setIsCartPopupOpen(!isCartPopupOpen)}
        className="relative p-2 rounded-full hover:bg-white/20 transition-all duration-200 cursor-pointer"
        title="View Cart"
      >
        <img src={cartSvg} alt="Cart" className="h-8 sm:h-9" />

        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-white text-blue-600 text-[0.7rem] font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>
    </div>
  );
}
