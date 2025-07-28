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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium">
            ZIP Code
          </label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">Total: {formatCurrency(total)}</p>
          <button
            type="submit"
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
