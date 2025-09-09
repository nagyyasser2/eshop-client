import api from "./api";

export interface PaymentStatus {
  Pending: "Pending";
  Paid: "Paid";
  Failed: "Failed";
  Processing: "Processing";
  CashOnDelivery: "CashOnDelivery";
  Refunded: "Refunded";
  Cancelled: "Cancelled";
  Disputed: "Disputed";
  Completed: "Completed";
}

export interface CreateCheckoutSessionDto {
  orderId: number;
  customerEmail?: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

// Create checkout session for payment
export const createCheckoutSession = async (
  orderId: number
): Promise<CheckoutSessionResponse> => {
  try {
    const response = await api.post<CheckoutSessionResponse>(
      "/payments/create-checkout-session",
      { orderId }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
