import type { CartItem } from "../types/cart.types";

const CART_STORAGE_KEY = "shopping-cart";

export const saveCartToStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

export const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      return JSON.parse(savedCart) as CartItem[];
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
  }
  return [];
};

export const clearCartFromStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear cart from localStorage:", error);
  }
};
