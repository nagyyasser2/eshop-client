import ordersSvg from "../../assets/orders.svg";

export default function OrdersHeader() {
  return (
    <div className="flex items-center mb-2">
      <div className="flex items-center gap-2 justify-center">
        <img src={ordersSvg} alt="Orders" width={60} height={60} />
        <p className="text-stale-700 font-semibold text-lg">My Orders</p>
      </div>
    </div>
  );
}
