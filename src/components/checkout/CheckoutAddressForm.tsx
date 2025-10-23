export default function CheckoutAddressForm({ register, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          First Name *
        </label>
        <input
          {...register("ShippingFirstName", {
            required: "First name is required",
          })}
          className={`w-full px-4 py-2 border ${
            errors.ShippingFirstName ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
          placeholder="John"
        />
        {errors.ShippingFirstName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.ShippingFirstName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Last Name *
        </label>
        <input
          {...register("ShippingLastName", {
            required: "Last name is required",
          })}
          className={`w-full px-4 py-2 border ${
            errors.ShippingLastName ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
          placeholder="Doe"
        />
        {errors.ShippingLastName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.ShippingLastName.message}
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <input
          {...register("ShippingAddress", { required: "Address is required" })}
          className={`w-full px-4 py-2 border ${
            errors.ShippingAddress ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
          placeholder="123 Main Street"
        />
        {errors.ShippingAddress && (
          <p className="text-red-500 text-xs mt-1">
            {errors.ShippingAddress.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City *
        </label>
        <input
          {...register("ShippingCity", { required: "City is required" })}
          className={`w-full px-4 py-2 border ${
            errors.ShippingCity ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
          placeholder="New York"
        />
        {errors.ShippingCity && (
          <p className="text-red-500 text-xs mt-1">
            {errors.ShippingCity.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State *
        </label>
        <input
          {...register("ShippingState", { required: "State is required" })}
          className={`w-full px-4 py-2 border ${
            errors.ShippingState ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
          placeholder="NY"
        />
        {errors.ShippingState && (
          <p className="text-red-500 text-xs mt-1">
            {errors.ShippingState.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ZIP Code *
        </label>
        <input
          {...register("ShippingZipCode", {
            required: "ZIP code is required",
            pattern: {
              value: /^\d{5}(-\d{4})?$/,
              message: "Invalid ZIP code format",
            },
          })}
          className={`w-full px-4 py-2 border ${
            errors.ShippingZipCode ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
          placeholder="10001"
        />
        {errors.ShippingZipCode && (
          <p className="text-red-500 text-xs mt-1">
            {errors.ShippingZipCode.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country *
        </label>
        <input
          {...register("ShippingCountry", { required: "Country is required" })}
          className={`w-full px-4 py-2 border ${
            errors.ShippingCountry ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
          placeholder="USA"
        />
        {errors.ShippingCountry && (
          <p className="text-red-500 text-xs mt-1">
            {errors.ShippingCountry.message}
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone *
        </label>
        <input
          type="tel"
          {...register("ShippingPhone", {
            required: "Phone number is required",
            pattern: {
              value: /^[\d\s\-\+\(\)]+$/,
              message: "Invalid phone number format",
            },
          })}
          className={`w-full px-4 py-2 border ${
            errors.ShippingPhone ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
          placeholder="+1 (555) 123-4567"
        />
        {errors.ShippingPhone && (
          <p className="text-red-500 text-xs mt-1">
            {errors.ShippingPhone.message}
          </p>
        )}
      </div>
    </div>
  );
}
