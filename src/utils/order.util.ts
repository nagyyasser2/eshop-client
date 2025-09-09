import { PaymentStatusEnum } from "../api/orders";
// src/utils/order.utils.ts

export const formatOrderDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getEstimatedDelivery = (
  deliveredAt?: string | Date | null,
  shippedAt?: string | Date | null
): string => {
  if (deliveredAt) {
    return formatOrderDate(deliveredAt);
  }
  if (shippedAt) {
    return formatOrderDate(shippedAt);
  }
  return "Pending";
};

// Convert number to string
export const mapPaymentStatus = (
  status: number
): keyof typeof PaymentStatusEnum => {
  switch (status) {
    case PaymentStatusEnum.Pending:
      return "Pending";
    case PaymentStatusEnum.Paid:
      return "Paid";
    case PaymentStatusEnum.Failed:
      return "Failed";
    case PaymentStatusEnum.Processing:
      return "Processing";
    case PaymentStatusEnum.CashOnDelivery:
      return "CashOnDelivery";
    case PaymentStatusEnum.Refunded:
      return "Refunded";
    case PaymentStatusEnum.Cancelled:
      return "Cancelled";
    case PaymentStatusEnum.Disputed:
      return "Disputed";
    case PaymentStatusEnum.Completed:
      return "Completed";
    default:
      return "Pending"; // fallback
  }
};
