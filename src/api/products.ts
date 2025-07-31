// api/products.js
import type {
  AddToCartResponse,
  AddToCartInput,
  Product,
  ProductListResponse,
} from "../types";
import api from "./api";

export const fetchProducts = async (): Promise<Product[]> => {
  // Updated product list with 10 items
  return [
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      price: 2499.99,
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
      description: "Apple M2 Pro chip with 12-core CPU and 19-core GPU",
      category: "Laptops",
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 999.99,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      description: "Latest iPhone with titanium design and A17 Pro chip",
      category: "Smartphones",
    },
    {
      id: 3,
      name: "AirPods Pro (2nd Gen)",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=300&fit=crop",
      description: "Active Noise Cancellation and Spatial Audio",
      category: "Audio",
    },
    {
      id: 4,
      name: "iPad Air",
      price: 599.99,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
      description: "10.9-inch Liquid Retina display with M1 chip",
      category: "Tablets",
    },
    {
      id: 5,
      name: "Apple Watch Series 9",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=300&fit=crop",
      description: "Advanced health monitoring and fitness tracking",
      category: "Wearables",
    },
    {
      id: 6,
      name: "Dell XPS 13",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      description: "13.4-inch InfinityEdge display with Intel Core i7",
      category: "Laptops",
    },
    {
      id: 7,
      name: "Samsung Galaxy S24 Ultra",
      price: 1199.99,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      description: "200MP camera with S Pen and titanium frame",
      category: "Smartphones",
    },
    {
      id: 8,
      name: "Sony WH-1000XM5",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
      description: "Industry-leading noise canceling headphones",
      category: "Audio",
    },
    {
      id: 9,
      name: "Microsoft Surface Pro 9",
      price: 999.99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
      description: "2-in-1 laptop with touchscreen and Surface Pen",
      category: "Tablets",
    },
    {
      id: 10,
      name: "Google Pixel 8 Pro",
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
      description: "AI-powered photography with Tensor G3 chip",
      category: "Smartphones",
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

// Fetch paginated products
export const fetchPaginatedProducts = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}) => {
  const response = await api.get(`/products?page=${pageParam}`);
  return response.data as ProductListResponse;
};

// Add product to cart
export const addToCart = async (input: AddToCartInput) => {
  const response = await api.post("/cart", input);
  return response.data as AddToCartResponse;
};
