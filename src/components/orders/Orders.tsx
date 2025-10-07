import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getMyOrders } from "../../api/orders";
import OrderNotRegistered from "./OrderNotRegisterd";
import OrdersList from "./OrdersList";
import EmptyState from "./EmptyState";
import OrderSkeleton from "../sceletons/OrderSkeleton";
import type { Order } from "../../types/order.types";
import ordersSvg from "../../assets/orders.svg";

function Orders() {
  const { user } = useAuth();

  if (!user) {
    return <OrderNotRegistered />;
  }

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userOrders", user?.Id],
    queryFn: () => {
      return getMyOrders();
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  return (
    <div className="py-4 px-0">
      <div className="container mx-auto p-4 ">
        <div className="flex items-center mb-2">
          <div className="flex items-center gap-2 justify-center">
            <img src={ordersSvg} alt="Orders" width={60} height={60} />
            <p className="text-stale-700 font-semibold text-lg">My Orders</p>
          </div>
        </div>
        {isLoading && <OrderSkeleton />}
        {error && <OrderNotRegistered />}
        {orders?.length === 0 && <EmptyState />}
        {orders && orders.length > 0 && (
          <OrdersList orders={orders as Order[]} />
        )}
      </div>
    </div>
  );
}

export default Orders;
