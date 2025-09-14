import { Link } from "react-router-dom";
import type { ProductDTO } from "../../api/products";
import { SERVER_URL } from "../../api/api";

type Product = ProductDTO;

interface ProductProps {
  product: Product;
}

function Product({ product }: ProductProps) {
  return (
    <div
      key={product.id}
      className=" group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={SERVER_URL + product.images?.[0]?.url || "/placeholder.png"}
            alt={product.name}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {product.category.name || "Unknown"}
            </span>
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toLocaleString()}
          </span>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium">
            {"Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
