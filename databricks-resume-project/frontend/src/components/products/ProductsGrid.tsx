import type { ProductSummary } from "../../lib/api";
import { s } from "../../styles/style";
import { Skeleton } from "../ui/skeleton";
import { ProductCard } from "./ProductCard";

export function ProductsGrid({
  products,
  loading,
  onSelect,
}: {
  products: ProductSummary[];
  loading: boolean;
  onSelect: (id: string) => void;
}) {
  if (loading) {
    return (
      <div className={s.productsGrid.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className={s.productsGrid.skeleton} />
        ))}
      </div>
    );
  }

  return (
    <div className={s.productsGrid.grid}>
      {products.map((currentProductItem) => (
        <ProductCard
          key={currentProductItem.productId}
          product={currentProductItem}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
