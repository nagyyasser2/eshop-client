import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { fetchUserOrders } from "../api/orders";
import OrderStatus from "../components/OrderStatus";
import { Link } from "react-router-dom";

function OrderTracking() {
  const { user, isAuthenticated } = useAuth();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userOrders", user?.id],
    queryFn: () => fetchUserOrders(user!.id),
    enabled: isAuthenticated && !!user?.id,
  });

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p className="text-center">
          Please{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            log in
          </Link>{" "}
          to view your orders.
        </p>
      </div>
    );
  }

  console.log(orders);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {isLoading && (
        <p className="text-center text-gray-500">Loading your orders...</p>
      )}
      {error && (
        <p className="text-center text-red-500">
          Error loading orders. Please try again later.
        </p>
      )}
      {orders?.length === 0 && (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      )}
      {orders && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderStatus key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderTracking;
