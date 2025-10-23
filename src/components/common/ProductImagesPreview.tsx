import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import productPlaceHolder from "../../assets/productPlaceHolder.svg";
import { useProductContext } from "../../context/ProductContext";
import { SERVER_URL } from "../../api/api";

function ProductImagesPreview() {
  const { isProductPopupOpen, product, setIsProductPopupOpen } =
    useProductContext();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (isProductPopupOpen) {
      setSelectedImageIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isProductPopupOpen]);

  if (!isProductPopupOpen || !product) return null;

  const getImageUrl = (imagePath?: string): string => {
    if (imagePath) {
      return imagePath.startsWith("Uploads")
        ? SERVER_URL + imagePath
        : imagePath;
    }
    return productPlaceHolder;
  };

  const images =
    product.ProductImages?.length > 0
      ? product.ProductImages.map((img) => getImageUrl(img.Path))
      : [productPlaceHolder];

  const handlePrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleClose = () => {
    setIsProductPopupOpen(false);
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

      {/* Image Container */}
      <div className="relative w-full max-w-4xl aspect-square">
        <img
          src={images[selectedImageIndex]}
          alt={`${product.Name} - Image ${selectedImageIndex + 1}`}
          className="w-full h-full object-contain rounded-2xl"
        />

        {/* Navigation Arrows - Only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>
          </>
        )}

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/90 rounded-full shadow-lg">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === selectedImageIndex
                    ? "bg-slate-600 w-8"
                    : "bg-slate-300 hover:bg-slate-400 w-2"
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImagesPreview;
