import api from "./api";

export interface CategoryTreeDto {
  id: number;
  name: string;
  description?: string | null;
  parentCategoryId?: number | null;
  parentCategory?: CategoryTreeDto | null;
  childCategories?: CategoryTreeDto[];
  products?: any[]; // Adjust type if you have a specific ProductDto
  imageUrls?: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Service to handle catalog-related API calls
const catalogService = {
  getCategoriesTree: async (): Promise<CategoryTreeDto[]> => {
    try {
      const response = await api.get<CategoryTreeDto[]>("/Categories/tree");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories tree:", error);
      throw error;
    }
  },
};

export default catalogService;
