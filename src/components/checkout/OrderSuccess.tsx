import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[400px] p-6 text-center gap-6">
      <CheckCircle className="w-16 h-16 text-green-500" />
      <h1 className="text-3xl font-bold text-gray-900">Thank you!</h1>
      <p className="text-gray-600 text-lg">
        Your order has been placed successfully.
      </p>
      <Link
        to="/orders"
        className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition-colors"
      >
        Track Your Orders
      </Link>
    </div>
  );
}
