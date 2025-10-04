import { Link } from "react-router-dom";
import type { ProductDTO } from "../../api/products";
import { SERVER_URL } from "../../api/api";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { FaShoppingCart, FaSpinner } from "react-icons/fa";

type Product = ProductDTO;

interface ProductProps {
  product: Product;
}

function Product({ product }: ProductProps) {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (product: Product, quantity: number) => {
    setIsAddingToCart(true);
    try {
      await addToCart({
        ProductId: product.Id,
        ProductName: product.Name,
        UnitPrice: product.Price,
        ProductSKU: product.Sku,
        Quantity: quantity,
        CategoryName: product.Category?.Name,
        ImageUrl: product.Images?.[0]?.Url
          ? product.Images[0].Url.startsWith("http")
            ? product.Images[0].Url
            : SERVER_URL + product.Images[0].Url
          : "/placeholder.png",
        TotalPrice: product.Price * quantity,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div
      key={product.Id}
      className="group bg-white border border-gray-200 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.Id}`}>
          <img
            src={
              product.Images?.[0]?.Url
                ? product.Images[0].Url.startsWith("http")
                  ? product.Images[0].Url
                  : SERVER_URL + product.Images[0].Url
                : "/placeholder.png"
            }
            alt={product.Name}
            className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          <div className="absolute top-4 right-4">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {product.Category?.Name || "Unknown"}
            </span>
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {product.Name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.Description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.Price?.toLocaleString()}
          </span>
          <button
            onClick={() => handleAddToCart(product, 1)}
            disabled={isAddingToCart}
            className={`cursor-pointer bg-gradient-to-r from-pink-400 to-blue-400 p-3 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 group ${
              isAddingToCart ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Add to Cart"
          >
            {isAddingToCart ? (
              <FaSpinner className="w-5 h-5 animate-spin" />
            ) : (
              <FaShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
