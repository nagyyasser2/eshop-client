import type { AuthResponse } from "../types/auth.types";
import { authAPI } from "./api";

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await authAPI.login(email, password);
  return response;
};

export const loginWithGoogle = async (
  credential: string
): Promise<AuthResponse> => {
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
): Promise<AuthResponse> => {
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
