import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { type Banner } from "../api/banners"; // Adjust the import path
import { SERVER_URL } from "../api/api";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const queryClient = useQueryClient();

  // Access cached banners data
  const banners: Banner[] = queryClient.getQueryData(["banners"]) || [];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="bg-white py-1">
      {/* Slider Section */}
      <div className="container mx-auto px-6 mb-16 mt-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl">
          {/* Slides Container */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className="w-full flex-shrink-0 flex flex-col lg:flex-row items-center gap-12 p-12 lg:p-16"
              >
                {/* Image Section */}
                <div className="flex-1 flex justify-center">
                  <div className="relative group">
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${banner.gradient} rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300`}
                    ></div>
                    <img
                      src={SERVER_URL + "/" + banner.image}
                      alt={banner.title}
                      className="relative w-full max-w-lg h-80 object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center lg:text-left">
                  <h2
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r ${banner.gradient} bg-clip-text text-transparent`}
                  >
                    {banner.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                    {banner.description}
                  </p>
                  <Link
                    to={banner.link}
                    className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${banner.gradient} text-white font-semibold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 group`}
                  >
                    <span>Explore Collection</span>
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
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
