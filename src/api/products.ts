import api from "./api";
import { type QueryFunctionContext } from "@tanstack/react-query";
import type { Category } from "../types/category.types";
import type { ProductDto } from "../types/product.types";

export interface Product {
  Id: number;
  Name: string;
  Description?: string;
  ShortDescription?: string;
  Sku: string;
  Price: number;
  ComparePrice?: number | null;
  StockQuantity: number;
  TrackQuantity: boolean;
  IsActive: boolean;
  IsFeatured: boolean;
  Weight: number;
  Dimensions?: string;
  Tags?: string;
  CreatedAt: Date;

  CategoryId?: number | null;
  Category?: Category | null;
  Images?: Image[];
  Variants?: Variant[];
}

export interface Variant {
  Id: number;
  Sku: string;
  Price?: number | null;
  StockQuantity: number;
  IsActive: boolean;
  Color: string;
  Size: string;
  CreatedAt: Date;
  ProductId: number;
  Product?: Product;
}

export interface Image {
  Id: number;
  Url: string;
  AltText?: string;
  IsPrimary: boolean;
  SortOrder: number;
  CreatedAt: Date;

  ProductId: number;
  Product?: Product;
}

export interface PaginatedProductsResponse {
  data: ProductDto[];
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
  daysBack?: number;
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
      searchQuery: params.searchQuery,
      // Also include filter parameters if needed
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      daysBack: params.daysBack,
      color: params.color,
      tags: params.tags,
      category: params.category,
    },
  });
  return response.data;
};
export const fetchProductById = async (id: number): Promise<ProductDto> => {
  const response = await api.get<ProductDto>(`/products/${id}`);
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
