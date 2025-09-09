import { formatCurrency } from "../../utils/formatCurrency";

const QuantityControls = ({ item, handleQuantityChange }: any) => (
  <div className="flex items-center space-x-3">
    <div className="flex items-center border border-gray-300 rounded-lg">
      <button
        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
        disabled={item.quantity <= 1}
      >
        −
      </button>
      <span className="px-4 py-2 border-x border-gray-300 bg-gray-50 font-medium min-w-[3rem] text-center">
        {item.quantity}
      </span>
      <button
        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
      >
        +
      </button>
    </div>
    <div className="text-right min-w-[5rem]">
      <p className="text-lg font-semibold text-gray-900">
        {formatCurrency(item.price * item.quantity)}
      </p>
    </div>
  </div>
);

export default QuantityControls;
