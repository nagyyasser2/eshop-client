import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { FaArrowRight } from "react-icons/fa";

// Mock data for demonstration (replace with your actual API call)
const products = [
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

function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  const handleAddToCart = async (product: Product, quantity: number) => {
    setIsAddingToCart(true);
    try {
      await addToCart({ ...product, quantity });
      // Optional: Show success message or toast
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 mb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of premium tech products
          </p>
        </div>
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price.toLocaleString()}
                  </span>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium"
                    onClick={() => handleAddToCart(product, product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors text-xl mt-10 font-semibold group"
          >
            <span className="relative transition-all duration-300 ease-in-out group-hover:underline group-hover:underline-offset-4">
              View All Products
            </span>
            <FaArrowRight className="ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2 text-gray-600 hover:text-gray-800 transition-colors" />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FeaturedProducts;
