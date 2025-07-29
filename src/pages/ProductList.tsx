import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/products";

function ProductList() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: false,
    retry: 1, // Retry once on failure
    retryDelay: 1000, // Wait 1 second before retrying
    refetchInterval: 1000 * 60, // Refetch every minute
    gcTime: 1000 * 60 * 5, // Garbage collect after 5 minutes
  });

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (error)
    return (
      <div className="text-center text-red-500">Error loading products</div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
