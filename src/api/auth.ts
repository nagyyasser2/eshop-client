import api from "./api";
import { API_URL } from "./api";

export interface User {
  id: number;
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

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post("/auth/login", { email, password });
  if (response.data) {
    return response.data as User;
  }
  throw new Error("Invalid credentials");
};

export const loginWithGoogle = async () => {
  const response = await api.get(
    `${API_URL}/auth/google-auth-url?RedirectUri=${encodeURIComponent(
      window.location.origin
    )}`
  );
  if (response.data) {
    return response.data as User;
  }
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  dateOfBirth: string
): Promise<{ token: string; user: User }> => {
  const response = await api.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    dateOfBirth,
  });
  if (response.data) {
    return response.data as { token: string; user: User };
  }
  throw new Error("Registration failed");
};

export const registerWithGoogle = async () => {
  // Your Google OAuth registration implementation
  // This could redirect to Google or use a popup
  // Similar to loginWithGoogle but for registration
};
