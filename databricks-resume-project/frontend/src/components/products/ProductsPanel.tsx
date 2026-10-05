import type { ProductSummary } from "../../lib/api";
import { s } from "../../styles/style";
import { ProductsGrid } from "./ProductsGrid";

export function ProductsPanel({
  products,
  loading,
  error,
  onSelectProduct,
}: {
  products: ProductSummary[];
  loading: boolean;
  error: string | null;
  onSelectProduct: (id: string) => void;
}) {
  return (
    <div className={s.productsPanel.root}>
      <header className={s.productsPanel.header}>
        <p className={s.productsPanel.eyebrow}>Live from Databricks</p>
        <h1 className={s.productsPanel.title}>Review health signals</h1>
        <p className={s.productsPanel.subtitle}>
          Every row is computed from enriched reviews — health scores, sentiment
          mix, and top complaint themes. Open a SKU for the full breakdown and
          AI brief.
        </p>
      </header>
      {error && <div className={s.productsPanel.error}>{error}</div>}

       <ProductsGrid
        products={products}
        loading={loading}
        onSelect={onSelectProduct}
      /> 
    </div>
  );
}
