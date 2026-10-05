import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { s } from "../../styles/style";

const LOADING_MESSAGES = [
  "Fetching product from catalog…",
  "Calculating health score…",
  "Analyzing sentiment breakdown…",
  "Scanning complaint themes…",
  "Generating AI summary…",
  "Generating AI next step...",
  "Almost there…",
];

export function ProductPageLoader({ productName }: { productName?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval( 
      () => setIndex((i) => (i + 1) % LOADING_MESSAGES.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className={s.loader.root}>
      <Loader2 className={s.loader.spinner} strokeWidth={2} />
      <div className={s.loader.body}>
        {productName && <p className={s.loader.productName}>{productName}</p>}
        <p className={s.loader.message}>{LOADING_MESSAGES[index]}</p>
        <p className={s.loader.hint}>This usually takes a few seconds</p>
      </div>
    </div>
  );
}
