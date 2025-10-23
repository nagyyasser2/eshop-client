import { useState } from "react";
import { SERVER_URL } from "../../api/api";
import { useCart } from "../../context/CartContext";
import type { CartItem } from "../../types/cart.types";
import type { ProductDto } from "../../types/product.types";
import productPlaceHolder from "../../assets/productPlaceHolder.svg";
import { useProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  product: ProductDto;
}

function Product({ product }: ProductProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { setProduct, setIsProductPopupOpen } = useProductContext();
  const navigate = useNavigate();

  const getImageUrl = (imagePath?: string): string => {
    if (imagePath) {
      return imagePath.startsWith("Uploads")
        ? SERVER_URL + imagePath
        : imagePath;
    }
    return productPlaceHolder;
  };

  const primaryImage = getImageUrl(product.ProductImages?.[0]?.Path);

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

  const handleImageClick = () => {
    setProduct(product);
    setIsProductPopupOpen(true);
  };

  const handleBagClick = () => {
    navigate(`/bag/${product.Id}`);
  };

  return (
    <div className="group relative w-full flex flex-col">
      {/* Image Container */}
      <div
        className="relative w-full aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <img
          src={primaryImage}
          alt={product.Name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div
          onClick={handleImageClick}
          className={`absolute inset-0 cursor-zoom-in bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Add to Cart Button - Appears on Hover at Bottom */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 transform ${
            isHovered
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(1);
            }}
            disabled={isAddingToCart}
            className={`w-full px-6 py-3 rounded-full font-normal text-slate-600  flex items-center justify-center gap-2 ${
              addedSuccess
                ? "bg-slate-600 text-white"
                : "text-slate-600 bg-white"
            } ${isAddingToCart && "opacity-75 scale-95"}`}
          >
            {addedSuccess ? (
              <>
                <span className="text-sm sm:text-base">Added.</span>
              </>
            ) : isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-sm sm:text-base">Adding...</span>
              </>
            ) : (
              <>
                <span className="text-sm sm:text-base">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details - Always Visible Below Image */}
      <div className="mt-4 text-center cursor-pointer" onClick={handleBagClick}>
        <h3 className="text-lg sm:text-xl font-semibold text-slate-600 mb-2 line-clamp-2">
          {product.Name}
        </h3>
        <p className="text-xl sm:text-2xl font-semibold text-slate-600">
          ${product.Price?.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default Product;
