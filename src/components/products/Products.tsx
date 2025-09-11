import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  fetchProductsForUseQuery,
  type ProductQueryParams,
  type PaginatedProductsResponse,
} from "../../api/products";
import Product from "./Product";
import Filters from "../utils/Filters";
import MobileFilterButton from "../utils/MobileFilterButton";

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

  const [filterParams, setFilterParams] = React.useState<{
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    tags?: string[];
    category?: string;
  }>({});

  // Use useMemo to create a stable query key tuple
  const queryKey = React.useMemo(
    () =>
      [
        "products",
        {
          pageSize: 20,
          minPrice: filterParams.minPrice,
          maxPrice: filterParams.maxPrice,
          color: filterParams.color,
          tags: filterParams.tags,
          category: filterParams.category,
          searchQuery: searchQuery,
        },
      ] as [string, ProductQueryParams & { searchQuery?: string }],
    [
      filterParams.minPrice,
      filterParams.maxPrice,
      filterParams.color,
      filterParams.tags,
      filterParams.category,
      searchQuery,
    ]
  );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      fetchProductsForUseQuery({
        queryKey,
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedProductsResponse) => {
      const totalPages = Math.ceil(lastPage.count / lastPage.pageSize);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const products = React.useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data]
  );

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const handleFilterChange = React.useCallback(
    (filters: {
      minPrice?: number;
      maxPrice?: number;
      color?: string;
      tags?: string[];
      category?: string;
    }) => {
      setFilterParams(filters);
    },
    []
  );

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">
          Error loading products: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Mobile filter toggle button */}

      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Overlay for mobile */}
        {isFiltersOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleFilters}
          ></div>
        )}

        {/* Filters sidebar */}
        <div
          className={`fixed lg:sticky top-25 left-0 bottom-25 h-full lg:h-auto w-3/4 max-w-sm lg:w-64 bg-white border-r lg:border border-gray-200 rounded-md z-50 md:z-auto transform transition-transform duration-300 ease-in-out md:transform-none ${
            isFiltersOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:self-start`}
        >
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={toggleFilters}
                className="md:hidden text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Filters onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <img src="/public/products.svg" alt="Products" width={200} />
            <MobileFilterButton toggleFilters={toggleFilters} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
          {hasNextPage && (
            <div className="flex justify-center">
              <button
                onClick={loadMore}
                disabled={isFetchingNextPage}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
          {isFetching && !isFetchingNextPage && (
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p>Loading...</p>
              </div>
            </div>
          )}
          {products.length === 0 && !isFetching && (
            <div className="text-center text-gray-500 mt-8">
              <p>No products found.</p>
              {searchQuery && (
                <p className="mt-2">Try adjusting your search terms.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
