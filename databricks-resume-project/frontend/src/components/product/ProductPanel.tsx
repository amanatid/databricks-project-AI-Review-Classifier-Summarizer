import { useProductDetail } from "../../hooks/useProductDetail";
import { s } from "../../styles/style";
import { DetailChrome } from "./DetailChrome";
import { ProductDetailView } from "./ProductDetailsView";
import { ProductPageLoader } from "./ProductPageLoader";

export function ProductPanel({ productId }: { productId: string }) {
  const { product, loading, savingFlag, error, goBack, toggleFlag } =
    useProductDetail(productId);
 
 // console.log('Product Panel.....',productId,product,loading, savingFlag, error, goBack, toggleFlag)  
  if (loading) {
    return (
      <div className={s.detail.root}>
        <DetailChrome title="Loading product…" onBack={goBack} />
        <ProductPageLoader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={s.detail.rootCompact}>
        <DetailChrome title="Product not found" onBack={goBack} />
        <div className={s.detail.errorBox}>{error ?? "Not found"}</div>
      </div>
    );
  }

  return (
    <ProductDetailView
      product={product}
      savingFlag={savingFlag}
      onBack={goBack}
      onToggleFlag={toggleFlag}
    />
  );
}
