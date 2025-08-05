// ProductsGrid.tsx
import { Link } from "react-router-dom";
import { SERVER_URL } from "../api/api";
import { type ProductDTO } from "../api/products";
import ProductCardSkeleton from "./ProductCardSkeleton";

type Product = ProductDTO;

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  isAddingToCart: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
}

function ProductsGrid({
  products,
  isLoading,
  isAddingToCart,
  onAddToCart,
}: ProductsGridProps) {
  // Show skeleton only for products section
  if (isLoading) {
    return <ProductCardSkeleton length={6} />;
  }

  // Show no products message
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-600">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <div
          key={product.id}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
        >
          {/* Product Image */}
          <div className="relative overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img
                src={
                  SERVER_URL + product.images?.[0]?.url || "/placeholder.png"
                }
                alt={product.name}
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
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
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onAddToCart(product, 1)}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsGrid;
