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
    <div className="bg-white py-0">
      <div className="container mx-auto px-2 sm:px-4">
        {isLoading ? (
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden h-[400px] sm:h-[500px] lg:h-[600px] animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4">
              <div className="h-10 sm:h-12 lg:h-14 w-64 sm:w-80 bg-white/30 rounded-lg" />
              <div className="h-6 sm:h-7 w-48 sm:w-64 bg-white/30 rounded-lg" />
              <div className="h-6 sm:h-7 w-56 sm:w-72 bg-white/30 rounded-lg" />
              <div className="h-12 sm:h-14 w-36 sm:w-40 bg-white/40 rounded-full mt-4" />
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            // className="home-swiper rounded-xl sm:rounded-2xl overflow-hidden"
            className="home-swiper  overflow-hidden"
          >
            {categories?.map((category) => (
              <SwiperSlide key={category.Id}>
                <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden group ">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${
                        category?.ImageUrls?.[0]
                          ? SERVER_URL + "/" + category.ImageUrls[0]
                          : "/placeholder-image.jpg"
                      })`,
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-blue-200/40" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-8 text-center">
                    <div className="max-w-3xl space-y-4 sm:space-y-6 animate-fade-in">
                      {/* Category Name */}
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 tracking-tight leading-tight drop-shadow-2xl">
                        {category.Name}
                      </h1>

                      {/* Description */}
                      {category?.Description && (
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-800/95 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-4">
                          {category.Description}
                        </p>
                      )}

                      {/* Shop Now Button */}
                      <button
                        onClick={() => handleShopNow(category)}
                        className="mt-6 sm:mt-8 inline-flex items-center gap-3 bg-white text-slate-900 px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300 group/btn"
                      >
                        <span>Shop Now</span>
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-1 transition-transform duration-200"
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

                  {/* Click overlay for mobile */}
                  <div
                    className="absolute inset-0 cursor-pointer sm:hidden"
                    onClick={() => handleShopNow(category)}
                  />
                </div>
              </SwiperSlide>
            ))}

            <style>{`
  /* 🟦 Scoped styles for the Home Swiper only */
  .home-swiper .swiper-pagination {
    bottom: 20px !important;
    display: flex !important;
    justify-content: center !important;
  }

  .home-swiper .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    margin: 0 6px;
    background: rgba(255, 255, 255, 0.6);
    opacity: 1;
    transition: all 0.3s ease;
  }

  
  .home-swiper .swiper-pagination-bullet-active {
    width: 32px;
    border-radius: 5px;
    background: white;
  }

  .home-swiper .swiper-button-next,
  .home-swiper .swiper-button-prev {
    color: white;
    background: rgba(0, 0, 0, 0.3);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
  }

  .home-swiper .swiper-button-next:hover,
  .home-swiper .swiper-button-prev:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
  }

  .home-swiper .swiper-button-next::after,
  .home-swiper .swiper-button-prev::after {
    font-size: 20px;
    font-weight: bold;
  }

  /* Hide navigation buttons globally by default (but NOT pagination) */
  .swiper-button-next,
  .swiper-button-prev {
    display: none !important;
  }

  /* Hide navigation buttons on mobile for home-swiper */
  .home-swiper .swiper-button-next,
  .home-swiper .swiper-button-prev {
    display: none;
  }

  /* Show navigation buttons on larger screens for home-swiper */
  @media (min-width: 640px) {
    .home-swiper .swiper-button-next,
    .home-swiper .swiper-button-prev {
      display: flex;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.8s ease-out;
  }
`}</style>
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default Home;
