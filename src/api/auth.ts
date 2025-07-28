import type { User } from "../types";

export const login = async (email: string, password: string): Promise<User> => {
  // Simulated API call
  if (email && password) {
    return { id: Date.now(), email, name: email.split("@")[0] };
  }
  throw new Error("Invalid credentials");
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  // Simulated API call
  if (name && email && password) {
    return { id: Date.now(), email, name };
  }
  throw new Error("Invalid registration data");
};
