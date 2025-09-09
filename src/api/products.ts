import api from "./api";
import { type QueryFunctionContext } from "@tanstack/react-query";
import type { Category } from "./catalog";

export interface Product {
  id: number;
  name: string;
  description?: string;
  shortDescription?: string;
  sku: string;
  price: number;
  comparePrice?: number | null;
  stockQuantity: number;
  trackQuantity: boolean;
  isActive: boolean;
  isFeatured: boolean;
  weight: number;
  dimensions?: string;
  tags?: string;
  createdAt: Date;

  categoryId?: number | null;
  category?: Category | null;
  images?: Image[];
  variants?: Variant[];
}

export interface Variant {
  id: number;
  sku: string;
  price?: number | null;
  stockQuantity: number;
  isActive: boolean;
  color: string;
  size: string;
  createdAt: Date;

  productId: number;
  product?: Product;
}

export interface Image {
  id: number;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: Date;

  productId: number;
  product?: Product;
}

// Define the ProductDTO interface to match the API response
export interface ProductDTO {
  id: number;
  name: string;
  sku: string;
  price: number;
  description?: string;
  shortDescription?: string;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: number;
  category: Category;
  images?: { id: number; url: string }[];
  variants?: { id: number; name: string }[];
}

// Define the response shape for paginated products
export interface PaginatedProductsResponse {
  data: ProductDTO[];
  count: number;
  page: number;
  pageSize: number;
  pages: [number, number, number, number]; // Array of page numbers
}

// Define query parameters for fetching products (exclude page)
export interface ProductQueryParams {
  pageSize: number;
  featured?: boolean;
  active?: boolean;
  categoryId?: number;
  sortBy?: string;
}

// Base function to fetch products with filters and pagination
export const fetchProducts = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<
  [string, ProductQueryParams],
  number
>): Promise<PaginatedProductsResponse> => {
  const [, params] = queryKey;
  const response = await api.get<PaginatedProductsResponse>("/products", {
    params: {
      featured: params.featured,
      active: params.active,
      categoryId: params.categoryId,
      page: pageParam,
      pageSize: params.pageSize ?? 10,
      sortBy: params.sortBy,
    },
  });
  return response.data;
};

export const fetchProductsForUseQuery = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: [string, ProductQueryParams];
  pageParam?: number;
}): Promise<PaginatedProductsResponse> => {
  const [, params] = queryKey;
  const response = await api.get<PaginatedProductsResponse>("/products", {
    params: {
      featured: params.featured,
      active: params.active,
      categoryId: params.categoryId,
      page: pageParam,
      pageSize: params.pageSize ?? 10,
      sortBy: params.sortBy,
    },
  });
  return response.data;
};

export const fetchProductById = async (id: number): Promise<ProductDTO> => {
  const response = await api.get<ProductDTO>(`/products/${id}`);
  return response.data;
};
