import { cn } from "cn";
import type { ProductDetail } from "../../lib/api";
import { s, sentimentClass } from "../../styles/style";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DetailChrome } from "./DetailChrome";
import { HighlightReviewCard } from "./HighlightReview";
import { Section } from "../ui/section";
import { Lightbulb, Sparkles } from "lucide-react";

const METRICS = [
  {
    key: "avgRating",
    label: "Average rating",
    format: (p: ProductDetail) => {
      const val = p.metrics?.avgRating;
      return val != null ? Number(val).toFixed(1) : "-";
    },
  },
  {
    key: "reviewCount",
    label: "Total reviews",
    format: (p: ProductDetail) => p.metrics?.reviewCount ?? "-",
  },
  {
    key: "negativePct",
    label: "Negative reviews",
    format: (p: ProductDetail) => {
      const val = p.metrics?.negativePct;
      return val != null ? `${Number(val).toFixed(0)}%` : "-";
    },
  },
] as const;

type Props = {
  product: ProductDetail;
  savingFlag: boolean;
  onBack: () => void;
  onToggleFlag: () => void;
};

export function ProductDetailView({
  product,
  savingFlag,
  onToggleFlag,
  onBack,
}: Props) {
  return (
    
    <div className={s.detail.root}>
      <DetailChrome
        title={product.name}
        category={product.category}
        health={product.health}
        flagged={product.flagged}
        savingFlag={savingFlag}
        onBack={onBack}
        onToggleFlag={onToggleFlag}
      />
      
      {product.highlightReview && (
        <HighlightReviewCard review={product.highlightReview} />
      )}

      <div className={s.detail.metricsGrid}>
        {METRICS.map((m) => (
          <Card key={m.key} className={s.detail.metricCard}>
            <CardHeader className="pb-2">
              <CardTitle className={s.detail.metricLabel}>{m.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={s.detail.metricValue}>{m.format(product)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={s.detail.twoColGrid}>
        <Card className={s.detail.sectionCard}>
          <CardHeader className={s.detail.sectionHeader}>
            <CardTitle className={s.detail.sectionTitle}>Top issues</CardTitle>
            <p className={s.detail.sectionDesc}>
              Most frequent complaint themes
            </p>
          </CardHeader>
          <CardContent className={s.detail.sectionBody}>
            {/* Safe check using optional chaining or fallback */}
              {(product.topCategories?.length ?? 0) === 0 ? (
                <p className={s.detail.emptyText}>No complaints reported</p>
              ) : (
                <div className={s.detail.issueGrid}>
                  {product.topCategories?.map((item) => (
                    <div key={item.category}>
                      <p className={s.detail.issueCount}>{item.count}</p>
                      <p className={s.detail.issueLabel}>{item.category}</p>
                    </div>
                  ))}
                </div>
              )}
          </CardContent>
        </Card>

        <Card className={s.detail.sectionCard}>
          <CardHeader className={s.detail.sectionHeader}>
            <CardTitle className={s.detail.sectionTitle}>Sentiment</CardTitle>
            <p className={s.detail.sectionDesc}>Breakdown across all reviews</p>
          </CardHeader>
          <CardContent className={s.detail.sectionBody}>
           {/* Safe check for sentimentBreakdown */}
              {(product.sentimentBreakdown?.length ?? 0) === 0 ? (
                <p className={s.detail.emptyText}>No sentiment data yet.</p>
              ) : (
                <div className={s.detail.sentimentGrid}>
                  {product.sentimentBreakdown?.map((item) => (
                    <div
                      key={item.sentiment}
                      className={cn(
                        s.detail.sentimentTile,
                        sentimentClass(item.sentiment)
                      )}
                    >
                      <p className={s.detail.sentimentCount}>{item.count}</p>
                      <p className={s.detail.sentimentLabel}>{item.sentiment}</p>
                    </div>
                  ))}
                </div>
              )}
          </CardContent>
        </Card>
      </div>

      <Section
        title="AI Summary"
        description="Generated from recent reviews and complaint themes"
        className={s.detail.aiSummarySection}
        action={
          <div className={s.detail.aiSummaryIcon}>
            <Sparkles className={s.icon.sm} />
          </div>
        }
      >
        <p>{product.summary}</p>
      </Section>

      <Section
        title="Recommended action"
        description="Suggested next step for the product team"
        className={s.detail.actionSection}
        action={
          <div className={s.detail.actionIcon}>
            <Lightbulb className={s.icon.sm} />
          </div>
        }
      >
        <div className={s.detail.actionBox}>
          <p className={s.detail.actionText}>{product.nextStep}</p>
        </div>
      </Section>
    </div>
  );
}
