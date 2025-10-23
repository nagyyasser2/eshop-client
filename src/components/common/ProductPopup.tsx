import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import { SERVER_URL } from "../../api/api";
import type { CartItem } from "../../types/cart.types";

export default function ProductPopup() {
  const { product, isProductPopupOpen, setIsProductPopupOpen } =
    useProductContext();
  const { addToCart } = useCart();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isProductPopupOpen || !product) return null;

  const images = product.ProductImages || [];
  const currentImage = images[currentImageIndex]?.Path;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = async (quantity: number) => {
    setIsAddingToCart(true);

    const cartItem: CartItem = {
      Quantity: quantity,
      UnitPrice: product.Price,
      TotalPrice: quantity * product.Price,
      ProductName: product.Name,
      ImagePath: product.ProductImages[0].Path,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative bg-white rounded-2xl shadow-lg max-w-lg w-full overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setIsProductPopupOpen(false)}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product image gallery */}
        {images.length > 0 && (
          <div className="relative">
            <img
              src={SERVER_URL + currentImage}
              alt={product.Name}
              className="w-full h-64 object-cover"
            />

            {/* Navigation arrows - only show if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        )}

        {/* Thumbnail gallery */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto">
            {images.map((img, index) => (
              <button
                key={img.Id}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden  transition ${
                  index === currentImageIndex
                    ? "border-blue-600"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <img
                  src={SERVER_URL + img.Path}
                  alt={`${product.Name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Product details */}
        <div className="p-5 space-y-3">
          <h2 className="text-2xl font-semibold text-slate-800">
            {product.Name}
          </h2>

          {product.ShortDescription && (
            <p className="text-slate-600">{product.ShortDescription}</p>
          )}

          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-blue-600">
              ${product.Price.toFixed(2)}
            </span>
            {product.ComparePrice && (
              <span className="text-slate-400 line-through text-sm">
                ${product.ComparePrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.StockQuantity <= 0 && (
            <p className="text-red-500 font-medium">Out of stock</p>
          )}

          {product.Description && (
            <div className="pt-2 text-slate-700 text-sm leading-relaxed">
              {product.Description}
            </div>
          )}

          {/* Add to Cart button */}
          <button
            onClick={() => handleAddToCart(1)}
            disabled={isAddingToCart || product.StockQuantity <= 0}
            className={`mt-4 w-full py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transform transition-all duration-300 flex items-center justify-center gap-2 ${
              addedSuccess
                ? "bg-blue-500 hover:bg-blue-600"
                : product.StockQuantity <= 0
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-300 hover:bg-blue-400"
            } ${isAddingToCart ? "opacity-75 scale-95" : ""}`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Cart!</span>
              </>
            ) : isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : product.StockQuantity <= 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
