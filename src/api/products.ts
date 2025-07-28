import type { Product } from "../types";

export const fetchProducts = async (): Promise<Product[]> => {
  // Simulated API call
  return [
    {
      id: 1,
      name: "Laptop",
      price: 999.99,
      image: "laptop.jpg",
      description: "High-performance laptop",
    },
    {
      id: 2,
      name: "Smartphone",
      price: 499.99,
      image: "smartphone.jpg",
      description: "Latest model smartphone",
    },
    {
      id: 3,
      name: "Headphones",
      price: 89.99,
      image: "headphones.jpg",
      description: "Wireless headphones",
    },
  ];
};

export const fetchProductById = async (id: number): Promise<Product> => {
  // Simulated API call
  const products = await fetchProducts();
  const product = products.find((p) => p.id === id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};
