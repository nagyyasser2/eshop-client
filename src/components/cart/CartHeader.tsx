const CartHeader = ({ cart }: any) => (
  <div className="mb-8">
    <p className="text-gray-600">
      {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
    </p>
  </div>
);

export default CartHeader;
