import api from "./api"; // Adjust the import path based on your project structure

export interface Banner {
  id: number;
  title: string;
  description?: string;
  image: string;
  link: string;
  gradient: string;
}

export const getBanners = async (): Promise<Banner[]> => {
  try {
    const response: any = await api.get("/banners");
    // Map API response to the format expected by the Home component
    return response.data.map((banner: any) => ({
      id: banner.id,
      title: banner.title,
      description: banner.description,
      image: banner.imageUrl,
      link: banner.linkUrl || "/products", // Fallback to /products if linkUrl is null
      gradient: getGradient(banner.id), // Generate gradient based on ID
    }));
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};

// Helper function to assign gradients consistently based on banner ID
const getGradient = (id: number): string => {
  const gradients = [
    "from-blue-400 to-purple-400",
    "from-purple-400 to-pink-400",
    "from-pink-400 to-blue-400",
  ];
  return gradients[id % gradients.length];
};
