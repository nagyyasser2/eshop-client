import type { CreateOrderItemDto, Order } from "../types/order.types";
import api from "./api";

export const placeOrder = async (order: CreateOrderItemDto): Promise<Order> => {
  try {
    const response = await api.post<Order>("/orders", order);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to place order: ${error}`);
  }
};

export const getMyOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get<Order[]>(`/orders/myorders`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user orders: ${error}`);
  }
};

export const getOneOrder = async (orderId: number): Promise<Order> => {
  try {
    const response = await api.get<Order>(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch order: ${error}`);
  }
};
