import { authAPI } from "./api";
import { API_URL } from "./api";
import type { Order } from "./orders";

export interface ApplicationUser {
  id: string;
  userName: string;
  email: string;
  phoneNumber?: string;

  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  dateOfBirth: Date;
  createdDate: Date;
  isActive: boolean;
  isGoogleUser: boolean;
  profilePictureUrl?: string;
  googleId?: string;

  orders?: Order[];
}

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  dateOfBirth?: string;
  createdAt?: string;
  isActive?: boolean;
  isGoogleUser?: boolean;
  profilePictureUrl?: string;
  googleId?: string;
  phone?: string;
  email?: string;
  roles?: string[];
}

export interface AuthResult {
  success: boolean;
  message: string;
  data?: {
    token: string;
    refreshToken: string;
    user: User;
  };
  errors?: string[];
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  const response = await authAPI.login(email, password);
  return response;
};

export const loginWithGoogle = async (
  credential: string
): Promise<AuthResult> => {
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
): Promise<AuthResult> => {
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
