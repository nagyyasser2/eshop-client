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
import ProductGridSkeleton from "../sceletons/ProductGridSceleton";

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
    <div className="container mx-auto px-2 py-2">
      <div className="flex flex-col lg:flex-row gap-8 relative">
        <Filters
          onFilterChange={handleFilterChange}
          isFiltersOpen={isFiltersOpen}
          toggleFilters={toggleFilters}
        />

        <main className="flex-1">
          <MobileFilterButton
            toggleFilters={toggleFilters}
            productsLength={products.length}
          />
          {isFetching && products.length === 0 ? (
            <ProductGridSkeleton />
          ) : (
            <>
              <div className="mb-4 hidden lg:block">
                <p className="text-slate-500">
                  ( {products.length} ) - products
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
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
              {isFetching && !isFetchingNextPage && <></>}

              {products.length === 0 && !isFetching && (
                <div className="text-center text-gray-500 mt-8">
                  <p>No products found.</p>
                  {searchQuery && (
                    <p className="mt-2">Try adjusting your search terms.</p>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
