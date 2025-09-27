import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  type ProductDTO,
  type PaginatedProductsResponse,
  type ProductQueryParams,
  fetchProductsForUseQuery,
} from "../../api/products";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductComponent from "./Product";

function FeaturedProducts() {
  const queryParams: ProductQueryParams = {
    featured: false,
    pageSize: 6,
  };

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

  // Get products from the single page response
  const products = data?.data ?? [];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-15 mb-8">
      <div className="container mx-auto ">
        {/* Header with View All Link */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                <Link to={"/products"} className="hover:underline">
                  Featured Products
                </Link>
              </span>
            </h1>
            <p className="text-gray-600">
              Discover our carefully curated selection of premium tech products
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <ProductCardSkeleton length={6} />}

        {/* Error State */}
        {isError && (
          <div className="text-center text-red-600">
            Error: {error?.message || "Failed to load products"}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: ProductDTO) => (
              <ProductComponent product={product} />
            ))}
          </div>
        )}
        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium">
            <Link to={"/products"}>Explore Our Products</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
