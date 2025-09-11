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

export interface PaginatedProductsResponse {
  data: ProductDTO[];
  count: number;
  page: number;
  pageSize: number;
  pages: [number, number, number, number];
}

export interface ProductQueryParams {
  pageSize: number;
  featured?: boolean;
  active?: boolean;
  categoryId?: number;
  sortBy?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  tags?: string;
  category?: string;
}

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
      searchQuery: params.searchQuery,
    },
  });
  return response.data;
};

export const fetchProductsForUseQuery = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: [string, ProductQueryParams & { searchQuery?: string }];
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
      searchQuery: params.searchQuery, // This should now work correctly
      // Also include filter parameters if needed
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      color: params.color,
      tags: params.tags,
      category: params.category,
    },
  });
  return response.data;
};
export const fetchProductById = async (id: number): Promise<ProductDTO> => {
  const response = await api.get<ProductDTO>(`/products/${id}`);
  return response.data;
};

// New function specifically for search
export const searchProducts = async (
  searchQuery: string,
  options: Omit<ProductQueryParams, "searchQuery"> = {
    pageSize: 0,
  }
): Promise<PaginatedProductsResponse> => {
  const response = await api.get<PaginatedProductsResponse>("/products", {
    params: {
      searchQuery,
      active: options.active ?? true,
      sortBy: options.sortBy ?? "relevance",
      ...options,
    },
  });
  return response.data;
};
