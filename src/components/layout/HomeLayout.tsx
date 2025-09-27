import Home from "../../pages/Home";
import FeaturedProducts from "../products/FeaturedProducts";
import TestimonialsSection from "../testimonial/TestimonialsSection";
import FAQSection from "./FAQSection";
import WhyChooseUs from "./WhyChooseUs";

function HomeLayout() {
  return (
    <div className="layout">
      <Home />
      <WhyChooseUs />
      <FeaturedProducts />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}

export default HomeLayout;
