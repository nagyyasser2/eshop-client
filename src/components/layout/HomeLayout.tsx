import FeaturedProducts from "../products/FeaturedProducts";
import FAQSection from "./FAQSection";
import Home from "./Home";

function HomeLayout() {
  return (
    <>
      <Home />
      <FeaturedProducts />
      <FAQSection />
    </>
  );
}

export default HomeLayout;
