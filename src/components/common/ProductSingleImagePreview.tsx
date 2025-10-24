import { useEffect } from "react";
import { X } from "lucide-react";
import productPlaceHolder from "../../assets/productPlaceHolder.svg";
import { useProductContext } from "../../context/ProductContext";
import { SERVER_URL } from "../../api/api";

function ProductSingleImagePreview() {
  const {
    isProductSingleImagePreviewPopupOpen,
    product,
    setIsProductSingleImagePreviewPopupOpen,
  } = useProductContext();

  useEffect(() => {
    if (isProductSingleImagePreviewPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isProductSingleImagePreviewPopupOpen]);

  if (!isProductSingleImagePreviewPopupOpen || !product) return null;

  // ✅ Handle both local paths and absolute URLs
  const getImageUrl = (imagePath?: string): string => {
    if (imagePath) {
      return imagePath.startsWith("Uploads")
        ? SERVER_URL + imagePath
        : imagePath;
    }
    return productPlaceHolder;
  };

  // ✅ You’ll pass the specific image in product.SelectedImage
  const image = getImageUrl(product.SelectedImage);

  const handleClose = () => {
    setIsProductSingleImagePreviewPopupOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image */}
      <div className="relative w-full max-w-3xl aspect-square">
        <img
          src={image}
          alt={product.Name || "Product image"}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default ProductSingleImagePreview;
