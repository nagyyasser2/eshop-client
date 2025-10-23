import CustomProducts from "../products/CustomProducts";
import FAQSection from "./FAQSection";
import Home from "./Home";

function HomeLayout() {
  return (
    <>
      <Home />
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
