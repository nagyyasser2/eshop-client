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

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

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
    <div className="bg-gray-50 py-16 mb-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-center mb-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300 bg-clip-text text-transparent">
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

        {/* Loading */}
        {isLoading && <ProductCardSkeleton length={6} />}

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
            {products.map((product: ProductDTO) => (
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
        <div className="text-center mt-12">
          <Link
            to={"/products"}
            className="inline-block bg-purple-400 hover:bg-purple-500 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300"
          >
            Explore Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
