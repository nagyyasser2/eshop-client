import api from "./api";

export interface Category {
  id: number;
  name: string;
  description?: string | null;
  parentCategoryId?: number | null;
  parentCategory?: Category | null;
  childCategories?: Category[];
  products?: any[];
  imageUrls?: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryTreeDto {
  id: any;
  name: string;
  description?: string | null;
  parentCategoryId?: number | null;
  parentCategory?: CategoryTreeDto | null;
  childCategories?: CategoryTreeDto[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Service to handle catalog-related API calls
const getCategoriesTree = async (): Promise<CategoryTreeDto[]> => {
  try {
    const response = await api.get<CategoryTreeDto[]>("/Categories/tree");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories tree:", error);
    throw error;
  }
};

export default getCategoriesTree;
