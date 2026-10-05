import { ArrowUpRight, Star } from "lucide-react";
import type { ProductSummary } from "../../lib/api";
import { s } from "../../styles/style";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "cn";
import { Badge } from "../ui/badge";
import { HealthBadge } from "./HealthBadge";

function StarRating({ rating }: { rating: number | null }) {
  if (rating == null)
    return <span className={s.productsGrid.emptyRating}>—</span>;
  return (
    <span className={s.productsGrid.starRow}>
      <Star className={s.productsGrid.starIcon} />
      <span className={s.productsGrid.starValue}>{rating.toFixed(1)}</span>
    </span>
  );
}

export function ProductCard({
  product,
  onSelect,
}: {
  product: ProductSummary;
  onSelect: (id: string) => void;
}) {
  const open = () => onSelect(product.productId);

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={open}
      className={cn(
        s.productsGrid.cardBase,
        s.healthAccent[product.health.status],
      )}
    >
      <CardHeader className={s.productsGrid.cardHeader}>
        <div className={s.productsGrid.cardHeaderRow}>
          <div className={s.productsGrid.cardTitleBlock}>
            <Badge variant="secondary" className={s.productsGrid.categoryBadge}>
              {product.category}
            </Badge>
            <CardTitle className={s.productsGrid.cardTitle}>
              {product.name}
            </CardTitle>
          </div>
          <div className={s.productsGrid.cardActions}>
            <HealthBadge
              status={product.health.status}
              label={product.health.label}
            />
            <ArrowUpRight className={s.productsGrid.openHint} />
          </div>
        </div>
        <CardDescription className="sr-only">
          Open product detail
        </CardDescription>
      </CardHeader>

      <CardContent className={s.productsGrid.cardContent}>
        <div className={s.productsGrid.metricsBox}>
          <div>
            <p className={s.productsGrid.metricLabel}>Rating</p>
            <div className={s.productsGrid.metricValueWrap}>
              <StarRating rating={product.metrics.avgRating} />
            </div>
          </div>
          <div>
            <p className={s.productsGrid.metricLabel}>Reviews</p>
            <p className={s.productsGrid.reviewCount}>
              {product.metrics.reviewCount}
            </p>
          </div>
        </div>

        <div className={s.productsGrid.badgeRow}>
          {product.topComplaint && (
            <Badge variant="outline" className={s.productsGrid.topIssueBadge}>
              Top issue: {product.topComplaint}
            </Badge>
          )}
          {product.flagged && (
            <Badge variant="outline" className={s.productsGrid.flaggedBadge}>
              Flagged for investigation
            </Badge>
          )}
          {product.metrics.negativePct != null &&
            product.metrics.negativePct > 0 && (
              <Badge variant="outline" className={s.productsGrid.negativeBadge}>
                {product.metrics.negativePct.toFixed(0)}% negative
              </Badge>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
