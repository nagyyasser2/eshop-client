import { useQuery } from "@tanstack/react-query";
import {
  type PaginatedProductsResponse,
  type ProductQueryParams,
  fetchProductsForUseQuery,
} from "../../api/products";
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
import ProductGridSkeleton from "../sceletons/ProductGridSceleton";

interface CustomProducts {
  categoryId?: number | null;
  productId?: number | null;
  featured?: boolean | null;
  title: string;
}

function CustomProducts({
  categoryId,
  productId,
  title,
  featured = true,
}: CustomProducts) {
  const queryParams: ProductQueryParams = {
    pageSize: 5,
    featured,
    categoryId,
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
    <div className="bg-white container mx-auto px-4 sm:px-auto py-8">
      <div className="">
        {/* Header */}
        <div className="flex flex-col mb-10">
          <h4 className="text-md sm:text-xl lg:text-xl font-semibold mb-3 sm:mb-4 sm:px-0 text-slate-700">
            <span>{title}</span>
          </h4>
        </div>

        {/* Loading */}
        {isLoading && <ProductGridSkeleton />}
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
            {products.map((product: ProductDto) => {
              return (
                product.Id !== productId && (
                  <SwiperSlide key={product.Id}>
                    <ProductComponent product={product} />
                  </SwiperSlide>
                )
              );
            })}

            <style>{`
              .swiper-pagination-bullet {
                display: none;
                width: 10px;
                height: 10px;
                margin: 0 6px;
                background: rgb(148 163 184);
                opacity: 0.5;
                transition: all 0.3s ease;
              }
              .swiper-pagination-bullet-active {
                width: 30px;
                border-radius: 5px;
                background: rgb(59 130 246);
                opacity: 1;
              }
              .swiper-button-next,
              .swiper-button-prev {
                display: none; /* hide on all */
              }
            `}</style>
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default CustomProducts;
