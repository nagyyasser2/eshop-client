import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Testimonial, { type TestimonialType } from "./Testimonial";

function TestimonialsSection() {
  // Sample testimonials data
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
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
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
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
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
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
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
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from some of our satisfied
            customers about their experience with our products and service.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-8 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:shadow-xl"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-gray-600 hover:text-blue-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-8 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:shadow-xl"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-gray-600 hover:text-blue-600" />
          </button>

          {/* Current Testimonial */}
          <div className="px-8">
            <Testimonial testimonial={testimonials[currentTestimonial]} />
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
