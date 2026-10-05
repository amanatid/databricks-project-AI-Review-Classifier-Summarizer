import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Flag, Radar } from "lucide-react";
import type { ProductDetail } from "../../lib/api";
import { s } from "../../styles/style";
import { Button } from "../ui/button";
import { cn } from "cn";
import { HealthBadge } from "../products/HealthBadge";
import { Badge } from "../ui/badge";

type Props = {
  title: string;
  category?: string;
  health?: ProductDetail["health"];
  flagged?: boolean;
  savingFlag?: boolean;
  onBack: () => void;
  onToggleFlag?: () => void;
};

export function DetailChrome({
  title,
  category,
  health,
  flagged,
  savingFlag,
  onBack,
  onToggleFlag,
}: Props) {
  return (
    <div className={s.detail.chrome}>
      <div className={s.detail.chromeInner}>
        <div className={s.detail.chromeTop}>
          <div className={s.detail.chromeLeft}>
            <Link to="/" className={s.detail.homeLogo}>
              <Radar className={s.icon.sm} />
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className={s.detail.backBtn}
            >
              <ArrowLeft className={s.icon.sm} />
              Products
            </Button>
            <div className={s.detail.divider} />
            <nav className={s.detail.breadcrumb}>
              <span>Products</span>
              <ChevronRight className={s.icon.chevron} />
              <span className={s.detail.breadcrumbCurrent}>{title}</span>
            </nav>
          </div>

          {health && onToggleFlag && (
            <div className={s.detail.chromeActions}>
              <Button
                variant={flagged ? "default" : "outline"}
                size="sm"
                className={s.detail.flagBtn}
                disabled={savingFlag}
                onClick={onToggleFlag}
              >
                <Flag
                  className={cn(s.icon.sm, flagged && s.detail.flagIconFilled)}
                />
                {flagged
                  ? "Flagged for investigation"
                  : "Flag for investigation"}
              </Button>
              <HealthBadge status={health.status} label={health.label} />
            </div>
          )}
        </div>

        <div className={s.detail.titleBlock}>
          {category && (
            <Badge variant="secondary" className={s.detail.categoryBadge}>
              {category}
            </Badge>
          )}
          <h1 className={s.detail.productTitle}>{title}</h1>
        </div>
      </div>
    </div>
  );
}
