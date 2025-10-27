import { useState } from "react";
import { useCart } from "../../context/CartContext";
import type { CartItem } from "../../types/cart.types";
import type { ProductDto } from "../../types/product.types";
import productPlaceHolder from "../../assets/productPlaceHolder.svg";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../api/api";

interface ProductProps {
  product: ProductDto;
}

function Product({ product }: ProductProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const { addToCart } = useCart();
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

  const handleBagClick = () => {
    navigate(`/bag/${product.Id}`);
  };

  return (
    <div className="group relative w-full flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div
        className="relative w-full aspect-square overflow-hidden bg-gray-50 cursor-pointer"
        onClick={handleBagClick}
      >
        {/* Product Image */}
        <img
          src={primaryImage}
          alt={product.Name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col gap-3">
        {/* Product Name */}
        <div className="cursor-pointer" onClick={handleBagClick}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-gray-600 transition-colors">
            {product.Name}
          </h3>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-bold text-slate-700">
            ${product.Price?.toLocaleString()}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(1);
            }}
            disabled={isAddingToCart || addedSuccess}
            className={`
              relative px-4 py-2.5 rounded-md text-sm font-medium
              transition-all duration-200 ease-in-out
              ${
                addedSuccess
                  ? "bg-blue-400 text-white"
                  : "bg-slate-600 text-white hover:bg-slate-700 active:scale-95"
              }
              ${isAddingToCart && "opacity-70 cursor-wait"}
              disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700
            `}
          >
            <span className="flex items-center gap-2">
              {addedSuccess ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Added</span>
                </>
              ) : isAddingToCart ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Adding</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>Add to Cart</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
