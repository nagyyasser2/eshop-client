import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getMyOrders, type OrderDto } from "../api/orders";
import OrderNotRegistered from "../components/orders/OrderNotRegisterd";
import OrdersList from "../components/orders/OrdersList";
import EmptyState from "../components/orders/EmptyState";
import OrdersHeader from "../components/orders/OrdersHeader";
import OrdersContainer from "../components/orders/OrdersContainer";
import OrderSkeleton from "../components/sceletons/OrderSkeleton";

function OrderTracking() {
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

  console.log("Fetched orders:", orders);
  return (
    <OrdersContainer>
      <OrdersHeader />
      {isLoading && <OrderSkeleton />}
      {error && <OrderNotRegistered />}
      {orders?.length === 0 && <EmptyState />}
      {orders && orders.length > 0 && (
        <OrdersList orders={orders as OrderDto[]} />
      )}
    </OrdersContainer>
  );
}

export default OrderTracking;
