import type { Category, CategoryDto } from "./category.types";
import type { Image, ImageDto } from "./image.types";

export interface Product {
  Id: number;
  Name: string;
  Description?: string;
  ShortDescription?: string;
  Sku: string;
  Price: number;
  ComparePrice?: number;
  StockQuantity: number;
  TrackQuantity: boolean;
  IsActive: boolean;
  IsFeatured: boolean;
  Weight: number;
  Dimensions?: string;
  Tags?: string;
  CreatedAt: string;
  CategoryId?: number;
  Category?: Category;
  Images?: Image[];
}

export interface CreateProductDto {
  Id?: number;
  Name: string;
  Description?: string;
  ShortDescription?: string;
  Sku: string;
  Price: number;
  ComparePrice?: number;
  StockQuantity: number;
  TrackQuantity?: boolean;
  IsActive?: boolean;
  IsFeatured?: boolean;
  Weight?: number;
  Dimensions?: string;
  Tags?: string;
  CategoryId?: number;
  Images?: File[];
}

export interface UpdateProductDto {
  Id: number;
  Name: string;
  Description?: string;
  ShortDescription?: string;
  Sku: string;
  Price: number;
  ComparePrice?: number;
  StockQuantity: number;
  TrackQuantity?: boolean;
  IsActive?: boolean;
  IsFeatured?: boolean;
  Weight?: number;
  Dimensions?: string;
  Tags?: string;
  CategoryId?: number;
  NewImages?: File[];
  ImageIdsToDelete?: number[];
  Images?: Image[];
}

export interface UpdateStockDto {
  Quantity: number;
}

export interface ProductDto {
  Id: number;
  Name: string;
  Description?: string;
  ShortDescription?: string;
  Sku: string;
  Price: number;
  ComparePrice?: number;
  StockQuantity: number;
  TrackQuantity: boolean;
  IsActive: boolean;
  IsFeatured: boolean;
  Weight: number;
  Dimensions?: string;
  Tags?: string;
  CreatedAt: string;
  CategoryId?: number;
  Category?: CategoryDto;
  ProductImages: ProductImageDto[];
}

export interface ProductImageDto {
  Id: number;
  Path: string;
  IsPrimary: boolean;
  CreatedAt: Date;
  ProductId: number;
}
