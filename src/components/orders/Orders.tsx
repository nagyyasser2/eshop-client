import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getMyOrders } from "../../api/orders";
import OrderNotRegistered from "./OrderNotRegisterd";
import OrdersList from "./OrdersList";
import EmptyState from "./EmptyState";
import OrderSkeleton from "../sceletons/OrderSkeleton";
import type { Order, ShippingStatus } from "../../types/order.types";
import CustomProducts from "../products/CustomProducts";
import OrdersFilters from "./OrdersFilters";
import { useEffect, useState } from "react";

function Orders() {
  const { user } = useAuth();

  if (!user) {
    return <OrderNotRegistered />;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["userOrders", user?.Id],
    queryFn: getMyOrders,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const [filterKey, setFilterKey] = useState("All");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;

    const filterMap: Record<string, number> = {
      Pending: 0,
      Processing: 1,
      Shipped: 2,
      Deliverd: 3,
      Cancelled: 4,
    };

    if (filterKey === "All") {
      setOrders(data);
    } else {
      const statusCode = filterMap[filterKey];
      setOrders(
        data.filter((order) => order.ShippingStatus === (statusCode as unknown))
      );
    }
  }, [filterKey, data]);

  return (
    <div className="py-4 pb-0 ">
      <div className="container mx-auto py-2 flex flex-col gap-5">
        <OrdersFilters filterKey={filterKey} setFilterKey={setFilterKey} />

        {isLoading && <OrderSkeleton />}
        {error && <OrderNotRegistered />}
        {!isLoading && data?.length === 0 && <EmptyState />}

        {orders.length > 0 && <OrdersList orders={orders} />}

        <CustomProducts
          title="Discover our latest items"
          categoryId={null}
          productId={null}
          featured={true}
        />
      </div>
    </div>
  );
}

export default Orders;
