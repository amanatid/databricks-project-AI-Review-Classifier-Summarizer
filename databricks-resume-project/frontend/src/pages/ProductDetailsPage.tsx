import { Navigate, useParams } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { ProductPanel } from "../components/product/ProductPanel";
//import { ProductPanel } from "../components/product/ProductPanel";

export function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppShell>
      <ProductPanel productId={productId} /> 
    </AppShell>
  );
}
