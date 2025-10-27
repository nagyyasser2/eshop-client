import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams, useLocation } from "react-router-dom";
import {
  fetchProductsForUseQuery,
  type ProductQueryParams,
  type PaginatedProductsResponse,
} from "../../api/products";
import Product from "./Product";
import Filters from "./Filters";
import MobileFilterButton from "./MobileFilterButton";
import ProductGridSkeleton from "../sceletons/ProductGridSceleton";
import ErrorMessage from "./ErrorMessage";
import { Promotion, PromotionalBanner } from "./Promotion";
import NoProductsFound from "./NoProductsFound";

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const searchQuery = searchParams.get("search") || "";
  const location = useLocation();

  // Get categoryId, categoryName from location state
  const categoryIdFromState = location.state?.categoryId;
  const categoryNameFromState = location.state?.categoryName;

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [filterParams, setFilterParams] = React.useState<{
    minPrice?: number;
    maxPrice?: number;
    daysBack?: number;
    color?: string;
    tags?: string;
    categoryId?: string;
  }>({
    categoryId: categoryIdFromState,
  });

  const queryKey = React.useMemo(
    () =>
      [
        "products",
        {
          pageSize: 20,
          minPrice: filterParams.minPrice,
          maxPrice: filterParams.maxPrice,
          daysBack: filterParams.daysBack,
          color: filterParams.color,
          tags: filterParams.tags,
          categoryId: filterParams.categoryId,
          searchQuery: searchQuery,
        },
      ] as [string, ProductQueryParams & { searchQuery?: string }],
    [
      filterParams.minPrice,
      filterParams.maxPrice,
      filterParams.daysBack,
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
      rootMargin: "100px",
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
      daysBack?: number;
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

  React.useEffect(() => {
    if (categoryIdFromState) {
      setFilterParams((prev) => ({
        ...prev,
        categoryId: categoryIdFromState,
      }));
    }
  }, [categoryIdFromState]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container mx-auto p-4 py-0 pb-2">
      <Promotion />
      <Filters
        onFilterChange={handleFilterChange}
        isFiltersOpen={isFiltersOpen}
        toggleFilters={toggleFilters}
        initialCategoryId={categoryIdFromState}
        initialCategoryName={categoryNameFromState}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <Product key={product.Id} product={product} />
                ))}
              </div>

              {isFetchingNextPage && <ProductGridSkeleton />}

              <div ref={loadMoreRef} className="h-10" />

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
