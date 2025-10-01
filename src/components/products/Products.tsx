import React, { useEffect, useRef } from "react";
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
import ErrorMessage from "./ErrorMessage";
import { Promotion, PromotionalBanner } from "./Promotion";
import NoProductsFound from "./NoProductsFound";

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(true);
  const searchQuery = searchParams.get("search") || "";
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [filterParams, setFilterParams] = React.useState<{
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    tags?: string;
    categoryId?: string;
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
          categoryId: filterParams.categoryId,
          searchQuery: searchQuery,
        },
      ] as [string, ProductQueryParams & { searchQuery?: string }],
    [
      filterParams.minPrice,
      filterParams.maxPrice,
      filterParams.color,
      filterParams.tags,
      filterParams.categoryId,
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

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px", // Load more when 100px from bottom
      threshold: 0.1,
    });

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFilterChange = React.useCallback(
    (filters: {
      minPrice?: number;
      maxPrice?: number;
      color?: string;
      tags?: string;
      categoryId?: string;
    }) => {
      setFilterParams(filters);
    },
    []
  );

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container mx-auto  my-2 ">
      <Promotion />
      <Filters
        onFilterChange={handleFilterChange}
        isFiltersOpen={isFiltersOpen}
        toggleFilters={toggleFilters}
      />
      <div className="flex flex-col lg:flex-row gap-6 mt-4 relative">
        <main className="flex-1">
          <MobileFilterButton
            toggleFilters={toggleFilters}
            productsLength={products.length}
          />
          {isFetching && products.length === 0 ? (
            <ProductGridSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </div>

              {isFetchingNextPage && <ProductGridSkeleton />}

              <div ref={loadMoreRef} className="h-10" />

              {/* No products found message */}
              {products.length === 0 && !isFetching && (
                <NoProductsFound searchQuery={searchQuery} />
              )}
            </>
          )}
        </main>
      </div>
      <PromotionalBanner />
    </div>
  );
};

export default Products;
