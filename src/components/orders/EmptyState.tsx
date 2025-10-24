import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <>
      <div className=" rounded-2xl p-2 mb-10 text-center">
        <h3 className="text-2xl font-bold text-slate-700 mb-3">
          No orders yet
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You haven't placed any orders yet. Start shopping to see your orders
          here!
        </p>
        <Link
          to="/bags"
          className="inline-flex items-center gap-2  bg-slate-600 text-white px-8 py-3 rounded-2xl font-semibold"
        >
          Start Shopping
        </Link>
      </div>
    </>
  );
}
