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
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "Tech Innovations Inc.",
      content:
        "The products I purchased from this store have completely transformed my workflow. The quality is exceptional and the customer service was outstanding. I'll definitely be shopping here again!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1287&q=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      company: "Data Systems Co.",
      content:
        "I'm thoroughly impressed with the performance of the tech gear I bought. The delivery was fast, the packaging was secure, and everything works exactly as described. A truly seamless shopping experience.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1287&q=80",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Creative Director",
      company: "Design Studio LLC",
      content:
        "As a professional designer, I need reliable equipment that can keep up with my demanding workflow. The products I found here not only meet but exceed my expectations. Highly recommended!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "IT Director",
      company: "Global Solutions Ltd.",
      content:
        "We've been sourcing our tech equipment from this store for our entire department, and the consistency in quality is remarkable. Their products are reliable and their team is always helpful.",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1170&q=80",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from some of our satisfied
            customers about their experience with our products and service.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={24}
          slidesPerView={1}
          className="max-w-4xl mx-auto pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <Testimonial testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TestimonialsSection;
