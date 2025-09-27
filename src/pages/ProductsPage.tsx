import { useState } from "react";
import { useCart } from "../context/CartContext";
import MobileSidebar from "../components/products/MobileSidebar";
import CategorySidebar from "../components/category/CategorySidebar";
import ProductsGrid from "../components/products/ProductsGrid";
import {
  fetchProductsForUseQuery,
  type PaginatedProductsResponse,
  type ProductDTO,
  type ProductQueryParams,
} from "../api/products";
import { useQuery } from "@tanstack/react-query";

type Product = ProductDTO;

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Define the query params
  const queryParams: ProductQueryParams = {
    pageSize: 8,
  };

  // Use useQuery to fetch featured products (single page with 8 products)
  const {
    data: productsResponse,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedProductsResponse, Error>({
    queryKey: ["products", queryParams],
    queryFn: (context) => {
      // Type assertion to ensure correct types
      const params = context.queryKey[1] as ProductQueryParams;
      return fetchProductsForUseQuery({
        ...context,
        queryKey: ["products", params] as [string, ProductQueryParams],
        pageParam: 1,
      });
    },
  });

  // Extract products array from the response
  const products = productsResponse?.data || [];

  // Handle error state
  if (isError) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-red-400 text-4xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error loading products
            </h3>
            <p className="text-gray-600">
              {error?.message || "Something went wrong"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Filter and sort products
  const filteredProducts = products.filter((product: Product) => {
    // Category filter
    const categoryMatch =
      selectedCategory === "all" ||
      product.category.name.toLowerCase() === selectedCategory.toLowerCase();

    // Search filter
    const searchMatch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const handleAddToCart = async (product: Product, quantity: number) => {
    setIsAddingToCart(true);
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        sku: product.sku,
        quantity,
        category: product.category,
        image: product.images?.[0]?.url || "/placeholder.png",
      });
      // Optional: Show success message or toast
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Optional: Show error message
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="container mx-auto ">
        <div className="flex gap-8">
          {/* Desktop Sidebar - Always visible, no skeleton here */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
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
            {/* Products Grid - Skeleton only shows here */}
            <ProductsGrid
              products={filteredProducts}
              isLoading={isLoading}
              isAddingToCart={isAddingToCart}
              onAddToCart={handleAddToCart}
            />
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
