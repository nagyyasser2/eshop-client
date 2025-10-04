import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../../context/CartContext";
import { fetchProductById } from "../../api/products";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { SERVER_URL } from "../../api/api";
import { formatCurrency } from "../../utils/formatCurrency";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
  });

  const productImages = product?.Images?.length
    ? product.Images.map((img) => img.Url)
    : ["/placeholder-image.jpg"];

  const handleAddToCart = async () => {
    if (!product || product.StockQuantity < quantity) return;

    // Check if variant is required but not selected
    if (product.Variants?.length && !selectedVariant) {
      alert("Please select a variant");
      return;
    }

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

      // Optional: Reset quantity after adding
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't load this product.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
      <div className="flex max-w-5xl flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mx-auto">
        {/* Image Section */}
        <div className="container mx-auto sm:p-0 lg:p-2 w-full lg:w-1/2">
          <div className="relative mb-4">
            <div className="aspect-square rounded-2xl overflow-hidden flex items-center justify-centerbg-gradient-to-br from-indigo-50 to-purple-50">
              <img
                src={
                  productImages[selectedImage]
                    ? productImages[selectedImage].startsWith("http")
                      ? productImages[selectedImage]
                      : SERVER_URL + productImages[selectedImage]
                    : "/placeholder.png"
                }
                alt={product.Name}
                className="w-full object-contain transition-transform duration-500 rounded-2xl"
                loading="lazy"
              />
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-blue-500 text-white text-sm px-3 py-2 rounded-full font-medium">
                {product.IsFeatured
                  ? "Featured"
                  : product.Category?.Name || "Product"}
              </span>
            </div>
          </div>
          {productImages.length > 1 && (
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
              {productImages.map((image, index) => (
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
                    src={image.startsWith("http") ? image : SERVER_URL + image}
                    alt={`${product.Name} view ${index + 1}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="p-4 sm:p-6 lg:p-8 w-full lg:w-1/2 flex flex-col">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {product.Name}
          </h1>
          <div className="mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {formatCurrency(product.Price)}
            </span>
            {product.IsFeatured && (
              <span className="text-gray-500 text-base sm:text-lg ml-2 line-through">
                {formatCurrency(product.Price * 1.2)}
              </span>
            )}
            {product.IsFeatured && (
              <span className="bg-green-100 text-green-800 text-xs sm:text-sm px-2 py-1 rounded-full ml-2 sm:ml-3">
                Save 20%
              </span>
            )}
          </div>
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
          {product.Variants?.length ? (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Variants
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.Variants.map((variant) => (
                  <button
                    key={variant.Id}
                    onClick={() => setSelectedVariant(variant.Id)}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg border transition-all text-sm sm:text-base ${
                      selectedVariant === variant.Id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {variant.Name}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
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
          <div className="mb-4 sm:mb-6">
            <p
              className={`text-sm font-medium ${
                product.StockQuantity > 0 ? "text-green-600" : "text-red-600"
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
                      setQuantity(Math.min(product.StockQuantity, quantity + 1))
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
                  Boolean(isAddingToCart) ||
                  product.StockQuantity === 0 ||
                  (Boolean(product.Variants?.length) && !selectedVariant)
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
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2"
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
  );
}

export default ProductDetails;
