import FeaturedProducts from "../products/FeaturedProducts";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import Home from "./Home";
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
