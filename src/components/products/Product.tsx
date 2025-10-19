import { useState } from "react";
import { ShoppingCart, Check, Eye } from "lucide-react";
import { SERVER_URL } from "../../api/api";
import { useCart } from "../../context/CartContext";
import type { CartItem } from "../../types/cart.types";
import type { ProductDto } from "../../types/product.types";
import productPlaceHolder from "../../assets/productPlaceHolder.svg";
import { Link } from "react-router-dom";

interface ProductProps {
  product: ProductDto;
}

function Product({ product }: ProductProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const getImageUrl = (imagePath?: string): string => {
    if (imagePath) {
      return imagePath.startsWith("Uploads")
        ? SERVER_URL + imagePath
        : imagePath;
    }
    return productPlaceHolder;
  };

  const primaryImage = getImageUrl(product.ProductImages?.[0]?.Path);
  const secondaryImage = product.ProductImages?.[1]?.Path
    ? getImageUrl(product.ProductImages[1].Path)
    : null;

  const handleAddToCart = async (quantity: number) => {
    setIsAddingToCart(true);

    const cartItem: CartItem = {
      Quantity: quantity,
      UnitPrice: product.Price,
      TotalPrice: quantity * product.Price,
      ProductName: product.Name,
      ProductSku: product.Sku,
      ProductId: product.Id,
    };

    await addToCart(cartItem);

    setIsAddingToCart(false);
    setAddedSuccess(true);

    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTimeout(() => setIsTouched(false), 2000);
  };

  // Check if we're on a touch device
  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  // Determine if overlay should be visible
  const shouldShowOverlay =
    isExpanded || isTouched || (isHovered && !isTouchDevice());

  return (
    <div
      className={`group relative w-full aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200  hover:shadow-2xl transition-all duration-500 ${
        isExpanded ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isTouchDevice()) {
          setIsExpanded(!isExpanded);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Primary Product Image */}
      <img
        src={primaryImage}
        alt={product.Name}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isExpanded || isTouched ? "opacity-0" : "group-hover:opacity-0"
        }`}
        loading="lazy"
      />

      {/* Secondary Product Image - Shows on Hover/Touch */}
      {secondaryImage && (
        <img
          src={secondaryImage}
          alt={`${product.Name} - alternate view`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 transform ${
            isExpanded || isTouched
              ? "opacity-100 scale-110"
              : "group-hover:opacity-100 group-hover:scale-110 opacity-0"
          }`}
          loading="lazy"
        />
      )}

      {/* Fallback scaling for primary when no secondary image */}
      {!secondaryImage && (
        <img
          src={primaryImage}
          alt={product.Name}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
            isExpanded || isTouched
              ? "scale-110"
              : "group-hover:scale-110 scale-100"
          }`}
          loading="lazy"
        />
      )}

      {/* Overlay on Hover/Touch */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          shouldShowOverlay ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Category Badge - Top Right (always visible) */}
      <div className="absolute top-4 right-4 z-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-md backdrop-blur-sm">
          {product.Category?.Name || "Premium"}
        </div>
      </div>

      {/* Actions Overlay - Appears on Hover/Touch */}
      <div
        className={`absolute inset-0 z-3 flex flex-col items-center justify-center gap-4 transition-all duration-300 transform ${
          shouldShowOverlay
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Product Info */}
        <div
          className={`text-center text-white mb-2 transition-transform duration-500 ${
            shouldShowOverlay ? "translate-y-0" : "translate-y-4"
          }`}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-1 line-clamp-2">
            {product.Name}
          </h3>
          <p className="text-sm sm:text-base text-gray-200 mb-3 line-clamp-2">
            {product.Description}
          </p>
          <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ${product.Price?.toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex gap-3 transition-transform duration-500 delay-100 ${
            shouldShowOverlay ? "translate-y-0" : "translate-y-4"
          }`}
        >
          {/* View Button */}
          <Link
            to={`/product/${product.Id}`}
            onClick={(e) => e.stopPropagation()}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(1);
            }}
            disabled={isAddingToCart}
            className={`px-5 sm:px-7 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl transform transition-all duration-300 flex items-center gap-2 ${
              addedSuccess
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-110"
            } ${isAddingToCart ? "opacity-75 scale-95" : ""}`}
            title={addedSuccess ? "Added to cart!" : "Add to cart"}
          >
            {addedSuccess ? (
              <>
                <Check className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Added!</span>
              </>
            ) : isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline text-sm">Adding...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
