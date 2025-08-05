import type { Category } from "../api/catalog";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: Category;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Order {
  id: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: CartItem[];
  total: number;
  date: string;
  estimatedDelivery: string;
  userId: number;
}

export interface ProductListResponse {
  products: Product[];
  nextPage: number | null;
}

export interface AddToCartInput {
  productId: number;
}

export interface AddToCartResponse {
  cartId: number;
}
