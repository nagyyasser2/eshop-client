import type {
  ApiResponse,
  ChangePasswordPayload,
  ConfirmEmailPayload,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
} from "../types/auth.types";
import api, { authAPI } from "./api";

export const login = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  const response = await authAPI.login(email, password);
  return response;
};

export const loginWithGoogle = async (
  credential: string
): Promise<ApiResponse> => {
  const response = await authAPI.googleLogin(credential);
  return response;
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  dateOfBirth: string
): Promise<ApiResponse> => {
  const response = await authAPI.register({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    dateOfBirth,
  });

  return response;
};

export const logout = async (): Promise<void> => {
  await authAPI.logout();
};

export const confirmEmail = async (
  payload: ConfirmEmailPayload
): Promise<any> => {
  try {
    const response = await api.post("/Auth/confirm-email", payload);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.Message ||
      "Failed to confirm email";
    throw new Error(message);
  }
};

export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      "/Auth/change-password",
      payload
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    // If the server returned an error response with the expected format
    if (error.response?.data) {
      return error.response.data;
    }

    // Fallback for network errors or unexpected formats
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.Message ||
        error.message ||
        "Failed to change password"
    );
  }
};

export const forgetPassword = async (payload: ForgotPasswordRequest) => {
  try {
    const response = await api.post("/Auth/forgot-password", payload);
    return response.data as ApiResponse;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ApiResponse;
    }
    throw new Error(
      error.response?.data?.Message ||
        error.message ||
        "Failed to change password"
    );
  }
};

export const resetPassword = async (payload: ResetPasswordRequest) => {
  try {
    const response = await api.post("/Auth/reset-password", payload);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.Message ||
        error.message ||
        "Failed to change password"
    );
  }
};

export const updateProfile = async (payload: UpdateProfileRequest) => {
  try {
    const response = await api.put("/Auth/profile", payload);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.Message ||
        error.message ||
        "Failed to change password"
    );
  }
};
