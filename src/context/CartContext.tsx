import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CartItem,
  CartContextType,
  ShippingInfo,
  PaymentInfo,
  OrderTotals,
} from "../types/cart.types";
import {
  saveCartToStorage,
  loadCartFromStorage,
  clearCartFromStorage,
} from "../persist/cart.store.service";
import { placeOrder } from "../api/orders";

import type { CreateOrderItemDto } from "../types/order.types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    const savedCart = loadCartFromStorage();
    setCart(savedCart);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveCartToStorage(cart);
    }
  }, [cart, isLoading]);

  const addToCart = async (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.ProductId === item.ProductId);
      if (existingItem) {
        return prev.map((i) =>
          i.ProductId === item.ProductId
            ? { ...i, Quantity: i.Quantity + item.Quantity }
            : i
        );
      }
      return [...prev, { ...item }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.ProductId !== productId));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.ProductId === id
          ? { ...item, Quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    clearCartFromStorage();
  };

  const calculateTotals = (
    shippingAmount: number = 0,
    discountAmount: number = 0,
    taxRate: number = 0.1
  ): OrderTotals => {
    const subTotal = cart.reduce(
      (sum, item) => sum + item.UnitPrice * item.Quantity,
      0
    );
    const taxAmount = subTotal * taxRate;
    const totalAmount = subTotal + taxAmount + shippingAmount - discountAmount;

    return {
      SubTotal: parseFloat(subTotal.toFixed(2)),
      TaxAmount: parseFloat(taxAmount.toFixed(2)),
      ShippingAmount: parseFloat(shippingAmount.toFixed(2)),
      DiscountAmount: parseFloat(discountAmount.toFixed(2)),
      TotalAmount: parseFloat(totalAmount.toFixed(2)),
    };
  };

  const placeOrderMutation = useMutation({
    mutationFn: (order: CreateOrderItemDto) => placeOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });
    },
    onError: (error) => {
      console.error("Error creating order:", error);
    },
  });

  const createOrder = async (
    shippingInfo: ShippingInfo,
    paymentInfo: PaymentInfo,
    notes?: string | undefined
  ) => {
    if (cart.length === 0) {
      throw new Error("Cart is empty");
    }

    const totals = calculateTotals(
      paymentInfo.ShippingAmount || 0,
      paymentInfo.DiscountAmount || 0,
      paymentInfo.TaxRate || 0.1
    );

    const orderItems = cart.map((item) => ({
      ProductId: item.ProductId,
      Quantity: item.Quantity,
      UnitPrice: item.UnitPrice,
      ProductName: item.ProductName,
      ProductSKU: item.ProductSKU,
    }));

    const orderRequest: any = {
      OrderItems: orderItems,
      ShippingFirstName: shippingInfo.ShippingFirstName,
      ShippingLastName: shippingInfo.ShippingLastName,
      ShippingAddress: shippingInfo.ShippingAddress,
      ShippingCity: shippingInfo.ShippingCity,
      ShippingState: shippingInfo.ShippingState,
      ShippingZipCode: shippingInfo.ShippingZipCode,
      ShippingCountry: shippingInfo.ShippingCountry,
      ShippingPhone: shippingInfo.ShippingPhone,
      Notes: notes,
      DiscountAmount: totals.DiscountAmount,
      ShippingAmount: totals.ShippingAmount,
    };

    return await placeOrderMutation.mutateAsync(orderRequest);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
        calculateTotals,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
