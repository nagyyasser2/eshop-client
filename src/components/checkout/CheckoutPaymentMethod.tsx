interface CheckoutPaymentMethodProp {
  register: any;
  watch: any;
}

export default function CheckoutPaymentMethod({
  register,
  watch,
}: CheckoutPaymentMethodProp) {
  const paymentMethod = watch("PaymentMethod");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {["Credit Card", "Cash"].map((method) => (
          <label
            key={method}
            className={`px-4 py-3 rounded-lg border-2 transition font-medium text-center cursor-pointer ${
              paymentMethod === method
                ? "border-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700"
                : "border-gray-200 hover:border-purple-300 text-gray-700"
            }`}
          >
            <input
              type="radio"
              value={method}
              {...register("PaymentMethod", { required: true })}
              className="sr-only"
            />
            {method}
          </label>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shipping Cost
        </label>
        <input
          disabled
          type="number"
          step="0.01"
          {...register("ShippingAmount", { valueAsNumber: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          placeholder="0.00"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Order Notes (Optional)
        </label>
        <textarea
          {...register("Notes")}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
          placeholder="Any special instructions..."
        />
      </div>
    </div>
  );
}
