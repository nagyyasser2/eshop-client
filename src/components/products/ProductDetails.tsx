import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, Package, Ruler, Tag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import type { CartItem } from "../../types/cart.types";
import productPlaceHolder from "../../assets/productPlaceHolder.svg";
import { SERVER_URL } from "../../api/api";
import { fetchProductById } from "../../api/products";
import CustomProducts from "./CustomProducts";
import { useProductContext } from "../../context/ProductContext";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { setProduct, setIsProductSingleImagePreviewPopupOpen } =
    useProductContext();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id,
  });

  const getImageUrl = (imagePath?: string): string => {
    if (imagePath) {
      return imagePath.startsWith("Uploads")
        ? SERVER_URL + imagePath
        : imagePath;
    }
    return productPlaceHolder;
  };

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-slate-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images =
    product.ProductImages?.length > 0
      ? product.ProductImages.map((img) => getImageUrl(img.Path))
      : [productPlaceHolder];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQty = prev + delta;
      if (product.TrackQuantity) {
        return Math.max(1, Math.min(newQty, product.StockQuantity));
      }
      return Math.max(1, newQty);
    });
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    const cartItem: CartItem = {
      Quantity: quantity,
      UnitPrice: product.Price,
      TotalPrice: quantity * product.Price,
      ProductName: product.Name,
      ImagePath: product.ProductImages?.[0]?.Path || "",
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

  const isOutOfStock = product.TrackQuantity && product.StockQuantity === 0;

  const handleImageClick = (path: string) => {
    setProduct({
      ...product,
      SelectedImage: path, // or any direct URL
    });
    setIsProductSingleImagePreviewPopupOpen(true);
  };
  return (
    <div className="py-8 px-2 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 sm:px-auto">
        <div className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 px-0 py-2">
            {/* Image Section */}
            <div>
              <div className="relative w-full cursor-zoom-in aspect-square mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden">
                <img
                  onClick={() => handleImageClick(images[selectedImageIndex])}
                  src={images[selectedImageIndex]}
                  alt={`${product.Name} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnail Grid */}
              {images.length > 1 && (
                <div className="grid grid-cols-2">
                  {images.map((img, index) => (
                    <img
                      onClick={() => handleImageClick(img)}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover cursor-zoom-in"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Header */}
              <div>
                <h1 className="text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-2">
                  {product.Name}
                </h1>
                {product.Sku && (
                  <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    SKU: {product.Sku}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-base sm:text-lg md:text-xl font-semibold text-slate-700">
                    ${product.Price?.toLocaleString()}
                  </span>
                  {product.ComparePrice &&
                    product.ComparePrice > product.Price && (
                      <>
                        <span className="text-sm sm:text-base font-semibold text-slate-500 line-through">
                          ${product.ComparePrice?.toLocaleString()}
                        </span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs sm:text-sm font-semibold rounded-full">
                          Save $
                          {(
                            product.ComparePrice - product.Price
                          ).toLocaleString()}
                        </span>
                      </>
                    )}
                </div>
              </div>

              {/* Short Description */}
              {product.ShortDescription && (
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {product.ShortDescription}
                </p>
              )}

              {/* Stock Status */}
              {product.TrackQuantity && (
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-600" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      Stock Status:
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold ${
                        product.StockQuantity > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.StockQuantity > 0
                        ? `${product.StockQuantity} units available`
                        : "Out of stock"}
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              {!isOutOfStock && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center border border-slate-200 rounded-full overflow-hidden bg-white">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="px-3 py-2 hover:bg-slate-50 transition-colors disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-slate-600" />
                      </button>
                      <span className="px-5 py-2 font-bold text-base text-slate-800 min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="px-3 py-2 hover:bg-slate-50 transition-colors disabled:opacity-50"
                        disabled={
                          product.TrackQuantity &&
                          quantity >= product.StockQuantity
                        }
                      >
                        <Plus className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                    <span className="text-sm sm:text-base text-slate-600">
                      Total:{" "}
                      <span className="font-bold">
                        ${(product.Price * quantity).toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || isOutOfStock}
                className={`w-full py-3 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all mb-6 ${
                  addedSuccess
                    ? "bg-slate-600 text-white"
                    : isOutOfStock
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-slate-800 text-white hover:bg-slate-700 hover:shadow-md"
                }`}
              >
                {addedSuccess ? (
                  <>Added to Cart</>
                ) : isAddingToCart ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </>
                ) : isOutOfStock ? (
                  "Out of Stock"
                ) : (
                  <>Add to Cart</>
                )}
              </button>

              {/* Description */}
              {product.Description && (
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-700 mb-3">
                    Description
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {product.Description}
                  </p>
                </div>
              )}

              {/* Additional Details */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Product Details
                </h3>

                {product.Category && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 text-sm sm:text-base">
                    <span className="text-slate-600 font-medium">Category</span>
                    <span className="text-slate-800 font-semibold">
                      {product.Category.Name}
                    </span>
                  </div>
                )}

                {product.Weight > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 text-sm sm:text-base">
                    <span className="text-slate-600 font-medium flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" />
                      Weight
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {product.Weight} kg
                    </span>
                  </div>
                )}

                {product.Dimensions && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 text-sm sm:text-base">
                    <span className="text-slate-600 font-medium flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5" />
                      Dimensions
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {product.Dimensions}
                    </span>
                  </div>
                )}

                {product.Tags && (
                  <div className="flex justify-between items-center py-2 text-sm sm:text-base">
                    <span className="text-slate-600 font-medium flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      Tags
                    </span>
                    <span className="text-slate-800 font-semibold">
                      {product.Tags}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {product.CategoryId && (
        <CustomProducts
          categoryId={product.CategoryId}
          productId={product.Id}
          title="You may also like"
          featured={null}
        />
      )}
    </div>
  );
}

export default ProductDetails;
