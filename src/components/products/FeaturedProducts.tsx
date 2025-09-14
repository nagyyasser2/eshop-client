import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaArrowRight } from "react-icons/fa";
import {
  type ProductDTO,
  type PaginatedProductsResponse,
  type ProductQueryParams,
  fetchProductsForUseQuery,
} from "../../api/products";
import { useState } from "react";
import { SERVER_URL } from "../../api/api";
import ProductCardSkeleton from "./ProductCardSkeleton";

// Map Product type to ProductDTO
type Product = ProductDTO;

function FeaturedProducts() {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Define the query params
  const queryParams: ProductQueryParams = {
    featured: true,
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

  // Get products from the single page response
  const products = data?.data ?? [];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-8 mb-8">
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

        {/* Loading State */}
        {isLoading && <ProductCardSkeleton length={4} />}

        {/* Error State */}
        {isError && (
          <div className="text-center text-red-600">
            Error: {error?.message || "Failed to load products"}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product: ProductDTO) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
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
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
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
        )}

        {/* View All Products Link */}
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
