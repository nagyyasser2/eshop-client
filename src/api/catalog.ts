import type { Category } from "../types/category.types";
import api from "./api";

// Service to handle catalog-related API calls
const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>("/Categories");
    const categories = response.data;

    return categories.map((category: Category, index: number) => ({
      Id: category.Id,
      Name: category.Name,
      Description: category.Description,
      ImageUrls: category.ImageUrls,
      IsActive: category.IsActive,
      SortOrder: category.SortOrder,
      CreatedAt: category.CreatedAt,
      UpdatedAt: category.UpdatedAt,
      Link: category.Link || "/products",
      Gradient: getGradient(index, categories.length), // pass index + total count
    }));
  } catch (error) {
    console.error("Error fetching categories tree:", error);
    throw error;
  }
};

const getGradient = (index: number, total: number): string => {
  const gradients = [
    "from-blue-300 to-purple-300",
    "from-purple-300 to-pink-300",
    "from-pink-300 to-blue-300",
    "from-blue-400 to-purple-400",
    "from-purple-400 to-pink-400",
    "from-pink-400 to-blue-400",
    "from-blue-500 to-purple-500",
    "from-purple-500 to-pink-500",
    "from-pink-500 to-blue-500",
  ];

  return gradients[index % gradients.length];
};

export default getCategories;
