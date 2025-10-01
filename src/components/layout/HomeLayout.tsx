import Home from "../../pages/Home";
import FeaturedProducts from "../products/FeaturedProducts";
import TestimonialsSection from "../testimonial/TestimonialsSection";
import FAQSection from "./FAQSection";
import WhyChooseUs from "./WhyChooseUs";

function HomeLayout() {
  return (
    <>
      <Home />
      <WhyChooseUs />
      <FeaturedProducts />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}

export default HomeLayout;
