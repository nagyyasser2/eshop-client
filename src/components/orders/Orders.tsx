import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getMyOrders } from "../../api/orders";
import OrderNotRegistered from "./OrderNotRegisterd";
import OrdersList from "./OrdersList";
import EmptyState from "./EmptyState";
import OrderSkeleton from "../sceletons/OrderSkeleton";
import type { Order } from "../../types/order.types";
import CustomProducts from "../products/CustomProducts";
import OrdersFilters from "./OrdersFilters";
import { useEffect, useState } from "react";

function Orders() {
  const { user } = useAuth();
  const [filterKey, setFilterKey] = useState("All");
  const [orders, setOrders] = useState<Order[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["userOrders", user?.Id],
    queryFn: getMyOrders,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!user, // Only run query if user exists
  });

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
        {!user && <OrderNotRegistered />}

        {user && isLoading && <OrderSkeleton />}

        {user && error && <OrderNotRegistered />}

        {user && (data?.length ?? 0) > 0 && (
          <OrdersFilters filterKey={filterKey} setFilterKey={setFilterKey} />
        )}

        {user && !isLoading && (data?.length ?? 0) === 0 && <EmptyState />}

        {user && orders.length > 0 && <OrdersList orders={orders} />}

        {/* Only renders when user is logged in */}
        {user && (
          <CustomProducts
            title="Discover our latest items"
            categoryId={null}
            productId={null}
            featured={true}
          />
        )}
      </div>
    </div>
  );
}

export default Orders;
