import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

import { SERVER_URL } from "../../api/api";
import getCategories from "../../api/catalog";

function Home() {
  const navigate = useNavigate();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 3,
  });

  const handleShopNow = (category: any) => {
    navigate(`/products`, {
      state: { categoryId: category.Id, categoryName: category.Name },
    });
  };

  return (
    <div className="bg-white pb-1">
      <div className="container mx-auto mb-8 sm:mb-12 lg:mb-16 py-2 px-2 sm:px-4">
        {isLoading ? (
          // Skeleton Loader
          <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg sm:shadow-xl p-6 sm:p-8 md:p-12 lg:p-16 animate-pulse">
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              {/* Image Skeleton */}
              <div className="flex-1 flex justify-center w-full">
                <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-48 sm:h-64 md:h-72 lg:h-80 bg-gray-200 rounded-2xl sm:rounded-3xl" />
              </div>
              {/* Text Skeleton */}
              <div className="flex-1 text-center lg:text-left space-y-3 sm:space-y-4 lg:space-y-6 w-full">
                <div className="h-8 sm:h-9 lg:h-10 w-3/4 bg-gray-200 rounded-lg mx-auto lg:mx-0" />
                <div className="h-5 sm:h-6 w-5/6 bg-gray-200 rounded-lg mx-auto lg:mx-0" />
                <div className="h-5 sm:h-6 w-2/3 bg-gray-200 rounded-lg mx-auto lg:mx-0" />
                <div className="h-10 sm:h-11 lg:h-12 w-32 sm:w-36 lg:w-40 bg-gray-300 rounded-xl mx-auto lg:mx-0 mt-4 sm:mt-5 lg:mt-6" />
              </div>
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg sm:shadow-xl "
          >
            {categories?.map((category) => (
              <SwiperSlide key={category.Id}>
                <div className="w-full flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 p-6 pb-10 sm:p-8 md:p-12 lg:p-16">
                  {/* Image Section */}
                  <div className="flex-1 flex justify-center w-full">
                    <div className="relative group w-full max-w-sm sm:max-w-md lg:max-w-lg">
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${category.Gradient} rounded-2xl sm:rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300`}
                      ></div>
                      <img
                        src={
                          category?.ImageUrls?.[0]
                            ? SERVER_URL + "/" + category.ImageUrls[0]
                            : "/placeholder-image.jpg"
                        }
                        alt={category.Name}
                        className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl transform group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 text-center lg:text-left w-full px-2 sm:px-0">
                    <h2
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r ${category.Gradient} bg-clip-text text-transparent`}
                    >
                      {category.Name}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 line-clamp-2 sm:line-clamp-none">
                      {category?.Description ?? ""}
                    </p>

                    <button
                      onClick={() => handleShopNow(category)}
                      className={`inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-gradient-to-r ${category.Gradient} text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 group`}
                    >
                      <span>Shop Now</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform duration-200"
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
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <style>{`
            .swiper-pagination-bullet {
            display: none;
                width: 10px;
                height: 10px;
                margin: 10px 6px;
              }
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
      </div>
    </div>
  );
}

export default Home;
