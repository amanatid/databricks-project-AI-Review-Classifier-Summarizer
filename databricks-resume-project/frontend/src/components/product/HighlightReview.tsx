import { MessageSquareQuote, Star } from "lucide-react";
import { highlightTone, s } from "../../styles/style";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "cn";
import { Badge } from "../ui/badge";

type Review = { text: string; rating: number; sentiment: string };

export function HighlightReviewCard({ review }: { review: Review }) {
  const tone = highlightTone(review.sentiment);
  const h = s.highlight[tone];

  return (
    <Card className={h.card}>
      <CardHeader className={h.header}>
        <div className="flex items-center gap-3">
          <div className={h.icon}>
            <MessageSquareQuote className={s.icon.sm} />
          </div>
          <div>
            <CardTitle className={h.title}>Highlighted review</CardTitle>
            <p className={h.subtitle}>{h.label}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-6 py-6">
        <blockquote className={h.quote}>&ldquo;{review.text}&rdquo;</blockquote>
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex items-center gap-0.5"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  s.icon.sm,
                  i < review.rating ? h.starFilled : h.starEmpty,
                )}
              />
            ))}
            <span className={h.rating}>{review.rating}/5</span>
          </div>
          <Badge className={h.badge}>{review.sentiment}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
