import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { SERVER_URL } from "../../api/api";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductPopupProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

function ProductPopup({ product, isOpen, onClose }: ProductPopupProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Reset state when a new product is loaded or the popup opens/closes
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedImage(0);
    }
  }, [isOpen, product]);

  // If the popup is not open, render nothing
  if (!isOpen || !product) return null;

  const productImages = product?.ProductImages?.length
    ? product.ProductImages.map((img: any) => img.Path)
    : ["/placeholder-image.jpg"];

  const handleAddToCart = async () => {
    // Check if the product is available and if the requested quantity is in stock
    if (product.StockQuantity < quantity) return;

    setIsAddingToCart(true);
    try {
      await addToCart({
        ProductId: product.Id,
        ProductName: product.Name,
        UnitPrice: product.Price,
        ProductSku: product.Sku,
        Quantity: quantity,
        CategoryName: product.Category?.Name,
        ImagePath: product.ProductImages?.[0]?.Path
          ? product.ProductImages[0].Path.startsWith("http")
            ? product.ProductImages[0].Path
            : SERVER_URL + product.ProductImages[0].Path
          : "/placeholder.png",
        TotalPrice: product.Price * quantity,
      });

      // Optionally close the popup after successfully adding to cart
      // onClose();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    // 💡 Modal/Popup Wrapper: Fixed positioning, overlay, and backdrop
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300"
        // Prevent clicks inside the modal from closing it
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 bg-white rounded-full shadow-md hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Close product details"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="lg:text-sm">
          <div className="flex container flex-col lg:flex-row items-start justify-center lg:gap-12 mx-auto p-6 sm:p-8 lg:p-10">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 rounded-2xl">
              <div className="relative mb-4 rounded-2xl">
                <div className="rounded-2xl overflow-hidden flex items-center justify-center">
                  <img
                    src={
                      productImages[selectedImage]
                        ? productImages[selectedImage].startsWith("http")
                          ? productImages[selectedImage]
                          : SERVER_URL + productImages[selectedImage]
                        : "/placeholder.png"
                    }
                    alt={product.Name}
                    className="max-h-[400px] object-contain transition-transform duration-500 rounded-2xl w-full"
                    loading="lazy"
                  />
                </div>
              </div>

              {productImages.length > 1 && (
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                  {productImages.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={
                          image.startsWith("http") ? image : SERVER_URL + image
                        }
                        alt={`${product.Name} view ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="w-full lg:w-1/2 flex flex-col mt-6 lg:mt-0">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-700 mb-4">
                {product.Name}
              </p>

              {/* Price */}
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formatCurrency(product.Price)}
                </span>
                {product.IsFeatured && (
                  <>
                    <span className="text-gray-500 text-base sm:text-lg ml-2 line-through">
                      {formatCurrency(product.Price * 1.2)}
                    </span>
                    <span className="bg-green-100 text-blue-800 text-xs sm:text-sm px-2 py-1 rounded-full ml-2 sm:ml-3">
                      Save 20%
                    </span>
                  </>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 text-sm sm:text-base ml-2">
                  (4.8) • 156 reviews
                </span>
              </div>

              {/* Description */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {product.Description ||
                    product.ShortDescription ||
                    "No description available."}
                </p>
              </div>

              {/* Stock */}
              <div className="mb-4 sm:mb-6">
                <p
                  className={`text-sm font-medium ${
                    product.StockQuantity > 0
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {product.StockQuantity > 0
                    ? `${product.StockQuantity} in stock`
                    : "Out of stock"}
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <label className="text-sm font-medium text-gray-700 mr-3">
                      Quantity:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 bg-gray-50 font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(
                            Math.min(product.StockQuantity, quantity + 1)
                          )
                        }
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                        disabled={quantity >= product.StockQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={
                      Boolean(isAddingToCart) || product.StockQuantity === 0
                    }
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                          />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Free shipping on orders over $500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;
