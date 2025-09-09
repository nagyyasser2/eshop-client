import Home from "../../pages/Home";
import FeaturedProducts from "../products/FeaturedProducts";

function HomeLayout() {
  return (
    <div className="layout">
      <Home />
      <FeaturedProducts />
    </div>
  );
}

export default HomeLayout;
