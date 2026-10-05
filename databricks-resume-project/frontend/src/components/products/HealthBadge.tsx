import { cn } from "cn";
import type { HealthStatus } from "../../lib/api";
import { Badge } from "../ui/badge";
import { s } from "../../styles/style";

export function HealthBadge({
  status,
  label,
}: {
  status: HealthStatus;
  label: string;
}) {
  return (
    <Badge
      variant={"secondary"}
      className={cn(s.healthBadge.base, s.healthBadge.status[status])}
    >
      {label}
    </Badge>
  );
}
