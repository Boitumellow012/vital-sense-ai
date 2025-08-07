import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  trend?: "up" | "down" | "stable";
  status?: "normal" | "warning" | "danger" | "excellent";
  description?: string;
  className?: string;
}

const HealthMetricCard = ({
  title,
  value,
  unit,
  icon,
  trend,
  status = "normal",
  description,
  className,
}: HealthMetricCardProps) => {
  const statusConfig = {
    normal: { color: "bg-muted text-muted-foreground", border: "border-border" },
    warning: { color: "bg-warning/10 text-warning border-warning/20", border: "border-warning/20" },
    danger: { color: "bg-danger/10 text-danger border-danger/20", border: "border-danger/20" },
    excellent: { color: "bg-success/10 text-success border-success/20", border: "border-success/20" },
  };

  const trendConfig = {
    up: "text-success",
    down: "text-danger", 
    stable: "text-muted-foreground",
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02]",
      statusConfig[status].border,
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-foreground">
              {value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
            {trend && (
              <Badge variant="outline" className={cn("text-xs", trendConfig[trend])}>
                {trend === "up" && "↗"} {trend === "down" && "↘"} {trend === "stable" && "→"}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        
        {/* Status indicator */}
        <div className={cn(
          "absolute top-0 left-0 w-full h-1 rounded-t-lg",
          status === "excellent" && "bg-gradient-to-r from-success to-success-light",
          status === "normal" && "bg-muted",
          status === "warning" && "bg-warning",
          status === "danger" && "bg-danger"
        )} />
      </CardContent>
    </Card>
  );
};

export default HealthMetricCard;