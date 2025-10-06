import type { Order } from "./order.types";

export interface ApplicationUser {
  Id: string;
  UserName: string;
  Email?: string;
  PhoneNumber?: string;
  FirstName: string;
  LastName: string;
  Address?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  DateOfBirth: string;
  CreatedDate: string;
  IsActive: boolean;
  IsGoogleUser: boolean;
  ProfilePictureUrl?: string;
  GoogleId?: string;
  RefreshToken?: string;
  RefreshTokenExpiryTime: string;
  EmailConfirmed: boolean;
  Roles: string[];
  Orders?: Order[];
}

export interface UpdateProfileRequest {
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ApiResponse<T = any> {
  Success: boolean;
  Message?: string;
  Errors?: string[];
  Data?: T;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ConfirmEmailPayload {
  userId: string;
  token: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  userId: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}
