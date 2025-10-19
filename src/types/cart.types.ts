import type { Order } from "./order.types";

export interface CartItem {
  Quantity: number;
  UnitPrice: number;
  TotalPrice: number;
  ProductName: string;
  ProductSku: string;
  ProductId: number;
  ImageUrl?: string;
  CategoryName?: string;
  CreatedAt?: string | Date;
  UpdatedAt?: string | Date;
}

// Shipping information for checkout
export interface ShippingInfo {
  ShippingFirstName: string;
  ShippingLastName: string;
  ShippingAddress: string;
  ShippingCity: string;
  ShippingState: string;
  ShippingZipCode: string;
  ShippingCountry: string;
  ShippingPhone?: string;
  DeliveryDate?: string | Date;
}

// Payment information
export interface PaymentInfo {
  PaymentMethod: string;
  TransactionId?: string;
  ShippingAmount?: number;
  DiscountAmount?: number;
  TaxRate?: number;
  PaidAt?: string | Date;
}

// Order totals calculation
export interface OrderTotals {
  SubTotal: number;
  TaxAmount: number;
  ShippingAmount: number;
  DiscountAmount: number;
  TotalAmount: number;
  CalculatedAt?: string | Date;
}

// Complete order data for API submission
export interface CreateOrderRequest {
  SubTotal: number;
  TaxAmount: number;
  ShippingAmount: number;
  DiscountAmount: number;
  TotalAmount: number;
  Notes?: string | undefined;
  ShippingFirstName: string;
  ShippingLastName: string;
  ShippingAddress: string;
  ShippingCity: string;
  ShippingState: string;
  ShippingZipCode: string;
  ShippingCountry: string;
  ShippingPhone?: string;
  OrderItems: {
    ProductId: number;
    Quantity: number;
    UnitPrice: number;
  }[];
  Payments: {
    PaymentMethod: string;
    Amount: number;
    PaidAt?: string | Date;
  }[];
  CreatedAt?: string | Date;
  UpdatedAt?: string | Date;
}

// Cart context state & actions
export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;

  // New methods for checkout
  calculateTotals: (
    shippingAmount?: number,
    discountAmount?: number
  ) => OrderTotals;
  createOrder: (
    shippingInfo: ShippingInfo,
    paymentInfo: PaymentInfo,
    notes?: string
  ) => Promise<Order>;
}
