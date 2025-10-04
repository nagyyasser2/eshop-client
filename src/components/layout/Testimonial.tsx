import { FaQuoteLeft } from "react-icons/fa";

export interface TestimonialType {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialProps {
  testimonial: TestimonialType;
}

function Testimonial({ testimonial }: TestimonialProps) {
  // Render star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-3xl mx-auto">
      {/* Quote icon */}
      <div className="mb-6">
        <FaQuoteLeft className="text-4xl text-blue-500 mx-auto opacity-50" />
      </div>

      {/* Rating */}
      <div className="flex justify-center mb-6">
        <div className="flex">{renderStars(testimonial.rating)}</div>
      </div>

      {/* Content */}
      <p className="text-gray-700 text-lg italic mb-8 leading-relaxed">
        "{testimonial.content}"
      </p>

      {/* Author info */}
      <div className="flex items-center justify-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover mr-4"
        />
        <div className="text-left">
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-gray-600 text-sm">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
