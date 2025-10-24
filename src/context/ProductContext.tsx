import { createContext, useContext, useState, type ReactNode } from "react";
import type { ProductDto } from "../types/product.types";

interface ProductContextType {
  isProductPopupOpen: boolean;
  isProductSingleImagePreviewPopupOpen: boolean;
  product: ProductDto | null;
  setIsProductPopupOpen: (isOpen: boolean) => void;
  setProduct: (product: ProductDto | null) => void;
  setIsProductSingleImagePreviewPopupOpen: (isOpen: boolean) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);

  const [
    isProductSingleImagePreviewPopupOpen,
    setIsProductSingleImagePreviewPopupOpen,
  ] = useState(false);

  const [product, setProduct] = useState<ProductDto | null>(null);

  return (
    <ProductContext.Provider
      value={{
        isProductPopupOpen,
        isProductSingleImagePreviewPopupOpen,
        product,
        setIsProductPopupOpen,
        setProduct,
        setIsProductSingleImagePreviewPopupOpen,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }
  return context;
};
