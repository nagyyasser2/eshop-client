import api from "./api";
import type { ApplicationUser } from "./auth";
import type { Product, Variant } from "./products";

export const PaymentStatusEnum = {
  Pending: 0,
  Paid: 1,
  Failed: 2,
  Processing: 3,
  CashOnDelivery: 4,
  Refunded: 5,
  Cancelled: 6,
  Disputed: 7,
  Completed: 8,
} as const;
export type PaymentStatusEnum =
  (typeof PaymentStatusEnum)[keyof typeof PaymentStatusEnum];

export type ShippingStatus = {
  Pending: "Pending";
  Processing: "Processing";
  Shipped: "Shipped";
  Delivered: "Delivered";
  Cancelled: "Cancelled";
  Refunded: "Refunded";
};

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrls: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  parentCategoryId?: number | null;

  parentCategory?: Category | null;
  childCategories?: Category[];
  products?: Product[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productName: string;
  productSKU?: string;

  orderId: number;
  productId: number;
  productVariantId?: number | null;

  order?: Order;
  product?: Product;
  productVariant?: Variant | null;
}

export interface Order {
  id: number;
  orderNumber: string;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  notes?: string;
  subTotal: number;
  totalAmount: number;

  // Shipping Address
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
  shippingPhone?: string;

  createdAt: Date;
  updatedAt?: Date | null;
  shippedAt?: Date | null;
  deliveredAt?: Date | null;

  shippingStatus: ShippingStatus;
  paymentStatus: PaymentStatusEnum;

  userId: string;

  user?: ApplicationUser;
  orderItems?: OrderItem[];
  payments?: Payment[];
}

export interface PaymentMethod {
  id: number;
  name: string;
  provider?: string;
}

export interface Payment {
  id: number;
  transactionId: string;
  amount: number;
  status: PaymentStatusEnum;
  gateway?: string;
  gatewayTransactionId?: string;
  notes?: string;
  createdAt: Date;
  processedAt?: Date | null;

  orderId: number;
  paymentMethodId: number;

  order?: Order;
  paymentMethod?: PaymentMethod;
}

export interface PaymentMethod {
  id: number;
  name: string;
  provider?: string;
}

export interface CreateOrderDto {
  userId?: string;
  orderItems: Array<{
    productId: number;
    productVariantId?: number | null;
    quantity: number;
    unitPrice: number;
    productName: string;
    productSKU?: string;
  }>;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
  shippingPhone?: string;
  notes?: string;
  paymentMethodId: number;
  discountAmount?: number;
  shippingAmount: number;
}

export interface OrderDto {
  id: number;
  orderNumber: string;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  notes?: string;
  subTotal: number;
  totalAmount: number;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
  shippingPhone?: string;
  createdAt: string; // ISO string for Date
  updatedAt?: string | null;
  shippedAt?: string | null;
  deliveredAt?: string | null;
  shippingStatus: keyof ShippingStatus;
  paymentStatus: PaymentStatusEnum;
  userId: string;
  orderItems: OrderItem[];
}

export const placeOrder = async (order: CreateOrderDto): Promise<Order> => {
  try {
    const response = await api.post<Order>("/orders", order);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to place order: ${error}`);
  }
};

export const getMyOrders = async (): Promise<OrderDto[]> => {
  try {
    const response = await api.get<OrderDto[]>(`/orders/myorders`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user orders: ${error}`);
  }
};

export const getOneOrder = async (orderId: number): Promise<OrderDto> => {
  try {
    const response = await api.get<OrderDto>(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch order: ${error}`);
  }
};
