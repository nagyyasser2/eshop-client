import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getMyOrders } from "../../api/orders";
import OrderNotRegistered from "./OrderNotRegisterd";
import OrdersList from "./OrdersList";
import EmptyState from "./EmptyState";
import OrdersHeader from "./OrdersHeader";
import OrdersContainer from "./OrdersContainer";
import OrderSkeleton from "../sceletons/OrderSkeleton";
import type { Order } from "../../types/order.types";

function Orders() {
  const { user } = useAuth();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userOrders", user?.id],
    queryFn: () => {
      console.log("Refetching orders due to focus or mount");
      return getMyOrders();
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  if (!user) {
    return <OrderNotRegistered />;
  }

  return (
    <OrdersContainer>
      <OrdersHeader />
      {isLoading && <OrderSkeleton />}
      {error && <OrderNotRegistered />}
      {orders?.length === 0 && <EmptyState />}
      {orders && orders.length > 0 && <OrdersList orders={orders as Order[]} />}
    </OrdersContainer>
  );
}

export default Orders;
