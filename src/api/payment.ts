import api from "./api";

export interface CreateCheckoutSessionDto {
  orderId: number;
  customerEmail?: string;
}

export interface CheckoutSessionResponse {
  SessionId: string;
  Url: string;
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
