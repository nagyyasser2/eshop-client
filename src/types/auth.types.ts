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

export interface AuthResponse {
  Success: boolean;
  Message: string;
  Data: {
    Token: string;
    RefreshToken: string;
    User: ApplicationUser;
  };
  Errors: string[];
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
