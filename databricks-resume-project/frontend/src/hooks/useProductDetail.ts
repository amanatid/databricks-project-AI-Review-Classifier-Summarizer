import { useCallback, useEffect, useState } from "react";
import { api, type ProductDetail } from "../lib/api";
import { useNavigate } from "react-router-dom";

export function useProductDetail(productId: string) {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingFlag, setSavingFlag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goBack = useCallback(() => navigate("/"), [navigate]);

  useEffect(() => {
    setLoading(true);

    api
      .product(productId)
      .then((productDetail) => {
        setProduct(productDetail);
        setError(null);
      })
      .catch((loadError) =>
        setError(
          loadError instanceof Error
            ? loadError.message
            : "failed to fetch the product",
        ),
      )
      .finally(() => setLoading(false));
  }, [productId]);

  const toggleFlag = useCallback(async () => {
    if (!product) return;

    setSavingFlag(true);

    try {
      const nextFlaggedValue = !product.flagged;
      await api.setFlag(productId, nextFlaggedValue);
      setProduct({ ...product, flagged: nextFlaggedValue });
    } finally {
      setSavingFlag(false);
    }
  }, [product, productId]);

  return {
    product,
    loading,
    savingFlag,
    error,
    toggleFlag,
    goBack,
  };
}
