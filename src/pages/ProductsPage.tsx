// ProductList.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import SearchBar from "../components/SearchBar";
import MobileSidebar from "../components/MobileSidebar";
import CategorySidebar from "../components/CategorySidebar";

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

// Price range helper function
const isPriceInRange = (price: number, rangeId: string) => {
  switch (rangeId) {
    case "under-500":
      return price < 500;
    case "500-1000":
      return price >= 500 && price <= 1000;
    case "1000-2000":
      return price >= 1000 && price <= 2000;
    case "over-2000":
      return price > 2000;
    default:
      return true;
  }
};

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      const categoryMatch =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      // Price range filter
      const priceMatch = isPriceInRange(product.price, selectedPriceRange);

      // Search filter
      const searchMatch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    })
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-31">
              <CategorySidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedPriceRange={selectedPriceRange}
                onPriceRangeChange={setSelectedPriceRange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-3 items-center">
                {/* Header */}
                <div>
                  <div className="container mx-auto pl-0 pr-2">
                    <div className="flex justify-center items-center gap-4">
                      {/* Mobile Filter Button */}
                      <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="lg:hidden flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FaFilter className="text-sm" />
                        <span className="text-sm font-medium">Filters</span>
                      </button>

                      {/* Search Bar */}
                      <SearchBar onSearch={handleSearch} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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
                          disabled={isAddingToCart}
                        >
                          {isAddingToCart ? "Adding..." : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPriceRange={selectedPriceRange}
        onPriceRangeChange={setSelectedPriceRange}
      />
    </div>
  );
}

export default ProductsPage;
