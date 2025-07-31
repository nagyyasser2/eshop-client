import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

interface CheckoutFormProps {
  onSubmit: () => void;
}

function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    zip: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.address && formData.city && formData.zip) {
      onSubmit();
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Shipping Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="zip"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ZIP Code
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
