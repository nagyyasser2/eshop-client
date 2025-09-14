import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  type ProductDTO,
  type PaginatedProductsResponse,
  type ProductQueryParams,
  fetchProductsForUseQuery,
} from "../../api/products";
import { useState, useRef } from "react";
import { SERVER_URL } from "../../api/api";
import ProductCardSkeleton from "./ProductCardSkeleton";

// Map Product type to ProductDTO
type Product = ProductDTO;

function SalesProducts() {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Define the query params
  const queryParams: ProductQueryParams = {
    featured: false,
    pageSize: 8,
  };

  // Use useQuery to fetch featured products (single page with 8 products)
  const { data, isLoading, isError, error } = useQuery<
    PaginatedProductsResponse,
    Error
  >({
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
        image: product.images?.[0]?.url || "/placeholder.png", // Fallback image
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll distance as needed
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  // Get products from the single page response
  const products = data?.data ?? [];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-8 mb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with View All Link */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                <Link to={"/products"} className="hover:underline">
                  Products
                </Link>
              </span>
            </h1>
            <p className="text-gray-600 text-base">
              Discover our carefully curated selection of premium tech products
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <ProductCardSkeleton length={4} />}

        {/* Error State */}
        {isError && (
          <div className="text-center text-red-600">
            Error: {error?.message || "Failed to load products"}
          </div>
        )}

        {/* Products Row with Navigation */}
        {!isLoading && !isError && (
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:shadow-xl"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-gray-600 hover:text-blue-600" />
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:shadow-xl"
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-gray-600 hover:text-blue-600" />
            </button>

            {/* Products Horizontal Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-0"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {products.map((product: ProductDTO) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-sm  overflow-hidden flex-shrink-0 w-72"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={
                          SERVER_URL + product.images?.[0]?.url ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          {product.category?.name || "Unknown"}
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
                      {product.description || "No description available"}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        ${product.price.toLocaleString()}
                      </span>
                      <button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium"
                        onClick={() => handleAddToCart(product, 1)}
                        disabled={isAddingToCart}
                      >
                        {isAddingToCart ? "Adding..." : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .scroll-smooth::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default SalesProducts;
