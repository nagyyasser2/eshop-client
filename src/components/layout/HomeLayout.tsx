import Home from "../../pages/Home";
import SalesProducts from "../products/SalesProducts";

function HomeLayout() {
  return (
    <div className="layout">
      <Home />
      <SalesProducts />
    </div>
  );
}

export default HomeLayout;
