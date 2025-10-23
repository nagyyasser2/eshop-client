import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

import Testimonial, { type TestimonialType } from "./Testimonial";

function TestimonialsSection() {
  // Sample testimonials
  const testimonials: TestimonialType[] = [
    {
      id: 1,
      name: "Morsy",
      role: "Product Manager",
      company: "Tech Innovations Inc.",
      content:
        "The products I purchased from this store have completely transformed my workflow. The quality is exceptional and the customer service was outstanding. I'll definitely be shopping here again!",
      rating: 5,
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQE5mMQhpYpSuQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724866382343?e=1762387200&v=beta&t=5ehrrKJljZy-ZQC3Dx87I4Ruu294l9I2gSIBV9nL6Ao",
    },
    {
      id: 2,
      name: "Ahmed Nabil",
      role: "Software Engineer",
      company: "Data Systems Co.",
      content:
        "I'm thoroughly impressed with the performance of the tech gear I bought. The delivery was fast, the packaging was secure, and everything works exactly as described. A truly seamless shopping experience.",
      rating: 4,
      image:
        "https://media.licdn.com/dms/image/v2/C4D03AQHy7vIhpRwoMQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1659956448032?e=1762387200&v=beta&t=Vw1TRaIH26em9RJpF_baMb4O3_f4M6F_aw3LcvZEDBY",
    },
    {
      id: 3,
      name: "Omar Fathy",
      role: "Creative Director",
      company: "Design Studio LLC",
      content:
        "As a professional designer, I need reliable equipment that can keep up with my demanding workflow. The products I found here not only meet but exceed my expectations. Highly recommended!",
      rating: 5,
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQHwL4P29xk3ew/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1692551649114?e=1762387200&v=beta&t=dwFmMg400hYe3UTWiX6pgJyBymqbqW9NYLeYlwKe4kE",
    },
    {
      id: 4,
      name: "Hussien",
      role: "IT Director",
      company: "Global Solutions Ltd.",
      content:
        "We've been sourcing our tech equipment from this store for our entire department, and the consistency in quality is remarkable. Their products are reliable and their team is always helpful.",
      rating: 4,
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQEUEyWUs8wt5Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730051934610?e=1762387200&v=beta&t=xkArf1kkHkOSIgw0BXb46iSyFp7vgxjcJUpvUYbN_es",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-left mb-12">
        <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 sm:px-0 text-slate-500">
          <span>What Our Customers Say</span>
        </h4>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
          Hear directly from our happy customers about their experience with our{" "}
          <br className="hidden sm:block" />
          products and services.
        </p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={24}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 2 },
        }}
        className="pb-12"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <Testimonial testimonial={testimonial} />
          </SwiperSlide>
        ))}

        <style>{`
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 10px 6px;
            background-color: rgba(99, 102, 241, 0.4);
          }
          .swiper-pagination-bullet-active {
            background-color: rgba(168, 85, 247, 0.8);
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
    </div>
  );
}

export default TestimonialsSection;
