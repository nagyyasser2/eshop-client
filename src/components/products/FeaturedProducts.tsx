import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  type PaginatedProductsResponse,
  type ProductQueryParams,
  fetchProductsForUseQuery,
} from "../../api/products";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductComponent from "./Product";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
import type { ProductDto } from "../../types/product.types";

function FeaturedProducts() {
  const queryParams: ProductQueryParams = {
    featured: true,
    pageSize: 5,
  };

  const { data, isLoading, isError, error } = useQuery<
    PaginatedProductsResponse,
    Error
  >({
    queryKey: ["products", queryParams],
    queryFn: (context) => {
      const params = context.queryKey[1] as ProductQueryParams;
      return fetchProductsForUseQuery({
        ...context,
        queryKey: ["products", params] as [string, ProductQueryParams],
        pageParam: 1,
      });
    },
  });

  const products = data?.data ?? [];

  return (
    <div className="bg-white  ">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col mb-10">
          <h4 className="text-md sm:text-xl lg:text-2xl font-normal mb-3 sm:mb-4 sm:px-0 text-slate-500">
            <span>Best Seller Bags</span>
          </h4>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed">
            Discover our carefully curated selection of premium tech products
          </p>
        </div>

        {/* Loading */}
        {isLoading && <ProductCardSkeleton length={4} />}
        {/* Error */}
        {isError && (
          <div className="text-center text-red-600">
            Error: {error?.message || "Failed to load products"}
          </div>
        )}
        {/* Swiper Products Carousel */}
        {!isLoading && !isError && products.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={24}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {products.map((product: ProductDto) => (
              <SwiperSlide key={product.Id}>
                <ProductComponent product={product} />
              </SwiperSlide>
            ))}
            <style>{`
              .swiper-button-next,
              .swiper-button-prev {
                display: none; /* hide on all */
              }
              @media (min-width: 640px) {
                .swiper-button-next,
                .swiper-button-prev {
                  display: flex; /* show from sm and up */
                }
              }
            `}</style>
          </Swiper>
        )}
        {/* CTA Button */}
        <div
          className="group mt-12 text-slate-500 flex flex-row-reverse items-center cursor-pointer 
                justify-center sm:justify-start text-center sm:text-right"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform duration-200 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>

          <Link
            to="/bags"
            className="inline-flex items-center text-md sm:text-xl font-normal text-slate-500"
          >
            See all
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
