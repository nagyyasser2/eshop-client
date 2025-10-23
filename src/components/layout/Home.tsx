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
    navigate(`/bags`, {
      state: { categoryId: category.Id, categoryName: category.Name },
    });
  };

  return (
    <div className="bg-white pb-1">
      <div className="container mx-auto mb-2 sm:mb-3 lg:mb-4 py-0 px-2 sm:px-4">
        {isLoading ? (
          <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-50 to-slate-50  p-6 sm:p-8 md:p-12 lg:p-16 animate-pulse">
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
            className="rounded-xl sm:rounded-4xl bg-gradient-to-r from-slate-100  to-slate-100"
          >
            {categories?.map((category) => (
              <SwiperSlide key={category.Id}>
                <div className="w-full flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 p-6 pb-10 sm:p-8 md:p-12 lg:p-16">
                  {/* Image Section */}
                  <div className="flex-1 flex justify-center w-full">
                    <div className="relative group w-full max-w-sm sm:max-w-md lg:max-w-lg">
                      <div
                        className={`absolute -inset-1  rounded-2xl sm:rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300`}
                      ></div>
                      <img
                        src={
                          category?.ImageUrls?.[0]
                            ? SERVER_URL + "/" + category.ImageUrls[0]
                            : "/placeholder-image.jpg"
                        }
                        alt={category.Name}
                        onClick={() => handleShopNow(category)}
                        className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover rounded-2xl sm:rounded-3xl  transform group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 text-center lg:text-left w-full px-2 sm:px-0">
                    <h4
                      className={`text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-slate-500`}
                    >
                      {category.Name}
                    </h4>
                    <p className="text-xl sm:text-xs md:text-sm lg:text-md xl:text-xl font-normal mb-3 sm:mb-4 lg:mb-6 text-slate-500 max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 line-clamp-2 sm:line-clamp-none">
                      {category?.Description ?? ""}
                    </p>

                    <button
                      onClick={() => handleShopNow(category)}
                      className="hidden sm:inline-flex items-center border-2 border-slate-400 px-4 py-2 cursor-pointer text-md sm:text-xl md:text-1xl font-semibold text-slate-500 rounded-full transform transition-all duration-300 group"
                    >
                      <span>Shop</span>
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
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <style>{`
              .swiper-pagination-bullet {
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
