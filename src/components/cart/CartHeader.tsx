const CartHeader = ({ cart }: any) => (
  <div className="mb-8">
    <h1 className="text-4xl font-bold mb-2">
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Shopping Cart
      </span>
    </h1>
    <p className="text-gray-600">
      {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
    </p>
  </div>
);

export default CartHeader;
