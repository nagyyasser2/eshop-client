import type { Product } from "./product.types";

export interface Category {
  Id: number;
  Name: string;
  Description?: string;
  ImageUrls: string[];
  IsActive: boolean;
  SortOrder: number;
  CreatedAt: string;
  Products?: Product[];
  UpdatedAt: string;
  Link: string;
  Gradient: string;
}

export interface CreateCategoryDto {
  Name: string;
  Description?: string;
  ImageUrls?: string[];
  IsActive?: boolean;
  SortOrder?: number;
  ImageFiles?: File[];
  imageUrlsToRemove?: string[];
}

export interface UpdateCategoryDto {
  Id: number;
  Name: string;
  Description?: string;
  ImageUrls?: string[];
  IsActive?: boolean;
  SortOrder?: number;
  ImageFiles?: File[];
  imageUrlsToRemove?: string[];
}

export interface CategoryDto extends Category {}
