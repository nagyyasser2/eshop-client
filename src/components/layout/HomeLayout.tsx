import CustomProducts from "../products/CustomProducts";
import FAQSection from "./FAQSection";
import Home from "./Home";
import WhyChooseUs from "./WhyChooseUs";

function HomeLayout() {
  return (
    <>
      <Home />
      <WhyChooseUs />
      <CustomProducts
        title="Best Seller Bags"
        categoryId={null}
        productId={null}
        featured={true}
      />
      <FAQSection />
    </>
  );
}

export default HomeLayout;
