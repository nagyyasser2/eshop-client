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
    retry: 0,
  });

  const handleShopNow = (category: any) => {
    navigate(`/products`, {
      state: { categoryId: category.Id, categoryName: category.Name },
    });
  };

  return (
    <div className="bg-white py-1">
      <div className="container mx-auto mb-16 py-2">
        {isLoading ? (
          // Skeleton Loader
          <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 shadow-1xl p-12 lg:p-16 animate-pulse">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Image Skeleton */}
              <div className="flex-1 flex justify-center">
                <div className="w-full max-w-lg h-80 bg-gray-200 rounded-3xl" />
              </div>

              {/* Text Skeleton */}
              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className="h-10 w-3/4 bg-gray-200 rounded-lg mx-auto lg:mx-0" />
                <div className="h-6 w-5/6 bg-gray-200 rounded-lg mx-auto lg:mx-0" />
                <div className="h-6 w-2/3 bg-gray-200 rounded-lg mx-auto lg:mx-0" />
                <div className="h-12 w-40 bg-gray-300 rounded-xl mx-auto lg:mx-0 mt-6" />
              </div>
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 shadow-1xl"
          >
            {categories?.map((category) => (
              <SwiperSlide key={category.Id}>
                <div className="w-full flex flex-col lg:flex-row items-center gap-12 p-12 lg:p-16">
                  {/* Image Section */}
                  <div className="flex-1 flex justify-center">
                    <div className="relative group">
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${category.Gradient} rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300`}
                      ></div>
                      <img
                        src={
                          category?.ImageUrls?.[0]
                            ? SERVER_URL + "/" + category.ImageUrls[0]
                            : "/placeholder-image.jpg"
                        }
                        alt={category.Name}
                        className="relative w-full max-w-lg h-80 object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 text-center lg:text-left">
                    <h2
                      className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r ${category.Gradient} bg-clip-text text-transparent`}
                    >
                      {category.Name}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                      {category.Description}
                    </p>
                    <button
                      onClick={() => handleShopNow(category)}
                      className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${category.Gradient} text-white font-semibold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 group`}
                    >
                      <span>Shop Now</span>
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
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
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default Home;
